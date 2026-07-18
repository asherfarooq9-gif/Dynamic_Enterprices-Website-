'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { TESTIMONIALS } from '@/content/about';
import { cn } from '@/lib/cn';

/**
 * No cards, no avatars, no quote-mark clip art. One quote at a time, set large
 * on cream, changed by a row of hairline tabs. Restraint is the whole design —
 * a testimonial carousel with chrome would undo the rest of the page.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = TESTIMONIALS[index];

  return (
    <section
      aria-label="What clients say"
      className="section-y relative overflow-hidden bg-cream"
    >
      <div className="shell relative flex flex-col items-center text-center">
        <p className="eyebrow mb-14 flex items-center justify-center gap-3 text-mustard-dark">
          <span aria-hidden className="h-px w-8 bg-current" />
          In their words
        </p>

        <div className="min-h-[16rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: EASE.expo }}
            >
              <p className="mx-auto max-w-4xl text-[clamp(1.5rem,1rem+1.8vw,2.5rem)] font-bold leading-[1.25] tracking-[-0.025em] text-navy">
                &ldquo;{active.quote}&rdquo;
              </p>

              <footer className="mt-10 text-[0.625rem] uppercase tracking-[0.25em] text-navy/45">
                <cite className="not-italic">
                  <b className="font-bold text-navy/70">{active.author}</b>
                  <span className="mx-3 text-mustard-dark">&#9670;</span>
                  {active.role}
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex justify-center gap-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <button
              key={testimonial.author}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show quote from ${testimonial.author}`}
              aria-current={i === index}
              className="group py-3"
            >
              <span
                className={cn(
                  'block h-px w-16 transition-colors duration-500 ease-expo',
                  i === index
                    ? 'bg-mustard-dark'
                    : 'bg-navy/20 group-hover:bg-navy/50',
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
