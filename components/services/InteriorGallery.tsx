import { SectionHeading } from '@/components/ui/SectionHeading';
import { PhotoSlot } from '@/components/ui/PhotoSlot';
import { Reveal } from '@/components/motion/Reveal';

const GALLERY_IMAGES = [
  '/images/services/interior-gallery/1.jpg',
  '/images/services/interior-gallery/2.jpg',
  '/images/services/interior-gallery/3.jpeg',
  '/images/services/interior-gallery/4.jpeg',
  '/images/services/interior-gallery/5.jpeg',
  '/images/services/interior-gallery/6.jpeg',
] as const;

/**
 * Interior-only: real project photography, three-up on desktop. Each tile
 * reveals and zooms on hover — the same PhotoSlot move used everywhere else
 * on the site, just fed real `src` values instead of gradient placeholders.
 */
export function InteriorGallery() {
  return (
    <section aria-label="Interior gallery" className="section-y bg-cream">
      <div className="shell">
        <SectionHeading eyebrow="The work" title={'FROM OUR\nINTERIOR PROJECTS'} />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((src, i) => (
            <Reveal key={src} delay={Math.min(i * 0.06, 0.3)}>
              <PhotoSlot
                ratio="4:5"
                src={src}
                alt={`Interior project ${i + 1}`}
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
