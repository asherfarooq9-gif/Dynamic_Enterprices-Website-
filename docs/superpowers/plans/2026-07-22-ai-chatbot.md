# AI Chatbot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Groq-powered chat widget that answers visitor questions from real site content and emails the studio when it captures a lead (name + contact + need).

**Architecture:** Two new Next.js Route Handlers (`app/api/chat/route.ts` for streaming chat, `app/api/chat/lead/route.ts` for lead email via Resend) plus a client-side `ChatWidget` that streams tokens from the first route and posts to the second when the model signals a captured lead. No database — conversation lives in React state only.

**Tech Stack:** Next.js 14 App Router, `openai` SDK pointed at Groq's OpenAI-compatible endpoint, `resend` for email, Zod for request validation, Framer Motion for the widget's open/close transitions (matching existing `lib/motion.ts` easing).

---

## Spec Reference

Full design: `docs/superpowers/specs/2026-07-22-ai-chatbot-design.md`

This project has no automated test suite anywhere (`__tests__`/`*.test.tsx` — none found). Per the approved spec's Testing section, verification here is manual: `tsc --noEmit` after each code task, plus a Playwright-driven visual/interaction check for the UI tasks. Real end-to-end chat + lead email requires the user's own `GROQ_API_KEY` / `RESEND_API_KEY`, which are intentionally left blank — that final check is called out as a manual follow-up the user runs once keys are in place.

---

### Task 1: Environment files and dependencies

**Files:**
- Create: `.env.example`
- Create: `.env.local`
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Create the committed env template**

```
GROQ_API_KEY=
RESEND_API_KEY=
```

Write this to `.env.example`.

- [ ] **Step 2: Create the local (gitignored) env file with the same blank keys**

```
GROQ_API_KEY=
RESEND_API_KEY=
```

Write this to `.env.local`. Confirm it's covered by the existing `.gitignore` pattern `.env*.local` (it is — no change needed there).

- [ ] **Step 3: Install dependencies**

Run: `npm install openai resend`

Expected: `package.json` gains `openai` and `resend` under `dependencies`, `package-lock.json` updates, exit code 0.

- [ ] **Step 4: Verify install**

Run: `npx tsc --noEmit --pretty false`

Expected: no new errors (project has none currently).

- [ ] **Step 5: Commit**

```bash
git add .env.example package.json package-lock.json
git commit -m "chore: add env template and chat dependencies"
```

