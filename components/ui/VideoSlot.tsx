'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

interface VideoSlotProps {
  /** REPLACE: drop the client's film export at this path. */
  src: string;
  poster?: string;
  title: string;
  className?: string;
}

/**
 * Click-to-play, never autoplay. A grid of self-starting videos is a
 * bandwidth and performance cost the card design doesn't need to pay —
 * the viewer opts in per tile, same as clicking play on a video site.
 */
export function VideoSlot({ src, poster, title, className }: VideoSlotProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={cn('relative aspect-video overflow-hidden rounded-lg bg-navy-deeper', className)}>
      {isPlaying ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          onEnded={() => setIsPlaying(false)}
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: poster
              ? `url(${poster})`
              : 'linear-gradient(180deg, #0B4F4C 0%, #052E2B 60%, #001210 100%)',
          }}
        >
          <span
            aria-hidden
            className="absolute inset-0 bg-navy-deeper/30 transition-colors duration-500 ease-expo group-hover:bg-navy-deeper/10"
          />

          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-mustard text-navy shadow-large-dark transition-transform duration-500 ease-expo group-hover:scale-110">
            <svg width="18" height="22" viewBox="0 0 18 22" fill="currentColor" aria-hidden>
              <path d="M0 0 L18 11 L0 22 Z" />
            </svg>
          </span>

          <span className="absolute inset-x-4 bottom-4 text-left text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-cream">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}
