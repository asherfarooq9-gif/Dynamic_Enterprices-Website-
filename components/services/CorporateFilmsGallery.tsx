import { SectionHeading } from '@/components/ui/SectionHeading';
import { VideoSlot } from '@/components/ui/VideoSlot';
import { Reveal } from '@/components/motion/Reveal';
import { CORPORATE_FILMS } from '@/content/corporate-films';

/**
 * Corporate Films-only: real project films, two-up on desktop at 16:9.
 * Click-to-play tiles (VideoSlot) — no autoplay, so the section costs
 * nothing on load until the viewer opts in per clip.
 */
export function CorporateFilmsGallery() {
  return (
    <section aria-label="Corporate films work" className="section-y bg-cream">
      <div className="shell">
        <SectionHeading eyebrow="The work" title={'FROM OUR\nFILM WORK'} align="center" className="mx-auto" />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CORPORATE_FILMS.map((item, i) => (
            <Reveal key={item.src} delay={Math.min(i * 0.08, 0.3)}>
              <VideoSlot
                src={item.src}
                poster={item.poster}
                title={item.title}
                className="shadow-large"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
