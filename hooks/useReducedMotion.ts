'use client';

import { useEffect, useState } from 'react';

/**
 * Every motion component reads this. Returns false on the server and on the
 * first client paint, so SSR markup and hydrated markup always agree.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) =>
      setPrefersReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return prefersReduced;
}
