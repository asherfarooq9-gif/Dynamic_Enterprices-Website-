'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { EASE, VIEWPORT } from '@/lib/motion';
import { useTilt } from '@/hooks/useTilt';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PhotoSlot } from '@/components/ui/PhotoSlot';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SERVICES, type Service } from '@/content/services';
import { SITE } from '@/lib/site';
import { cn } from '@/lib/cn';

/**
 * RELIT. The prototype floated these cards on #0a0f18. They now float on white
 * fading to cream — the dark photography inside each card becomes the depth,
 * and the section reads as a light gallery wall rather than a dark stage.
 *
 * The staged rotations (-3°, 0°, 3°, -2°) and the size hierarchy (Supplies is
 * the 360px feature card) are preserved from the approved composition.
 */

interface CardConfig {
  rest: number;
  className: string;
  sizes: string;
}

const CARDS: readonly CardConfig[] = [
  {
    rest: -3,
    className: 'lg:mt-16 lg:w-[17.5rem]',
    sizes: '(max-width: 1024px) 45vw, 18rem',
  },
  {
    rest: 0,
    className: 'lg:-mt-4 lg:w-[22.5rem]',
    sizes: '(max-width: 1024px) 45vw, 23rem',
  },
  {
    rest: 3,
    className: 'lg:mt-20 lg:w-[16.25rem]',
    sizes: '(max-width: 1024px) 45vw, 17rem',
  },
  {
    rest: -2,
    className: 'lg:mt-40 lg:w-[12.5rem]',
    sizes: '(max-width: 1024px) 45vw, 13rem',
  },
] as const;

function CardFace({
  service,
  sizes,
}: {
  service: Service;
  sizes: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <PhotoSlot
        ratio={service.ratio}
        placeholder={service.placeholder}
        src={service.image}
        alt={service.title}
        sizes={sizes}
        reveal={false}
        zoom
      />

      {/* Veil so the label holds on any photo dropped in later. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-deeper/50 to-transparent"
      />

      <span className="absolute left-4 top-4 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-mustard">
        {service.index}
      </span>

      {/* The centred pill. Scrub & Uniforms takes mustard — the one card
          allowed to raise its voice. */}
      <span
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.25em] shadow-large-dark transition-colors duration-500 ease-expo',
          service.id === 'scrub-uniforms'
            ? 'bg-mustard text-navy'
            : 'bg-cream text-navy group-hover:bg-mustard',
        )}
      >
        {service.title}
      </span>

      <span className="absolute inset-x-4 bottom-4 flex justify-between text-[0.5625rem] uppercase tracking-[0.2em] text-cream/70">
        <span>{service.meta.left}</span>
        <span>{service.meta.right}</span>
      </span>
    </div>
  );
}

function ServiceCard({
  service,
  config,
  index,
}: {
  service: Service;
  config: CardConfig;
  index: number;
}) {
  const tiltRef = useTilt<HTMLAnchorElement>(config.rest);
  const prefersReduced = useReducedMotion();

  const card = (
    <Link
      ref={tiltRef}
      href={`/services/${service.id}`}
      style={{ transform: `rotate(${config.rest}deg)` }}
      className="group block rounded-lg shadow-large ring-1 ring-navy/[0.06] transition-shadow duration-500 ease-expo hover:shadow-premium hover:ring-mustard"
    >
      <CardFace service={service} sizes={config.sizes} />
    </Link>
  );

  // Under reduced motion the card is not reveal-gated at all — it is simply
  // present. A zero-duration reveal is still a reveal, and still pops.
  if (prefersReduced) {
    return <div className={cn('w-full', config.className)}>{card}</div>;
  }

  return (
    <motion.div
      className={cn('w-full', config.className)}
      initial={{ opacity: 0, y: 60, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: config.rest }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE.expo, delay: index * 0.1 }}
    >
      {card}
    </motion.div>
  );
}

export function ServicesCards() {
  return (
    <section
      aria-labelledby="services-heading"
      className="section-y relative overflow-hidden bg-paper-fade"
    >
      {/* The prototype's mustard line grid, dropped to a whisper on white. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="services-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#1a2332"
              strokeWidth="0.4"
              opacity="0.06"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#services-grid)" />
      </svg>

      {/* Warm bloom, top-right — the prototype's mustard glow, muted for white. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 h-[31rem] w-[31rem] rounded-full bg-[radial-gradient(circle,rgba(212,183,74,0.16),transparent_60%)]"
      />

      <div className="shell relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
          <SectionHeading
            eyebrow="Four disciplines"
            title={'ONE STUDIO.\nFOUR WAYS IN.'}
            align="center"
          />

          <p className="max-w-prose text-body text-navy/60">
            Interior, supplies, corporate films and uniforms. Held by the
            same people, to the same standard, with one signature on the
            result.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-6 lg:flex lg:items-start lg:justify-center lg:gap-10">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              config={CARDS[i]}
              index={i}
            />
          ))}
        </div>

        <div className="mt-24 flex flex-col items-center gap-8 border-t border-navy/10 pt-8 text-center sm:flex-row sm:justify-center sm:gap-20">
          <p className="text-[0.625rem] uppercase tracking-[0.25em] text-navy/45">
            Est · {SITE.foundedRoman}
            <br />
            <b className="text-mustard-dark">Made in {SITE.city}</b>
          </p>

          <p
            id="services-heading"
            className="text-[clamp(1.5rem,1rem+1.5vw,2rem)] font-bold uppercase tracking-[-0.03em] text-navy"
          >
            {SITE.name}
            <span className="mt-2 block text-[0.625rem] font-normal uppercase tracking-[0.25em] text-navy/45">
              For interior · supplies · corporate films · uniforms
            </span>
          </p>

          <p className="text-[1.75rem] font-bold leading-none tracking-[-0.03em] text-mustard-dark">
            04
            <span className="mt-2 block text-[0.5625rem] font-normal uppercase tracking-[0.25em] text-navy/45">
              Disciplines
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