(`.env.local` is gitignored and won't be staged — confirm with `git status` that it does not appear.)

---

### Task 2: Rate limiter utility

**Files:**
- Create: `lib/rateLimit.ts`

- [ ] **Step 1: Write the rate limiter**

```typescript
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/**
 * Best-effort in-memory per-key rate limit. Resets on cold start / restarts
 * across serverless instances — acceptable for bounding abuse cost, not a
 * strict guarantee.
 */
export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  bucket.count += 1;
  return true;
}
```

- [ ] **Step 2: Verify with typecheck**

Run: `npx tsc --noEmit --pretty false`

Expected: no errors. Functional verification happens indirectly in Task 4 once the route calls this.

- [ ] **Step 3: Commit**

```bash
git add lib/rateLimit.ts
git commit -m "feat: add in-memory rate limiter for chat endpoint"
```

---

### Task 3: Chat context builder

**Files:**
- Create: `lib/chatContext.ts`

- [ ] **Step 1: Write the system prompt builder**

```typescript
import { SITE } from '@/lib/site';
import { SERVICES } from '@/content/services';
import { MISSION, VISION } from '@/content/about';

export const LEAD_MARKER_START = '<<LEAD>>';
export const LEAD_MARKER_END = '<</LEAD>>';

export function buildSystemPrompt(): string {
  const serviceLines = SERVICES.map(
    (service) => `- ${service.title}: ${service.short} ${service.body}`,
  ).join('\n');

  return `You are the assistant for ${SITE.name}, a multi-discipline studio in ${SITE.city}, ${SITE.country}, founded in ${SITE.founded}.

Mission: ${MISSION}
Vision: ${VISION}

Services offered:
${serviceLines}

Contact details:
Phone: ${SITE.phone}
Email: ${SITE.email}
Address: ${SITE.address}

Rules:
- Answer only using the information above. Do not invent pricing, availability, or timelines you don't know.
- If asked something outside this information (exact pricing, project availability, etc.), say you'll connect them with the team and ask for their name and phone or email so the team can follow up.
- Keep replies short and conversational, a few sentences at most.
- Once you have collected the visitor's name AND a phone number or email AND what they need, give a brief confirmation to the visitor, then on a new line output exactly this format with the real values filled in:
${LEAD_MARKER_START}{"name":"...","contact":"...","need":"..."}${LEAD_MARKER_END}
Only output that marker once per conversation, after you actually have all three pieces of information.`;
}
```

- [ ] **Step 2: Verify with typecheck**

Run: `npx tsc --noEmit --pretty false`

Expected: no errors. `buildSystemPrompt()` imports resolve against existing `lib/site.ts`, `content/services.ts`, `content/about.ts` — all already export the names used here.

- [ ] **Step 3: Commit**

```bash
git add lib/chatContext.ts
git commit -m "feat: add chat system prompt built from site content"
```

---

### Task 4: Chat streaming API route

**Files:**
- Create: `app/api/chat/route.ts`

- [ ] **Step 1: Write the route**

```typescript
import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { buildSystemPrompt } from '@/lib/chatContext';
import { checkRateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY = 20;

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(MAX_MESSAGE_LENGTH),
});

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(MAX_HISTORY),
});

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(request: NextRequest): Promise<Response> {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';

  if (!checkRateLimit(ip)) {
    return new Response('Too many messages. Try again in a minute.', {
      status: 429,
    });
  }

  const body: unknown = await request.json();
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return new Response('Invalid request.', { status: 400 });
  }

  let completion;
  try {
    completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        ...parsed.data.messages,
      ],
      stream: true,
    });
  } catch {
    return new Response('Upstream chat provider error.', { status: 502 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content ?? '';
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch (error: unknown) {
        controller.error(error);
        return;
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
```

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit --pretty false`

Expected: no errors.

- [ ] **Step 3: Verify request validation manually (no real API key needed for this check)**

Run:
```bash
npm run dev
```
In a second terminal:
```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d "{}"
```
Expected: `400` (empty body fails `requestSchema` — `messages` is required).

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d "{\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}]}"
```
Expected: `502` (no real `GROQ_API_KEY` yet in `.env.local`, so the Groq call fails cleanly and the route returns the mapped error status rather than crashing). Once the user adds a real key, this same request should return `200` with a streamed body.

Stop the dev server after this check.

- [ ] **Step 4: Commit**

```bash
git add app/api/chat/route.ts
git commit -m "feat: add streaming chat API route via Groq"
```

---

### Task 5: Lead email API route

**Files:**
- Create: `app/api/chat/lead/route.ts`

- [ ] **Step 1: Write the route**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { SITE } from '@/lib/site';

const leadSchema = z.object({
  name: z.string().min(1).max(200),
  contact: z.string().min(1).max(200),
  need: z.string().min(1).max(1000),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: unknown = await request.json();
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid lead data.' }, { status: 400 });
  }

  const { name, contact, need } = parsed.data;

  try {
    await resend.emails.send({
      from: `${SITE.name} Chatbot <onboarding@resend.dev>`,
      to: SITE.email,
      subject: `New chatbot lead: ${name}`,
      text: `Name: ${name}\nContact: ${contact}\nNeed: ${need}`,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to send lead email.' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
```

Note: `onboarding@resend.dev` is Resend's built-in sandbox sender — it works immediately with no domain verification. Once the user verifies their own domain with Resend, swap the `from` address to something like `chatbot@dynamicenterprises.pk` (tracked as an open item below).

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit --pretty false`

Expected: no errors.

- [ ] **Step 3: Verify validation manually**

Run:
```bash
npm run dev
```
```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/chat/lead -H "Content-Type: application/json" -d "{}"
```
Expected: `400`.

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/chat/lead -H "Content-Type: application/json" -d "{\"name\":\"Test\",\"contact\":\"test@example.com\",\"need\":\"Interior fit-out\"}"
```
Expected: `502` (no real `RESEND_API_KEY` yet — confirms the route fails cleanly rather than crashing). Once the user adds a real key, this same request should return `200` and an email should arrive at `SITE.email`.

Stop the dev server after this check.

- [ ] **Step 4: Commit**

```bash
git add app/api/chat/lead/route.ts
git commit -m "feat: add lead notification email route via Resend"
```

---

### Task 6: Chat message component

**Files:**
- Create: `components/chat/ChatMessage.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { cn } from '@/lib/cn';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <p
        className={cn(
          'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-small leading-relaxed',
          isUser ? 'bg-navy text-white' : 'bg-cream text-navy',
        )}
      >
        {content}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit --pretty false`

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/chat/ChatMessage.tsx
git commit -m "feat: add chat message bubble component"
```

---

### Task 7: Chat widget

**Files:**
- Create: `components/chat/ChatWidget.tsx`

- [ ] **Step 1: Write the widget**

```tsx
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCommentDots, FaTimes } from 'react-icons/fa';
import { EASE } from '@/lib/motion';
import { SITE } from '@/lib/site';
import { LEAD_MARKER_START, LEAD_MARKER_END } from '@/lib/chatContext';
import { ChatMessage } from './ChatMessage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GREETING: Message = {
  role: 'assistant',
  content: `Hi, I'm here to help with questions about ${SITE.name}'s services. What can I help you with?`,
};

const FALLBACK_ERROR = `Having trouble right now — call us at ${SITE.phone} or email ${SITE.email}.`;
const RATE_LIMIT_ERROR = 'Too many messages — try again in a minute.';

interface Lead {
  name: string;
  contact: string;
  need: string;
}

function extractLead(text: string): Lead | null {
  const start = text.indexOf(LEAD_MARKER_START);
  const end = text.indexOf(LEAD_MARKER_END);
  if (start === -1 || end === -1) return null;

  const json = text.slice(start + LEAD_MARKER_START.length, end);
  try {
    const parsed: unknown = JSON.parse(json);
    if (
      parsed !== null &&
      typeof parsed === 'object' &&
      'name' in parsed &&
      'contact' in parsed &&
      'need' in parsed
    ) {
      return parsed as Lead;
    }
  } catch {
    return null;
  }
  return null;
}

function stripLeadMarker(text: string): string {
  const start = text.indexOf(LEAD_MARKER_START);
  return start === -1 ? text : text.slice(0, start).trim();
}

async function sendLead(lead: Lead): Promise<void> {
  await fetch('/api/chat/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [leadSent, setLeadSent] = useState(false);

  const handleSend = async (): Promise<void> => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const nextMessages: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (response.status === 429) {
        setMessages((prev) => [...prev, { role: 'assistant', content: RATE_LIMIT_ERROR }]);
        return;
      }

      if (!response.ok || !response.body) {
        setMessages((prev) => [...prev, { role: 'assistant', content: FALLBACK_ERROR }]);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });

        const displayText = stripLeadMarker(accumulated);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: displayText };
          return updated;
        });
      }

      if (!leadSent) {
        const lead = extractLead(accumulated);
        if (lead) {
          setLeadSent(true);
          await sendLead(lead);
        }
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: FALLBACK_ERROR }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        onClick={() => setIsOpen((prev) => !prev)}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-large sm:bottom-[calc(5.25rem+env(safe-area-inset-bottom))] sm:right-6"
      >
        {isOpen ? <FaTimes size={20} /> : <FaCommentDots size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE.expo }}
            className="fixed inset-x-4 bottom-[calc(9rem+env(safe-area-inset-bottom))] z-50 flex max-h-[70vh] flex-col overflow-hidden rounded-2xl bg-white shadow-premium sm:inset-x-auto sm:right-6 sm:bottom-[calc(9.5rem+env(safe-area-inset-bottom))] sm:w-[380px]"
          >
            <div className="bg-navy px-5 py-4">
              <p className="text-small font-bold text-white">{SITE.name}</p>
              <p className="text-[0.6875rem] text-white/60">Usually replies in a few minutes</p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, i) => (
                <ChatMessage key={i} role={message.role} content={message.content} />
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void handleSend();
              }}
              className="flex items-center gap-2 border-t border-navy/10 px-3 py-3"
            >
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type a message…"
                disabled={isSending}
                className="flex-1 rounded-full border border-navy/15 px-4 py-2 text-small text-navy outline-none focus:border-mustard-dark"
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="rounded-full bg-navy px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-white disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit --pretty false`

Expected: no errors. Confirms `LEAD_MARKER_START`/`LEAD_MARKER_END` imported from `lib/chatContext.ts` (not redefined here) match the values the system prompt instructs the model to emit — single source of truth, no drift risk.

- [ ] **Step 3: Commit**

```bash
git add components/chat/ChatWidget.tsx
git commit -m "feat: add chat widget UI with streaming and lead capture"
```

---

### Task 8: Wire the widget into the root layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Import and render `ChatWidget`**

Add the import near the other component imports:

```typescript
import { ChatWidget } from '@/components/chat/ChatWidget';
```

Render it alongside `ServiceSwitcher` (after the spacer div, inside `SmoothScroll`):

```tsx
          <ServiceSwitcher />
          <ChatWidget />
        </SmoothScroll>
```

(Replacing the existing `<ServiceSwitcher />` closing line — add `<ChatWidget />` directly after it, before `</SmoothScroll>`.)

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit --pretty false`

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: mount chat widget in root layout"
```

---

### Task 9: Visual verification via Playwright

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev` (leave running in background)

- [ ] **Step 2: Navigate and screenshot the closed state**

Use the Playwright MCP browser tools:
- Navigate to `http://localhost:3000`
- Take a screenshot of the bottom-right corner (viewport ~390x844 for mobile, then ~1440x900 for desktop)
- Confirm the chat button is visible above `ServiceSwitcher` with no overlap on both sizes

- [ ] **Step 3: Open the widget and screenshot the open state**

- Click the chat button
- Take a screenshot
- Confirm: greeting message renders, input field and Send button visible, panel doesn't clip off-screen on mobile width

- [ ] **Step 4: Send a test message and confirm graceful failure**

- Type "hello" and submit
- Confirm the widget shows the `FALLBACK_ERROR` message (expected, since `.env.local` has no real `GROQ_API_KEY` yet) rather than a stuck spinner or crash

- [ ] **Step 5: Stop the dev server**

- [ ] **Step 6: Note remaining manual step for the user**

Once `GROQ_API_KEY` and `RESEND_API_KEY` are filled into `.env.local`:
- Restart the dev server
- Send a real message, confirm a streamed reply appears
- Continue the conversation until name + contact + need are given, confirm an email arrives at `SITE.email`
- No commit needed for this step — it's a runtime check, not a code change.

---

## Open Items (carried from spec)

- `GROQ_API_KEY` / `RESEND_API_KEY` — user fills into `.env.local` after signing up at console.groq.com and resend.com.
- `resend.emails.send()` currently uses the sandbox `onboarding@resend.dev` sender — swap to a verified domain sender once the user verifies `dynamicenterprises.pk` with Resend.
- Production deployment (Vercel or wherever this is hosted) needs the same two env vars added to its environment settings — not covered by this plan, which only touches local dev.
