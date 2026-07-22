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
    // Constructed per-request, inside this try/catch: the OpenAI SDK
    // validates credentials synchronously at construction, so a missing
    // GROQ_API_KEY must not throw at module load time (that would 500
    // every request, including ones that never reach the API call).
    const groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    });

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
