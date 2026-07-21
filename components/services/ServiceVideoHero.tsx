'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobileViewport } from '@/hooks/useIsMobileViewport';

interface ServiceVideoHeroProps {
  title: string;
  tagline: string;
  videoSrc: string;
  /** Still frame shown before the video downloads, and in place of the video
   * entirely under reduced-motion or a detected slow mobile connection. */
  posterSrc?: string;
}

/** navigator.connection is Chromium-only (zero Safari support) — read it
 * defensively and fail open (keep autoplay) whenever it's absent. */
function useIsSlowConnection(): boolean {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (!connection) return;
    setIsSlow(
      Boolean(connection.saveData) ||
        ['slow-2g', '2g'].includes(connection.effectiveType ?? ''),
    );
  }, []);

  return isSlow;
}

/**
 * The one service that gets a full-bleed video open instead of the plain
 * breadcrumb header — set per-service via `Service.heroVideo`. Sits on the
 * same navy-deep register as Home and the Services hub, so the site never
 * loses its footing landing here directly. Under reduced motion the video
 * never mounts at all — the navy bed plus title is the whole hero.
 */
export function ServiceVideoHero({ title, tagline, videoSrc, posterSrc }: ServiceVideoHeroProps) {
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobileViewport();
  const isSlowConnection = useIsSlowConnection();
  const skipVideo = prefersReduced || (isMobile && isSlowConnection);

  return (
    <section className="relative h-svh min-h-[36rem] w-full overflow-hidden bg-hero-radial">
      {skipVideo ? (
        posterSrc && (
          <Image
            src={posterSrc}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        )
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,31,29,0.55)_0%,rgba(0,31,29,0.35)_45%,rgba(0,12,11,0.85)_100%)]"
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
