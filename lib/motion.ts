/**
 * Single source of truth for motion. Components import these — they never
 * hardcode an easing curve or a duration.
 */

export const EASE = {
  expo: [0.16, 1, 0.3, 1],
  power: [0.22, 1, 0.36, 1],
} as const;

export const EASE_CSS = {
  expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  power: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const;

export const DURATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.8,
  cinematic: 1.2,
} as const;

export const STAGGER = {
  tight: 0.04,
  normal: 0.08,
  loose: 0.14,
} as const;

/** Standard fade-up. Used only where a section has no motion of its own. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.expo },
  },
} as const;

/** Word/char reveal parent. Children use `revealChild`. */
export const revealParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER.tight, delayChildren: 0.1 },
  },
} as const;

export const revealChild = {
  hidden: { opacity: 0, y: '0.6em' },
  visible: {
    opacity: 1,
    y: '0em',
    transition: { duration: 0.7, ease: EASE.expo },
  },
} as const;

export const VIEWPORT = { once: true, amount: 0.25 } as const;
