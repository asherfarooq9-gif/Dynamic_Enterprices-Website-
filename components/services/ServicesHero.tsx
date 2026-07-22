'use client';

import Image from 'next/image';
import { SplitText } from '@/components/motion/SplitText';
import { Reveal } from '@/components/motion/Reveal';
import { SITE, DISCIPLINES } from '@/lib/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const VIDEO_SRC = '/videos/services/hero-commercial.mp4';
const POSTER_SRC = '/images/services/hero-commercial/poster.jpg';

/**
 * The one dark act on this page — same navy-deep register as the Home hero,
 * so the site never loses its footing when a visitor jumps straight to
 * /services. No particle canvas here: that gesture belongs to Home alone.
 *
 * A short commercial-style reel (drone establishing shot into the four
 * disciplines) plays behind the copy instead of the flat gradient — same
 * autoplay-muted-loop treatment as the interior service hero.
 */
export function ServicesHero() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden bg-hero-radial px-6 py-32 text-center">
      {prefersReduced ? (
        <Image
          src={POSTER_SRC}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          poster={POSTER_SRC}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,31,29,0.6)_0%,rgba(0,31,29,0.5)_45%,rgba(0,12,11,0.78)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,183,74,0.10),transparent_55%)]"
      />

      <div className="shell relative flex flex-col items-center">
        <Reveal>
          <p className="eyebrow mb-8 flex items-center gap-3 text-mustard">
            <span aria-hidden className="h-px w-8 bg-current" />
            Services
          </p>
        </Reveal>

        <SplitText
          as="h1"
          text={'EVERY DISCIPLINE.\nONE STUDIO.'}
          className="text-hero max-w-4xl text-white"
        />

        <Reveal delay={0.2} className="mt-8 max-w-xl">
          <p className="text-body text-cream/60">
            {DISCIPLINES.join(' · ')} — held by the same people, to the same
            standard, with one signature on the result.
          </p>
        </Reveal>
      </div>

      <div className="shell relative mt-20 flex flex-col items-center gap-2 text-[0.625rem] uppercase tracking-[0.3em] text-cream/40 sm:flex-row sm:justify-between">
        <span>
          Est · {SITE.city} &#10022; {SITE.foundedRoman}
        </span>
        <span>04 Disciplines · One Accountable Studio</span>
      </div>
    </section>
  );
}
