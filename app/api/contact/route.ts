import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { SITE } from '@/lib/site';
import { checkRateLimit } from '@/lib/rateLimit';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional(),
  message: z.string().trim().min(10).max(2000),
});

/** Strips CR/LF so a submitted value can't inject extra lines into the email subject. */
function sanitizeForSubject(value: string): string {
  return value.replace(/[\r\n]+/g, ' ');
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Try again in a minute.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });
  }

  const { name, email, phone, message } = parsed.data;

  try {
    // Constructed per-request, inside this try/catch: matches the same
    // defensive pattern as app/api/chat/lead/route.ts — a client SDK that
    // validates credentials synchronously at construction must not throw
    // at module load time.
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: `${SITE.name} Website <onboarding@resend.dev>`,
      to: SITE.email,
      replyTo: email,
      subject: `New contact form submission: ${sanitizeForSubject(name)}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone ?? 'Not provided'}\nMessage: ${message}`,
    });
  } catch (error: unknown) {
    console.error(
      'Resend contact email failed:',
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
