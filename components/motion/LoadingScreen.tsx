'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SITE } from '@/lib/site';

/**
 * Navy-deep flash on first paint: the monogram appears, a mustard hairline
 * fills, then the whole plate lifts away to reveal the hero already running.
 * Dismisses on next paint — no artificial hold. `HeroParticles` waits for
 * `document.fonts.ready` itself before sampling the wordmark font, so this
 * component doesn't need to gate on fonts too.
 */
export function LoadingScreen() {
  const [isDone, setIsDone] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIsDone(true);
      return;
    }

    const frame = requestAnimationFrame(() => setIsDone(true));
    return () => cancelAnimationFrame(frame);
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-navy-black"
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: EASE.expo }}
        >
          <motion.div
            className="flex items-center gap-3 text-cream"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.expo }}
          >
            <span className="text-mustard">&#9670;</span>
            <span className="text-sm font-bold uppercase tracking-[0.3em]">
              {SITE.shortName}
            </span>
          </motion.div>

          <div className="mt-6 h-px w-40 overflow-hidden bg-cream/10">
            <motion.div
              className="h-full w-full origin-left bg-mustard"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: EASE.expo }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
