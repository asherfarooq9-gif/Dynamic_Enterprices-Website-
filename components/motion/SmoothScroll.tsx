'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ScrollTrigger } from '@/lib/gsap';

/**
 * Lenis drives every scroll on the site and feeds ScrollTrigger, so the two
 * never disagree about where the page is. Skipped entirely under reduced
 * motion — native scrolling is the accessible default, not a degraded one.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [prefersReduced]);

  // A route change must land at the top and re-measure every trigger.
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
