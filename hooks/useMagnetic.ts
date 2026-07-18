'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

const DEFAULT_STRENGTH = 0.35;
const RESET_MS = 400;

/**
 * Pulls an element toward the cursor while the pointer is inside it.
 * Transform-only, so it stays on the compositor.
 */
export function useMagnetic<T extends HTMLElement>(
  strength: number = DEFAULT_STRENGTH,
) {
  const ref = useRef<T>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    // Coarse pointers have no hover — magnetism would fight the tap.
    if (!window.matchMedia('(hover: hover)').matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      el.style.transition = 'none';
      el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
    };

    const onLeave = () => {
      el.style.transition = `transform ${RESET_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      el.style.transform = 'translate3d(0, 0, 0)';
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [strength, prefersReduced]);

  return ref;
}
