import type { Metadata } from 'next';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { Reveal } from '@/components/motion/Reveal';
import { SITE } from '@/lib/site';

const CONTACT_DESCRIPTION =
  "Get in touch with Dynamic Enterprises in Karachi — call, email or visit the studio for interior, supplies, film or uniform projects.";

export const metadata: Metadata = {
  title: 'Contact',
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact', description: CONTACT_DESCRIPTION },
  twitter: { title: 'Contact', description: CONTACT_DESCRIPTION },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section aria-label="Contact details and form" className="section-y bg-white">
        <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="space-y-10">
            <div>
              <p className="eyebrow mb-4 text-mustard-dark">Phone</p>
              <p className="text-lead text-navy/80">{SITE.phone}</p>
            </div>
            <div>
              <p className="eyebrow mb-4 text-mustard-dark">Email</p>
              <p className="text-lead text-navy/80">{SITE.email}</p>
            </div>
            <div>
              <p className="eyebrow mb-4 text-mustard-dark">Studio</p>
              <p className="max-w-prose text-lead text-navy/80">{SITE.address}</p>
            </div>

            <div className="overflow-hidden rounded-lg ring-1 ring-navy/10">
              <div className="relative aspect-video">
                <iframe
                  title={`Map: ${SITE.address}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.address)}&output=embed`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex justify-end bg-navy px-4 py-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${SITE.address} in Google Maps`}
                  className="inline-flex min-h-[2.75rem] items-center rounded-full bg-white/10 px-5 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-mustard hover:text-navy"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
