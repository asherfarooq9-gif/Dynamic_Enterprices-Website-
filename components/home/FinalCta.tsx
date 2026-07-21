import { SplitText } from '@/components/motion/SplitText';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { SITE, DISCIPLINES } from '@/lib/site';

/**
 * White marble close, unchanged from the approved prototype: a navy
 * gradient-clipped headline on a near-white marble ground, one navy button
 * that flips to mustard. The lightest surface on the site, immediately before
 * the navy footer — the page exhales, then closes.
 */
export function FinalCta() {
  return (
    <section
      aria-label="Start a project"
      className="section-y relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-marble-light text-center"
    >
      {/* Navy veins in the marble — subtle, 16–22% as specified. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 1400 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="cta-vein-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#004346" stopOpacity="0" />
            <stop offset="0.5" stopColor="#004346" stopOpacity="0.22" />
            <stop offset="1" stopColor="#004346" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cta-vein-b" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0C5C57" stopOpacity="0" />
            <stop offset="0.5" stopColor="#0C5C57" stopOpacity="0.16" />
            <stop offset="1" stopColor="#0C5C57" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-50,80 Q220,20 460,110 T900,90 T1500,120"
          stroke="url(#cta-vein-a)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M-50,200 Q280,140 540,240 T980,220 T1500,260"
          stroke="url(#cta-vein-b)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M-50,340 Q260,280 520,380 T960,350 T1500,390"
          stroke="url(#cta-vein-a)"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M-50,440 Q240,380 500,470 T940,450 T1500,480"
          stroke="url(#cta-vein-b)"
          strokeWidth="0.9"
          fill="none"
        />
        <path
          d="M240,-40 Q300,150 240,320 T280,540"
          stroke="url(#cta-vein-a)"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M1180,-40 Q1120,180 1160,360 T1140,540"
          stroke="url(#cta-vein-a)"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>

      <div className="shell relative flex flex-col items-center">
        <Reveal>
          <p className="mb-12 flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-navy">
            <span className="text-mustard">&#9670;</span>
            {SITE.name}
          </p>
        </Reveal>

        <SplitText
          as="h2"
          text={'SPACES DESIGNED.\nSTORIES DELIVERED.'}
          className="text-gradient-navy max-w-4xl text-section uppercase"
        />

        <Reveal delay={0.2}>
          <p className="mt-6 text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-navy/55">
            {DISCIPLINES.join(' · ')} — one studio, full accountability
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12">
          <Button href="/contact">Start a project</Button>
        </Reveal>
      </div>

      <div className="shell absolute inset-x-0 bottom-6 flex items-center justify-between text-[0.5625rem] uppercase tracking-[0.25em] text-navy/40">
        <span>
          {SITE.city} · {SITE.country}
        </span>
        <span>
          Est · <b className="text-navy">{SITE.foundedRoman}</b>
        </span>
      </div>
    </section>
  );
}
