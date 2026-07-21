'use client';

import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useIsMobileViewport } from '@/hooks/useIsMobileViewport';
import { METHOD } from '@/content/method';

/**
 * The one dark act after the hero. It earns the contrast: "we handle all the
 * complexity" is the claim the whole studio rests on, so it is the only place
 * the page returns to navy.
 *
 * The steps cascade to the right on desktop (each offset from the last, joined
 * by L-shaped hairlines) and stack on mobile. Each step reveals independently
 * on scroll-into-view, same `Reveal` primitive used everywhere else on the
 * site — matching the rest of the page instead of a one-off GSAP scrub.
 */
export function Method() {
  const isMobile = useIsMobileViewport();

  return (
    <section
      aria-label="Our method"
      className="section-y relative overflow-hidden bg-method-radial"
    >
      {/* Soft horizontal light bands — navy only, no mustard in this section. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[12, 32, 52, 72, 90].map((top, i) => (
          <div
            key={top}
            className="absolute -left-[20%] -right-[20%] h-16 blur-2xl"
            style={{
              top: `${top}%`,
              opacity: [0.7, 0.42, 0.56, 0.39, 0.28][i],
              background:
                'linear-gradient(90deg, transparent, rgba(70,95,135,0.14), rgba(45,61,85,0.25), rgba(70,95,135,0.14), transparent)',
            }}
          />
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,10,18,0.55)_100%)]"
      />

      <div className="shell relative">
        <SectionHeading
          eyebrow="The method"
          tone="dark"
          title={
            isMobile
              ? 'WE HANDLE ALL\nTHE\nCOMPLEXITY'
              : 'WE HANDLE ALL\nTHE COMPLEXITY'
          }
        />

        <ol className="mt-24 lg:mt-32">
          {METHOD.map((step, i) => (
            <Reveal key={step.n} as="li" delay={i * 0.15} y={40}>
              <div
                className="relative max-w-[19rem] py-5 pl-10"
                style={{
                  // The landscape cascade: each step steps right and slightly up
                  // from the last, so the eye reads them as a descending stair.
                  marginLeft: `min(${i * 14.5}rem, ${i * 12}vw)`,
                  marginTop: i === 0 ? 0 : '-0.5rem',
                }}
              >
                {/* L-shaped hairline joining this step back to the previous. */}
                {i > 0 && (
                  <>
                    <span
                      aria-hidden
                      className="absolute -top-5 bottom-3 left-0 w-px bg-white/[0.14]"
                    />
                    <span
                      aria-hidden
                      className="absolute -top-5 left-0 h-px w-9 bg-white/[0.14]"
                    />
                  </>
                )}

                <span className="absolute left-0 top-1 -ml-10 w-7 text-right text-[0.6875rem] font-normal tracking-[0.2em] text-white/40">
                  {step.n}
                </span>

                <h3 className="text-[1.0625rem] font-bold leading-snug tracking-[-0.01em] text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-small font-normal leading-relaxed text-white/55">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
