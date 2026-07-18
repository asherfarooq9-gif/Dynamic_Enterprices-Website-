'use client';

import { motion } from 'framer-motion';
import { DURATION, EASE, VIEWPORT } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Use for hand-tuned section choreography, not decoration. */
  delay?: number;
  y?: number;
  as?: 'div' | 'section' | 'li' | 'span';
}

/**
 * The baseline reveal. Deliberately plain — sections that matter get their own
 * motion language and do NOT use this. Reaching for Reveal everywhere is how a
 * site ends up feeling like a template.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = 'div',
}: RevealProps) {
  const prefersReduced = useReducedMotion();
  const Component = motion[as];

  if (prefersReduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.slow, ease: EASE.expo, delay }}
    >
      {children}
    </Component>
  );
}
