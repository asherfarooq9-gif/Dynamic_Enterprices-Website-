import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { SITE } from '@/lib/site';

const leadSchema = z.object({
  name: z.string().min(1).max(200),
  contact: z.string().min(1).max(200),
  need: z.string().min(1).max(1000),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid lead data.' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid lead data.' }, { status: 400 });
  }

  const { name, contact, need } = parsed.data;

  try {
    // Constructed per-request, inside this try/catch: matches the same
    // defensive pattern as app/api/chat/route.ts — a client SDK that
    // validates credentials synchronously at construction must not throw
    // at module load time.
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: `${SITE.name} Chatbot <onboarding@resend.dev>`,
      to: SITE.email,
      subject: `New chatbot lead: ${name}`,
      text: `Name: ${name}\nContact: ${contact}\nNeed: ${need}`,
    });
  } catch (error: unknown) {
    console.error(
      'Resend lead email failed:',
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json({ error: 'Failed to send lead email.' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
