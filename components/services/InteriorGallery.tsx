'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { PhotoSlot } from '@/components/ui/PhotoSlot';
import { Reveal } from '@/components/motion/Reveal';
import { useIsMobileViewport } from '@/hooks/useIsMobileViewport';

const GALLERY_IMAGES = [
  {
    src: '/images/services/interior-gallery/1.jpg',
    alt: 'Turnkey interior fit-out by Dynamic Enterprises, Karachi',
  },
  {
    src: '/images/services/interior-gallery/2.jpg',
    alt: 'Bespoke joinery and finishes on an interior project by Dynamic Enterprises',
  },
  {
    src: '/images/services/interior-gallery/3.jpeg',
    alt: 'Interior design and spatial layout by Dynamic Enterprises, Karachi',
  },
  {
    src: '/images/services/interior-gallery/4.jpeg',
    alt: 'Material and finish specification on an interior project by Dynamic Enterprises',
  },
  {
    src: '/images/services/interior-gallery/5.jpeg',
    alt: 'Completed interior handover by Dynamic Enterprises, Karachi',
  },
  {
    src: '/images/services/interior-gallery/6.jpeg',
    alt: 'Detail joinery and lighting on an interior project by Dynamic Enterprises',
  },
] as const;

/**
 * Interior-only: real project photography, three-up on desktop. Each tile
 * reveals and zooms on hover — the same PhotoSlot move used everywhere else
 * on the site, just fed real `src` values instead of gradient placeholders.
 */
export function InteriorGallery() {
  const isMobile = useIsMobileViewport();

  return (
    <section aria-label="Interior gallery" className="section-y bg-cream">
      <div className="shell">
        <SectionHeading
          eyebrow="The work"
          title={
            isMobile
              ? 'FROM OUR\nINTERIOR\nPROJECTS'
              : 'FROM OUR\nINTERIOR PROJECTS'
          }
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((image, i) => (
            <Reveal key={image.src} delay={Math.min(i * 0.06, 0.3)}>
              <PhotoSlot
                ratio="4:5"
                src={image.src}
                alt={image.alt}
                zoom
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="rounded-lg shadow-large"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
