'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { EASE } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * A navy curtain wipes up across the viewport, the route swaps behind it, and
 * it clears. Short enough (700ms total) that it reads as craft, not as a load.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return <>{children}</>;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE.expo, delay: 0.25 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`curtain-${pathname}`}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[95] origin-bottom bg-navy"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: EASE.expo }}
        />
      </AnimatePresence>
    </>
  );
}
