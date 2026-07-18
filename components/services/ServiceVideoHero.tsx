'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ServiceVideoHeroProps {
  title: string;
  tagline: string;
  videoSrc: string;
}

/**
 * The one service that gets a full-bleed video open instead of the plain
 * breadcrumb header — set per-service via `Service.heroVideo`. Sits on the
 * same navy-deep register as Home and the Services hub, so the site never
 * loses its footing landing here directly. Under reduced motion the video
 * never mounts at all — the navy bed plus title is the whole hero.
 */
export function ServiceVideoHero({ title, tagline, videoSrc }: ServiceVideoHeroProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative h-svh min-h-[36rem] w-full overflow-hidden bg-hero-radial">
      {!prefersReduced && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,24,0.55)_0%,rgba(10,15,24,0.35)_45%,rgba(6,10,18,0.85)_100%)]"
      />

      <nav
        aria-label="Breadcrumb"
        className="absolute inset-x-0 top-24 flex justify-center text-[0.625rem] uppercase tracking-[0.25em] text-cream/60 sm:top-28"
      >
        <Link href="/services" className="transition-colors hover:text-mustard">
          Services
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-cream">{title}</span>
      </nav>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
          animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE.expo, delay: 0.5 }}
          className="text-hero max-w-3xl font-bold uppercase leading-[0.92] text-white"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE.expo, delay: 0.65 }}
          className="mt-6 max-w-lg text-lead text-cream/70"
        >
          {tagline}
        </motion.p>
      </div>
    </section>
  );
}
