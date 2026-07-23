'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { HeroParticles } from './HeroParticles';
import { HeroSlideshow } from './HeroSlideshow';
import { EASE } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SITE, DISCIPLINES } from '@/lib/site';

/**
 * Calm hero: the photograph holds a slow, almost imperceptible zoom for as
 * long as the section is on screen. Sawdust falls and packs itself into the
 * wordmark — one continuous motion, no freeze, no crossfade to a second
 * "clean" text layer. The settled dust IS the final wordmark; there is no
 * swap. The real heading text stays in the DOM (permanently invisible) purely
 * for accessibility and SEO — it is never the thing a sighted visitor sees.
 */
export function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative h-svh min-h-[36rem] w-full overflow-hidden bg-hero-radial">
      {/* Full-bleed motion. Reduced motion gets the still poster frame only —
          an autoplaying video is itself the thing reduced-motion opts out of. */}
      {prefersReduced ? (
        <Image
          src="/images/hero-slideshow/1.jpg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <HeroSlideshow />
      )}

      {/* Navy scrim — holds the white wordmark legible and keeps the section in
          the brand's dark register while the room's light still reads. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,31,29,0.58)_0%,rgba(0,31,29,0.42)_45%,rgba(0,12,11,0.68)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_35%,rgba(0,12,11,0.48)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_55%,rgba(212,183,74,0.10),transparent_40%)]"
      />

      {/* The sawdust falls and packs itself into the wordmark, and stays that
          way — the only visual for the name. No second layer crossfades in
          over it. */}
      <HeroParticles />

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        {/* Normally invisible — the canvas above is what a sighted visitor
            sees, this is what a screen reader or crawler sees. Under reduced
            motion the canvas renders nothing at all, so this becomes the
            visible wordmark instead: real, solid, static, no animation. */}
        <h1 className={prefersReduced ? 'text-white' : 'opacity-0'}>
          <span className="block text-[clamp(2.75rem,1rem+7.5vw,6.875rem)] font-bold leading-[0.9] tracking-[-0.04em]">
            DYNAMIC
          </span>
          <span className="mt-3 block text-[clamp(0.85rem,0.35rem+2.6vw,2.25rem)] font-normal leading-none tracking-[0.32em] text-white/90">
            ENTERPRISES
          </span>
        </h1>

        <motion.p
          className="mt-10 max-w-lg text-[clamp(0.9375rem,0.75rem+0.9vw,1.375rem)] font-bold uppercase text-cream/80"
          initial={{ opacity: 0, y: 12, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.08em' }}
          transition={{ duration: 0.9, ease: EASE.expo, delay: 0.6 }}
        >
          {SITE.tagline}
        </motion.p>
      </div>

      {/* Vignette. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.55)]"
      />

      <div className="shell pointer-events-none relative flex h-full flex-col justify-end pb-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-[0.625rem] font-normal uppercase tracking-[0.3em] text-cream/45">
            Est · {SITE.city} &#10022; {SITE.foundedRoman}
          </p>

          <ul className="flex flex-wrap gap-x-7 gap-y-2 text-[0.625rem] uppercase tracking-[0.3em] text-cream/75">
            {DISCIPLINES.map((discipline) => (
              <li key={discipline}>{discipline}</li>
            ))}
          </ul>

          <div className="flex flex-col items-start gap-2 sm:items-center">
            <span className="text-[0.625rem] uppercase tracking-[0.3em] text-mustard">
              Scroll
            </span>
            <span
              aria-hidden
              className="h-6 w-px animate-pulse bg-gradient-to-b from-mustard to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
