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
      typeof (parsed as Record<string, unknown>).name === 'string' &&
      typeof (parsed as Record<string, unknown>).contact === 'string' &&
      typeof (parsed as Record<string, unknown>).need === 'string'
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
  const response = await fetch('/api/chat/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error(`Lead send failed with status ${response.status}`);
  }
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

      // Flush any trailing bytes the streaming decoder held back (a
      // multi-byte UTF-8 character can span two network reads).
      accumulated += decoder.decode();
      const finalDisplayText = stripLeadMarker(accumulated);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: finalDisplayText };
        return updated;
      });

      if (!leadSent) {
        const lead = extractLead(accumulated);
        if (lead) {
          setLeadSent(true);
          // Isolated from the outer catch: a lead-email failure must never
          // be shown to the visitor as "the chat is having trouble" — the
          // chat reply itself already streamed and displayed successfully.
          try {
            await sendLead(lead);
          } catch (error: unknown) {
            console.error(
              'Lead send failed:',
              error instanceof Error ? error.message : error,
            );
          }
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
            className="fixed inset-x-4 bottom-[calc(9rem+env(safe-area-inset-bottom))] z-50 flex max-h-[min(70dvh,34rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-premium sm:inset-x-auto sm:right-6 sm:bottom-[calc(9.5rem+env(safe-area-inset-bottom))] sm:w-[380px]"
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
                aria-label="Message"
                disabled={isSending}
                className="flex-1 rounded-full border border-navy/15 px-4 py-2 text-small text-navy outline-none focus:border-mustard-dark"
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="shrink-0 rounded-full bg-navy px-3 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-white disabled:opacity-50 sm:px-4"
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
