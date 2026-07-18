'use client';

import { motion } from 'framer-motion';
import { EASE, STAGGER, VIEWPORT } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

interface SplitTextProps {
  /** Use "\n" to force a line break; each line masks independently. */
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  delay?: number;
  /** Words matching this string render in mustard — e.g. "HERITAGE." */
  accent?: string;
}

/**
 * Word-level reveal under a per-line mask, so words rise out of the line
 * rather than fading in place. This is the site's headline motion — the one
 * gesture that repeats, because a house style needs one thing that repeats.
 */
export function SplitText({
  text,
  className,
  as: Tag = 'h2',
  delay = 0,
  accent,
}: SplitTextProps) {
  const prefersReduced = useReducedMotion();
  const lines = text.split('\n');

  if (prefersReduced) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {lines.map((line, lineIndex) => {
        const words = line.split(' ');
        return (
          <span key={lineIndex} className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              transition={{
                staggerChildren: STAGGER.tight,
                delayChildren: delay + lineIndex * 0.06,
              }}
            >
              {words.map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  className={cn(
                    'inline-block',
                    accent && word === accent && 'text-mustard',
                  )}
                  variants={{
                    hidden: { y: '100%' },
                    visible: {
                      y: '0%',
                      transition: { duration: 0.9, ease: EASE.expo },
                    },
                  }}
                >
                  {word}
                  {wordIndex < words.length - 1 && ' '}
                </motion.span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
