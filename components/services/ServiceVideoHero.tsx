'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ServiceVideoHeroProps {
  title: string;
  tagline: string;
  videoSrc: string;
  /** Still frame shown before the video downloads, and in place of the video
   * entirely under reduced-motion. */
  posterSrc?: string;
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
  const skipVideo = prefersReduced;

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
            className="object-cover"
          />
        )
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
          poster={posterSrc}
          // @ts-expect-error -- fetchPriority is valid on <video> in browsers but not yet in React's DOM typings
          fetchPriority="high"
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
        <h1 className="text-hero max-w-3xl font-bold uppercase leading-[0.92] text-white motion-safe:animate-fade-up-title">
          {title}
        </h1>
        <p className="mt-6 max-w-lg text-lead text-cream/70 motion-safe:animate-fade-up-tagline">
          {tagline}
        </p>
      </div>
    </section>
  );
}
