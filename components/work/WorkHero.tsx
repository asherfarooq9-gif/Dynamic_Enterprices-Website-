import { SplitText } from '@/components/motion/SplitText';
import { Reveal } from '@/components/motion/Reveal';
import { HeroSlideshow } from '@/components/home/HeroSlideshow';
import { SITE, DISCIPLINES } from '@/lib/site';

/** A spread across the real project set rather than four in a row — same
 * crossfade slideshow as the homepage hero, real delivered-work photography
 * instead of a flat gradient. */
const WORK_HERO_IMAGES = [
  '/images/work-gallery/1.jpg',
  '/images/work-gallery/3.jpg',
  '/images/work-gallery/5.jpeg',
  '/images/work-gallery/7.jpeg',
  '/images/work-gallery/9.jpeg',
  '/images/work-gallery/11.jpeg',
] as const;

/** The one dark act on Work — same navy-deep register as every other hero. */
export function WorkHero() {
  return (
    <section className="relative flex min-h-[55vh] flex-col justify-center overflow-hidden bg-hero-radial px-6 py-32 text-center">
      <HeroSlideshow images={WORK_HERO_IMAGES} slideDuration={4500} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,31,29,0.68)_0%,rgba(0,31,29,0.55)_45%,rgba(0,12,11,0.8)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,183,74,0.10),transparent_55%)]"
      />

      <div className="shell relative flex flex-col items-center">
        <Reveal>
          <p className="eyebrow mb-8 flex items-center gap-3 text-mustard">
            <span aria-hidden className="h-px w-8 bg-current" />
            Work
          </p>
        </Reveal>

        <SplitText
          as="h1"
          text={'WORK THAT\nSPEAKS FOR US'}
          className="text-hero max-w-4xl text-white"
        />

        <Reveal delay={0.2} className="mt-8 max-w-xl">
          <p className="text-body text-cream/60">{DISCIPLINES.join(' · ')}</p>
        </Reveal>
      </div>

      <div className="shell relative mt-20 flex flex-col items-center gap-2 text-[0.625rem] uppercase tracking-[0.3em] text-cream/40 sm:flex-row sm:justify-between">
        <span>
          Est · {SITE.city} &#10022; {SITE.foundedRoman}
        </span>
        <span>Selected Projects</span>
      </div>
    </section>
  );
}
