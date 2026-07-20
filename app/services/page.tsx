import type { Metadata } from 'next';
import { ServicesHero } from '@/components/services/ServicesHero';
import { ServiceOptionCard } from '@/components/services/ServiceOptionCard';
import { FinalCta } from '@/components/home/FinalCta';
import { SERVICES } from '@/content/services';

const SERVICES_DESCRIPTION =
  'Four disciplines, one studio: turnkey interiors, FF&E procurement, corporate and architectural films, and bulk uniforms — all in Karachi.';

export const metadata: Metadata = {
  title: 'Services',
  description: SERVICES_DESCRIPTION,
  alternates: { canonical: '/services' },
  openGraph: { title: 'Services', description: SERVICES_DESCRIPTION },
  twitter: { title: 'Services', description: SERVICES_DESCRIPTION },
};

/**
 * The hub: one dark hero, then the four disciplines as clickable options,
 * each routing to its own dedicated page — no in-page detail here. Closes
 * on the shared FinalCta for visitors who land here without picking one.
 */
export default function ServicesPage() {
  return (
    <>
      <ServicesHero />

      <section className="section-y bg-white">
        <div className="shell">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <ServiceOptionCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
