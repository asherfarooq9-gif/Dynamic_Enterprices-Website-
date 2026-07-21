'use client';

import { SplitText } from '@/components/motion/SplitText';
import { Reveal } from '@/components/motion/Reveal';
import { useIsMobileViewport } from '@/hooks/useIsMobileViewport';
import { SITE } from '@/lib/site';

/** The one dark act on Contact — same navy-deep register as every other hero. */
export function ContactHero() {
  const isMobile = useIsMobileViewport();

  return (
    <section className="relative flex min-h-[50vh] flex-col justify-center overflow-hidden bg-hero-radial px-6 py-32 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,183,74,0.10),transparent_55%)]"
      />

      <div className="shell relative flex flex-col items-center">
        <Reveal>
          <p className="eyebrow mb-8 flex items-center gap-3 text-mustard">
            <span aria-hidden className="h-px w-8 bg-current" />
            Contact
          </p>
        </Reveal>

        <SplitText
          as="h1"
          text={
            isMobile
              ? "LET'S CREATE\nSOMETHING\nTOGETHER"
              : "LET'S CREATE\nSOMETHING TOGETHER"
          }
          className="text-hero max-w-4xl text-white"
        />

        <Reveal delay={0.2} className="mt-8 max-w-xl">
          <p className="text-body text-cream/60">{SITE.address}</p>
        </Reveal>
      </div>
    </section>
  );
}
