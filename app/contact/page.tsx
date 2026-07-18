import type { Metadata } from 'next';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { PhotoSlot } from '@/components/ui/PhotoSlot';
import { Reveal } from '@/components/motion/Reveal';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch — ${SITE.description}`,
  alternates: { canonical: '/contact' },
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
              <p className="text-lead text-navy/80">+92 339 520 0009</p>
            </div>
            <div>
              <p className="eyebrow mb-4 text-mustard-dark">Email</p>
              <p className="text-lead text-navy/80">{SITE.email}</p>
            </div>
            <div>
              <p className="eyebrow mb-4 text-mustard-dark">Studio</p>
              <p className="max-w-prose text-lead text-navy/80">{SITE.address}</p>
            </div>

            <PhotoSlot
              ratio="16:9"
              placeholder="dusk"
              caption={SITE.city}
              subcaption="Map"
              className="rounded-lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
