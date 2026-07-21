'use client';

import { useEffect, useState } from 'react';

const QUERY = '(max-width: 767px)';

/**
 * Same threshold as Tailwind's `md` breakpoint, already used by Nav's
 * hamburger (`md:hidden`) and ServiceSwitcher's icon/label split — one
 * definition of "mobile" shared across layout CSS and perf-gating JS.
 */
export function useIsMobileViewport(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    setIsMobile(query.matches);

    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}
