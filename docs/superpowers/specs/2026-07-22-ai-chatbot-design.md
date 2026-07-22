# AI Chatbot — Design Spec

**Date:** 2026-07-22
**Status:** Approved

## Purpose

Add an AI-powered chat widget to the site that answers visitor questions about
services using existing site content, then captures a lead (name + phone or
email) mid-conversation and emails it to the studio inbox. This is the site's
first backend feature — no API routes or server-side data flow exist yet.

## Goals

- Answer visitor questions about the four service disciplines, pricing
  posture, process, and contact details using only real site content (no
  invented facts).
- Capture a lead (name + phone/email + what they need) during conversation
  and notify the studio by email.
- Fit the existing visual language (navy/mustard palette, Framer Motion
  transitions, Roboto type) rather than a generic third-party widget look.
- Sit above the existing fixed-bottom `ServiceSwitcher` bar without
  overlapping it.

## Non-goals

- No conversation persistence/database — stateless per browser session.
- No booking/quote structured-data flow (that's a bigger separate feature).
- No automated test suite — this project has none currently
  (no `__tests__`/`*.test.tsx` files found); manual verification only, matching
  existing convention.
- No admin dashboard for viewing past conversations.

## Architecture

### Provider: Groq

Groq's OpenAI-compatible API, calling a fast open model (Llama 3.3 70B or
similar). Free tier (no credit card) covers expected traffic for this site
many times over. Env var: `GROQ_API_KEY` — left blank in `.env.local`, user
fills in after signing up at console.groq.com.

### `app/api/chat/route.ts` (new)

POST Route Handler. Receives the running message history from the client,
prepends a system prompt built from real site content, calls Groq's chat
completions endpoint, and streams the response back.

- Per-IP best-effort rate limiting (in-memory) to prevent runaway API cost
  from abuse/bots hitting the endpoint directly.
- Incoming message length capped (e.g. 2000 chars) before being sent to the
  provider.
- `GROQ_API_KEY` read from `process.env`, never sent to the client.

### `lib/chatContext.ts` (new)

A system-prompt string assembled from existing content modules (`SITE` from
`lib/site.ts`, `SERVICES` from `content/services.ts`, `MISSION`/`VISION` from
`content/about.ts`). Single source of truth so the bot's answers can't drift
from what's actually on the site. Instructs the model to say "let me connect
you with the team" for anything outside that context (pricing specifics,
availability, etc.) rather than guessing.

### `app/api/chat/lead/route.ts` (new)

POST Route Handler. Receives captured lead details (name, phone/email,
summary of what they need) and sends a notification email via Resend to
`SITE.email`. Env var: `RESEND_API_KEY` — also left blank for the user to
fill in.

### `components/chat/ChatWidget.tsx` (new, client component)

- Floating round button, fixed bottom-right, positioned above
  `ServiceSwitcher`'s bar (`components/services/ServiceSwitcher.tsx`) so the
  two never overlap on any viewport.
- Click expands a chat panel: ~380px wide on desktop, full-screen sheet on
  mobile.
- Framer Motion for open/close transitions, matching the site's existing
  `EASE` easing curves (`lib/motion.ts`) rather than introducing new motion
  values.
- Manages message history in local React state only — nothing persisted.
- Streams the assistant's reply token-by-token as it arrives from
  `/api/chat`.
- When the model's reply contains a specific structured marker indicating it
  has collected a complete lead (name + contact method + need), the widget
  calls `/api/chat/lead` with that data.

### `components/chat/ChatMessage.tsx` (new, presentational)

Renders a single message bubble (user vs. assistant styling), no logic
beyond display.

## Data Flow

1. Visitor clicks the chat button → panel opens, greeting message shown.
2. Visitor types → message appended to local state → POST to `/api/chat`
   with full history.
3. Route builds `[system prompt, ...history]`, calls Groq, streams tokens
   back → widget renders incrementally.
4. If/when the assistant signals a captured lead, widget POSTs to
   `/api/chat/lead` → Resend sends the studio an email with contact info +
   conversation summary.
5. Conversation state is lost on page refresh/close — acceptable for v1
   given no-database non-goal above.

## Error Handling

- Groq API call fails (timeout, rate limit, provider outage): widget shows
  "Having trouble right now — call us at {SITE.phone} or email {SITE.email}"
  instead of a silent failure or stuck spinner.
- Resend call fails: lead is still visible to the visitor in the chat
  transcript (not lost from their perspective), but the studio won't get the
  email — acceptable known gap for v1, no retry queue.
- Rate-limited visitor (per-IP cap hit): widget shows a plain "Too many
  messages, try again in a minute" message rather than a raw error.

## Security

- `GROQ_API_KEY` and `RESEND_API_KEY` are server-only env vars, read only
  inside the two Route Handlers — never exposed to client bundle.
- Per-IP rate limiting on `/api/chat` to bound cost exposure from abuse.
- Input length capped before forwarding to the provider.
- No user-supplied HTML rendered unescaped — messages rendered as plain text
  React children, not `dangerouslySetInnerHTML`.

## Testing

Manual verification only (matches existing project convention — no test
files present anywhere in the repo currently):

- Streaming reply renders correctly, token by token.
- Lead capture triggers an actual email delivery end-to-end.
- Mobile full-screen layout doesn't clip or overlap `ServiceSwitcher`.
- Widget button doesn't overlap `ServiceSwitcher` on any breakpoint.
- Error states (API failure, rate limit) show the fallback messages above
  instead of breaking silently.

## Open Items

- `GROQ_API_KEY` and `RESEND_API_KEY` — left blank in `.env.local`, user adds
  both after signing up at console.groq.com and resend.com.
