import type { Metadata } from 'next';
import { ServicesHero } from '@/components/services/ServicesHero';
import { ServiceOptionCard } from '@/components/services/ServiceOptionCard';
import { FinalCta } from '@/components/home/FinalCta';
import { SERVICES } from '@/content/services';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Services',
  description: `Interior, supplies, corporate films and uniforms — ${SITE.description}`,
  alternates: { canonical: '/services' },
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
