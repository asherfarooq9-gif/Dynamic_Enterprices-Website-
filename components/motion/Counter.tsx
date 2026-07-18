'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CounterProps {
  value: number;
  suffix?: string;
  /** Zero-pad to two digits — "04 DISCIPLINES" reads better than "4". */
  pad?: boolean;
  durationMs?: number;
}

/**
 * The final value is the resting state: it renders in the HTML, so a visitor
 * with no JS (or a crawler) reads "60+", not "0". Only once we know we can
 * animate do we knock it back to zero — in a layout effect, before paint, so
 * the real number never flashes.
 */
export function Counter({
  value,
  suffix = '',
  pad = false,
  durationMs = 1600,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const [isArmed, setIsArmed] = useState(false);

  useLayoutEffect(() => {
    if (prefersReduced) return;
    setDisplay(0);
    setIsArmed(true);
  }, [prefersReduced]);

  useEffect(() => {
    if (!isArmed || !isInView) return;

    let frame = 0;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      // Ease-out expo — the number decelerates into place instead of stopping.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isArmed, isInView, value, durationMs]);

  const formatted = pad ? String(display).padStart(2, '0') : String(display);

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}
