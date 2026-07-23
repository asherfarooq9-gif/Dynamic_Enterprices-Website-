'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Lenis drives every scroll on the site and feeds ScrollTrigger, so the two
 * never disagree about where the page is. Skipped entirely under reduced
 * motion — native scrolling is the accessible default, not a degraded one.
 *
 * Both libraries are dynamically imported inside the effect rather than at
 * module scope: neither is needed for first paint, and keeping them out of
 * the root layout's static import graph means they no longer ship as part
 * of the initial JS bundle for every route.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReduced) return;

    let cancelled = false;
    let frame = 0;
    let lenisInstance: import('lenis').default | undefined;

    void Promise.all([import('lenis'), import('@/lib/gsap')]).then(
      ([{ default: Lenis }, { ScrollTrigger }]) => {
        if (cancelled) return;

        const lenis = new Lenis({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
        lenisInstance = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        frame = requestAnimationFrame(function loop(time) {
          lenis.raf(time);
          frame = requestAnimationFrame(loop);
        });
      },
    );

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenisInstance?.destroy();
    };
  }, [prefersReduced]);

  // A route change must land at the top and re-measure every trigger.
  useEffect(() => {
    window.scrollTo(0, 0);
    void import('@/lib/gsap').then(({ ScrollTrigger }) => ScrollTrigger.refresh());
  }, [pathname]);

  return <>{children}</>;
}
