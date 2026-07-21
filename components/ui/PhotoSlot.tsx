'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { DURATION, EASE, VIEWPORT } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import type { Ratio } from '@/content/services';

/** Every image on the site declares one of these and reserves its box. */
const RATIO_CLASS: Record<Ratio, string> = {
  '4:5': 'aspect-[4/5]',
  '1:1': 'aspect-square',
  '16:9': 'aspect-video',
  '5:4': 'aspect-[5/4]',
  '6:7': 'aspect-[6/7]',
};

/** What the client should supply for each ratio — printed on the placeholder. */
const RATIO_SPEC: Record<Ratio, string> = {
  '4:5': '1600 × 2000',
  '1:1': '1600 × 1600',
  '16:9': '1920 × 1080',
  '5:4': '2400 × 1920',
  '6:7': '1200 × 1400',
};

export type PlaceholderKey =
  | 'slate'
  | 'brass'
  | 'ink'
  | 'amber'
  | 'dusk'
  | 'gilt';

/**
 * The gradient stand-ins. They are deliberately dark: on the relit light
 * sections they read as photographic mass, which is exactly the composition
 * the real photography will step into.
 */
const PLACEHOLDER: Record<PlaceholderKey, string> = {
  slate: 'linear-gradient(135deg, #2E6B63 0%, #004346 60%, #00302E 100%)',
  brass: 'linear-gradient(135deg, #3d3320 0%, #6b5628 40%, #004346 100%)',
  ink: 'linear-gradient(180deg, #0B4F4C 0%, #052E2B 60%, #001210 100%)',
  amber: 'linear-gradient(135deg, #5c4820 0%, #2d2312 100%)',
  dusk: 'linear-gradient(135deg, #0C5C57 0%, #004346 60%, #00302E 100%)',
  gilt: 'linear-gradient(135deg, #6b5628 0%, #2d2515 100%)',
};

interface PhotoSlotProps {
  ratio: Ratio;
  /** CSS aspect-ratio override, e.g. the photo's own `'2647/1535'`. Wins over `ratio`. */
  aspectRatio?: string;
  placeholder?: PlaceholderKey;
  /** REPLACE: drop the client photo here and the placeholder disappears. */
  src?: string;
  alt?: string;
  /** Overlaid bottom-left caption, e.g. "WOODTURNER · CHINIOT". */
  caption?: string;
  subcaption?: string;
  /** Hero media only. Everything else lazy-loads. */
  priority?: boolean;
  reveal?: boolean;
  /** Zoom on hover of the nearest `.group` ancestor. */
  zoom?: boolean;
  className?: string;
  sizes?: string;
}

export function PhotoSlot({
  ratio,
  aspectRatio,
  placeholder = 'slate',
  src,
  alt = '',
  caption,
  subcaption,
  priority = false,
  reveal = true,
  zoom = false,
  className,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: PhotoSlotProps) {
  const prefersReduced = useReducedMotion();
  const shouldAnimate = reveal && !prefersReduced;
  const hasCaption = Boolean(caption || subcaption);

  const body = (
    <>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          className={cn(
            'object-cover',
            zoom &&
              'transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.04]',
          )}
        />
      ) : (
        <div
          aria-hidden
          className={cn(
            'absolute inset-0',
            zoom &&
              'transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.04]',
          )}
          style={{ backgroundImage: PLACEHOLDER[placeholder] }}
        />
      )}

      {/* Veil: keeps the caption legible over any photograph supplied later. */}
      {hasCaption && (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy-deeper/60 via-transparent to-transparent"
        />
      )}

      {hasCaption && (
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 text-cream">
          <div>
            {caption && (
              <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.2em]">
                {caption}
              </span>
            )}
            {subcaption && (
              <span className="mt-1 block text-[0.625rem] uppercase tracking-[0.18em] text-cream/60">
                {subcaption}
              </span>
            )}
          </div>

          {/* The spec label exists only while the slot is empty — it tells the
              client exactly which file to hand over. */}
          {!src && (
            <span className="shrink-0 text-right text-[0.625rem] font-bold uppercase leading-relaxed tracking-[0.18em] text-mustard">
              {ratio}
              <br />
              {RATIO_SPEC[ratio]}
            </span>
          )}
        </div>
      )}
    </>
  );

  const boxClass = cn('relative overflow-hidden', RATIO_CLASS[ratio], className);
  const boxStyle = aspectRatio ? { aspectRatio } : undefined;

  if (!shouldAnimate) {
    return (
      <div className={boxClass} style={boxStyle}>
        {body}
      </div>
    );
  }

  return (
    <motion.div
      className={boxClass}
      style={boxStyle}
      initial={{ opacity: 0, scale: 1.06 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.slow, ease: EASE.expo }}
    >
      {body}
    </motion.div>
  );
}
