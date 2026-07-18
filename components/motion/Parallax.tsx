'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Fraction of the element's height to travel across the full scroll pass. */
  strength?: number;
}

export function Parallax({
  children,
  className,
  strength = 0.2,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const pct = strength * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`-${pct}%`, `${pct}%`]);

  if (prefersReduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div style={{ y }} className="h-[120%] w-full">
        {children}
      </motion.div>
    </div>
  );
}
