'use client';

import Image from 'next/image';
import { SplitText } from '@/components/motion/SplitText';
import { Reveal } from '@/components/motion/Reveal';
import { useIsMobileViewport } from '@/hooks/useIsMobileViewport';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SITE, DISCIPLINES } from '@/lib/site';

const VIDEO_SRC = '/videos/about/hero.mp4';
const POSTER_SRC = '/images/about/hero/poster.jpg';

/**
 * The one dark act on About — same navy-deep register as Home and Services,
 * so every top-level page shares one footing.
 *
 * A blueprint-and-pencil close-up plays behind the copy — the founding-story
 * beat, distinct from Home's craftsmanship reel and Services' commercial.
 */
export function AboutHero() {
  const isMobile = useIsMobileViewport();
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[60vh] flex-col justify-center overflow-hidden bg-hero-radial px-6 py-32 text-center">
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
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,31,29,0.62)_0%,rgba(0,31,29,0.5)_45%,rgba(0,12,11,0.8)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,183,74,0.10),transparent_55%)]"
      />

      <div className="shell relative flex flex-col items-center">
        <Reveal>
          <p className="eyebrow mb-8 flex items-center gap-3 text-mustard">
            <span aria-hidden className="h-px w-8 bg-current" />
            About
          </p>
        </Reveal>

        <SplitText
          as="h1"
          text={
            isMobile
              ? 'BUSINESS MUST BE\nDYNAMIC,\nNOT STATIC'
              : 'BUSINESS MUST BE\nDYNAMIC, NOT STATIC'
          }
          className="text-hero max-w-4xl text-white"
        />

        <Reveal delay={0.2} className="mt-8 max-w-xl">
          <p className="text-body text-cream/60">{SITE.description}</p>
        </Reveal>
      </div>

      <div className="shell relative mt-20 flex flex-col items-center gap-2 text-[0.625rem] uppercase tracking-[0.3em] text-cream/40 sm:flex-row sm:justify-between">
        <span>
          Est · {SITE.city} &#10022; {SITE.foundedRoman}
        </span>
        <span>{DISCIPLINES.join(' · ')}</span>
      </div>
    </section>
  );
}
