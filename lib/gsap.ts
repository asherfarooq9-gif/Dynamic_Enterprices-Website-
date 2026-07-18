'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Plugins must be registered on the client. registerPlugin is idempotent, so
 * importing this module anywhere gives you a gsap that already has
 * ScrollTrigger, however many times it is imported.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
