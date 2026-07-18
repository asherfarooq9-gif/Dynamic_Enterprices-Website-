'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** A one-pixel mustard hairline across the top. Nothing more. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[90] h-px w-full origin-left bg-mustard"
    />
  );
}
