'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

const MAX_DEG = 6;

/**
 * Card tilt that tracks the cursor across the card face. `rest` is the card's
 * resting rotation (the floating cards sit at -3°, 0°, 3°, -2°) — on hover the
 * card straightens toward level and then tilts with the pointer.
 */
export function useTilt<T extends HTMLElement>(rest = 0) {
  const ref = useRef<T>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.transition = 'none';
      el.style.transform = [
        'perspective(1000px)',
        `rotateY(${px * MAX_DEG}deg)`,
        `rotateX(${-py * MAX_DEG}deg)`,
        'translate3d(0, -8px, 0)',
        'scale(1.02)',
      ].join(' ');
    };

    const onLeave = () => {
      el.style.transition = 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.transform = `rotate(${rest}deg)`;
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [rest, prefersReduced]);

  return ref;
}
