import { SplitText } from '@/components/motion/SplitText';
import { Reveal } from '@/components/motion/Reveal';
import { PhotoSlot } from '@/components/ui/PhotoSlot';
import { Parallax } from '@/components/motion/Parallax';
import { FOUNDERS, FOUNDER_STORY } from '@/content/about';
import { SITE } from '@/lib/site';

/**
 * RELIT. The prototype set this on #0a0f18 with mustard marble veins. It is
 * now white with navy veins — and the B&W skyline becomes the only dark mass
 * on the page, which is precisely what makes it read as a photograph rather
 * than as decoration.
 */
export function FounderStory() {
  return (
    <section
      aria-label={`From ${SITE.city}, since ${SITE.founded}`}
      className="section-y relative overflow-hidden bg-white"
    >
      {/* Marble veins, inverted mustard → navy for the light ground. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1400 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="vein-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1a2332" stopOpacity="0" />
            <stop offset="0.5" stopColor="#1a2332" stopOpacity="0.22" />
            <stop offset="1" stopColor="#1a2332" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vein-b" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2d3d55" stopOpacity="0" />
            <stop offset="0.5" stopColor="#2d3d55" stopOpacity="0.16" />
            <stop offset="1" stopColor="#2d3d55" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-50,80 Q200,30 400,120 T780,140 T1180,80 T1500,120"
          stroke="url(#vein-a)"
          strokeWidth="1.8"
          fill="none"
        />
        <path
          d="M-50,220 Q250,170 500,260 T900,240 T1500,280"
          stroke="url(#vein-b)"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M-50,380 Q300,320 550,410 T1000,380 T1500,420"
          stroke="url(#vein-a)"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M-50,540 Q220,480 480,560 T900,530 T1500,580"
          stroke="url(#vein-b)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M240,-40 Q320,180 260,380 T300,720"
          stroke="url(#vein-a)"
          strokeWidth="0.9"
          fill="none"
        />
        <path
          d="M920,-40 Q1000,280 940,480 T980,720"
          stroke="url(#vein-b)"
          strokeWidth="0.9"
          fill="none"
        />
      </svg>

      <div className="shell relative grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="eyebrow mb-6 flex items-center gap-3 text-mustard-dark">
            <span aria-hidden className="h-px w-8 bg-current" />
            The studio
          </p>

          <SplitText
            as="h2"
            text={`FROM ${SITE.city.toUpperCase()},\nSINCE ${SITE.founded}`}
            className="text-section uppercase text-navy"
          />

          <div className="mt-10 space-y-6">
            {FOUNDER_STORY.map((paragraph, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="max-w-prose text-body text-navy/70">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {FOUNDERS.map((founder, i) => (
              <Reveal key={founder.name} delay={0.3 + i * 0.1}>
                {/* REPLACE: swap the script font for a scanned signature SVG. */}
                <p className="font-script text-[1.625rem] leading-none text-navy">
                  {founder.signature}
                </p>
                <p className="mt-4 text-small font-normal leading-snug text-navy/60">
                  {founder.name},
                  <br />
                  {founder.role}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Parallax strength={0.08} className="rounded-lg shadow-premium">
          <PhotoSlot
            ratio="5:4"
            aspectRatio="2647/1535"
            placeholder="dusk"
            src="/images/about/karachi.jpg"
            alt={`${SITE.city} skyline`}
            caption={`${SITE.city} · PK`}
            subcaption="B&W · Archive"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="rounded-lg"
          />
        </Parallax>
      </div>
    </section>
  );
}
