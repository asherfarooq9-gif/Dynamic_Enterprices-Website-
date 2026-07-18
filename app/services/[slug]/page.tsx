import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ServiceSection } from '@/components/services/ServiceSection';
import { ServiceVideoHero } from '@/components/services/ServiceVideoHero';
import { InteriorCategoryGrid } from '@/components/services/InteriorCategoryGrid';
import { InteriorGallery } from '@/components/services/InteriorGallery';
import { CorporateFilmsGallery } from '@/components/services/CorporateFilmsGallery';
import { SuppliesProductsGrid } from '@/components/services/SuppliesProductsGrid';
import { ScrubUniformsProductsGrid } from '@/components/services/ScrubUniformsProductsGrid';
import { FinalCta } from '@/components/home/FinalCta';
import { SERVICES } from '@/content/services';
import { SITE } from '@/lib/site';

interface ServiceDetailPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.id }));
}

export function generateMetadata({ params }: ServiceDetailPageProps): Metadata {
  const service = SERVICES.find((s) => s.id === params.slug);
  if (!service) return {};

  return {
    title: service.title,
    description: `${service.short} — ${SITE.description}`,
    alternates: { canonical: `/services/${service.id}` },
  };
}

/**
 * One dedicated page per discipline — the Services hub links here instead
 * of scrolling to an in-page anchor. `index` is fixed at 0 so `ServiceSection`
 * always renders on white: each detail page is its own self-contained
 * light-curve moment, not a step in a shared alternation.
 */
export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = SERVICES.find((s) => s.id === params.slug);
  if (!service) notFound();

  return (
    <>
      {service.heroVideo ? (
        <ServiceVideoHero
          title={service.title}
          tagline={service.short}
          videoSrc={service.heroVideo}
        />
      ) : (
        <div className="border-b border-navy/10 bg-white pt-28">
          <div className="shell py-6">
            <nav aria-label="Breadcrumb" className="text-[0.625rem] uppercase tracking-[0.25em] text-navy/45">
              <Link href="/services" className="transition-colors hover:text-mustard-dark">
                Services
              </Link>
              <span className="mx-2" aria-hidden>
                /
              </span>
              <span className="text-navy">{service.title}</span>
            </nav>
          </div>
        </div>
      )}

      <ServiceSection service={service} index={0} />

      {service.id === 'interior' && (
        <>
          <InteriorCategoryGrid />
          <InteriorGallery />
        </>
      )}

      {service.id === 'corporate-films' && <CorporateFilmsGallery />}

      {service.id === 'supplies' && <SuppliesProductsGrid />}

      {service.id === 'scrub-uniforms' && <ScrubUniformsProductsGrid />}

      <FinalCta />
    </>
  );
}
