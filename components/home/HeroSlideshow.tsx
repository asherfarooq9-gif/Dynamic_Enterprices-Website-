'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const DEFAULT_SLIDES = [
  '/images/hero-slideshow/1.jpg',
  '/images/hero-slideshow/2.jpg',
  '/images/hero-slideshow/3.jpg',
  '/images/hero-slideshow/4.jpg',
] as const;

const DEFAULT_SLIDE_DURATION = 5000;

interface HeroSlideshowProps {
  /** Defaults to the homepage hero set. Pass a different set to reuse the
   * same crossfade behavior elsewhere (e.g. the Work hero's project photos). */
  images?: readonly string[];
  slideDuration?: number;
}

/**
 * Full-bleed crossfade — one slide at a time, each holding a slow Ken Burns
 * zoom for the duration it's on screen. Only one image is ever painted at
 * full opacity; the outgoing slide fades under the incoming one rather than
 * both animating independently, so the transition reads as a single
 * continuous dissolve.
 */
export function HeroSlideshow({
  images = DEFAULT_SLIDES,
  slideDuration = DEFAULT_SLIDE_DURATION,
}: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, slideDuration);
    return () => clearInterval(id);
  }, [isVisible, images.length, slideDuration]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: 'easeInOut' },
            scale: { duration: slideDuration / 1000 + 1.2, ease: 'linear' },
          }}
        >
          <Image
            src={images[index]}
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
