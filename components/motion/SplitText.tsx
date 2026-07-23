'use client';

import { STAGGER } from '@/lib/motion';
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
 *
 * Driven by a CSS keyframe (`split-word` in tailwind.config.ts) rather than
 * framer-motion: the stagger is just a per-word `animation-delay`, so the
 * reveal starts at paint time instead of waiting on JS hydration — this text
 * is the LCP candidate on every hero that uses it.
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
            <span className="block">
              {words.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className={cn(
                    'inline-block motion-safe:animate-split-word',
                    accent && word === accent && 'text-mustard',
                  )}
                  style={{
                    animationDelay: `${
                      delay + lineIndex * 0.06 + wordIndex * STAGGER.tight
                    }s`,
                  }}
                >
                  {word}
                  {wordIndex < words.length - 1 && ' '}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
