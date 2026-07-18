'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const SLIDES = [
  '/images/hero-slideshow/1.jpg',
  '/images/hero-slideshow/2.jpg',
  '/images/hero-slideshow/3.jpg',
  '/images/hero-slideshow/4.jpg',
] as const;

const SLIDE_DURATION = 5000;

/**
 * Full-bleed crossfade — one slide at a time, each holding a slow Ken Burns
 * zoom for the duration it's on screen. Only one image is ever painted at
 * full opacity; the outgoing slide fades under the incoming one rather than
 * both animating independently, so the transition reads as a single
 * continuous dissolve.
 */
export function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: 'easeInOut' },
            scale: { duration: SLIDE_DURATION / 1000 + 1.2, ease: 'linear' },
          }}
        >
          <Image
            src={SLIDES[index]}
            alt=""
            aria-hidden
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
