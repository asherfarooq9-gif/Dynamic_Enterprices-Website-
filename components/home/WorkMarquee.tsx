'use client';

import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { PhotoSlot } from '@/components/ui/PhotoSlot';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PROJECTS } from '@/content/projects';

/**
 * RELIT. The prototype ran this strip on near-black. It now runs on a
 * cream-warm bed fading to white: the dark portrait cards become the mass and
 * the strip reads as a row of prints laid out on paper.
 *
 * The seamless loop is a duplicated track translated -50% — no JS, no scroll
 * listener — and it parks on hover.
 */
export function WorkMarquee() {
  const track = [...PROJECTS, ...PROJECTS];

  return (
    <section
      aria-labelledby="work-heading"
      className="section-y relative overflow-hidden bg-cream-fade"
    >
      <div className="shell">
        <div className="flex flex-col items-center gap-8 text-center">
          <SectionHeading
            eyebrow="Selected work"
            title={'WORK THAT\nSPEAKS FOR US'}
            align="center"
          />

          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-navy transition-colors hover:text-mustard-dark"
          >
            All projects
            <FiArrowUpRight
              className="transition-transform duration-normal ease-expo group-hover:-translate-y-1 group-hover:translate-x-1"
              size={16}
            />
          </Link>
        </div>
      </div>

      <div className="relative mt-16">
        <Ticker />

        <div className="group/marquee relative overflow-hidden py-6">
          {/* Edge fades, recoloured to the light bed. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream-warm to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent"
          />

          <ul className="flex w-max animate-marquee gap-4 px-10 group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:overflow-x-auto">
            {track.map((project, i) => {
              const isClone = i >= PROJECTS.length;
              return (
                <li
                  key={`${project.id}-${i}`}
                  className="w-[10.625rem] shrink-0"
                  aria-hidden={isClone}
                >
                  <Link
                    href={`/work#${project.id}`}
                    className="group block"
                    tabIndex={isClone ? -1 : undefined}
                  >
                    <div className="relative overflow-hidden rounded shadow-large transition-shadow duration-500 ease-expo group-hover:shadow-premium group-hover:ring-1 group-hover:ring-mustard">
                      <PhotoSlot
                        ratio="6:7"
                        placeholder={project.placeholder}
                        src={project.image}
                        alt={project.name}
                        reveal={false}
                        zoom
                        sizes="10.625rem"
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <Ticker />
      </div>
    </section>
  );
}

/** The drafting-table tick rule that brackets the strip. */
function Ticker() {
  return (
    <div aria-hidden className="shell flex h-[5px] justify-between">
      {Array.from({ length: 40 }, (_, i) => (
        <span key={i} className="h-[5px] w-px bg-navy/20" />
      ))}
    </div>
  );
}
