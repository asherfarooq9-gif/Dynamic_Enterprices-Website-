'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const MAX_DPR = 2;
/** Dense enough that settled grains tile into a solid glyph, not a texture. */
const SAMPLE_STEP = 3;
/** Frames each grain takes to travel from its scatter point to its letter. */
const TRAVEL_FRAMES = 64;
/** Frames of overlap where the grain blends into the real crisp glyph. */
const RESOLVE_FRAMES = 26;

/** Solid white grain — a hint of tonal variation so it still reads as
 * texture up close, but settles as flat white at normal viewing distance. */
const GRAIN_COLORS = ['#ffffff', '#fbfbfb', '#ffffff', '#f5f5f5'] as const;

interface Particle {
  tx: number;
  ty: number;
  sx: number;
  sy: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  alpha: number;
  color: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * The one place the wordmark's font, size and layout are defined — used both
 * to build the sampling mask and, at resolve, to paint the real crisp result.
 * Same coordinates both times, so the grain lands exactly where the solid
 * glyph replaces it.
 */
function paintWordmark(
  target: CanvasRenderingContext2D,
  width: number,
  height: number,
  fillStyle: string,
) {
  target.fillStyle = fillStyle;
  target.textAlign = 'center';
  target.textBaseline = 'middle';

  const size = Math.min(width / 9.5, 110);
  target.font = `700 ${size}px Roboto, sans-serif`;
  target.fillText('DYNAMIC', width / 2, height / 2 - size * 0.55);
  target.font = `400 ${size * 0.4}px Roboto, sans-serif`;
  target.fillText('E N T E R P R I S E S', width / 2, height / 2 + size * 0.3);
}

interface HeroParticlesProps {
  /** Fires once the word has geometrically formed — cue for the rest of the
   * hero (tagline, footer row) to reveal, timed with the wordmark's own
   * final resolve rather than a separate later beat. */
  onSettled: () => void;
}

/**
 * Particles converge directly onto the letterforms — they form the word,
 * rather than falling and landing to build it. Each grain travels on a fixed,
 * eased schedule (not an asymptotic drift, which was reading as "stuck" near
 * the end — it never actually arrived, just slowed to a crawl). Once every
 * grain's travel time is up, the grain blends into the real crisp glyph over
 * a short overlapping resolve — one continuous motion the whole way, no hold,
 * no instant pop, no handoff to a separate layer.
 */
export function HeroParticles({ onSettled }: HeroParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();
  const onSettledRef = useRef(onSettled);
  onSettledRef.current = onSettled;

  useEffect(() => {
    if (prefersReduced) {
      onSettledRef.current();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let maxDelay = 0;
    let frameCount = 0;
    let frame = 0;
    let isVisible = true;
    let isDone = false;
    let hasSettled = false;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      if (width < 1 || height < 1) return;

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement('canvas');
      off.width = width;
      off.height = height;
      const octx = off.getContext('2d');
      if (!octx) return;

      paintWordmark(octx, width, height, '#fff');

      const data = octx.getImageData(0, 0, width, height).data;
      particles = [];
      maxDelay = 0;
      // Comfortably larger than the sample grid so adjacent grains always
      // overlap and tile into solid coverage once every particle has arrived
      // — no gaps between grains showing background through. Circles cover
      // less of their bounding box than squares, so this runs larger than
      // the square-grain version did.
      const grainSize = SAMPLE_STEP * 1.7;

      for (let y = 0; y < height; y += SAMPLE_STEP) {
        for (let x = 0; x < width; x += SAMPLE_STEP) {
          // Only skip genuinely-transparent pixels — excluding antialiased
          // edge pixels here means letterform edges never get a grain and
          // only appear later when the crisp glyph cross-fades in, reading
          // as inconsistent "pop-in" right at the resolve.
          if (data[(y * width + x) * 4 + 3] <= 10) continue;

          // Each grain starts scattered near its own letter, not raining
          // down from above — it converges inward to form the glyph.
          const angle = Math.random() * Math.PI * 2;
          const dist = 40 + Math.random() * 70;
          const sx = x + Math.cos(angle) * dist;
          const sy = y + Math.sin(angle) * dist;

          // Released left-to-right across the word, matching the reference
          // clip's sweep.
          const delay = (x / width) * 30 + Math.random() * 8;
          maxDelay = Math.max(maxDelay, delay);

          particles.push({
            tx: x,
            ty: y,
            sx,
            sy,
            x: sx,
            y: sy,
            size: grainSize * (0.95 + Math.random() * 0.2),
            delay,
            alpha: 0,
            color: GRAIN_COLORS[Math.floor(Math.random() * GRAIN_COLORS.length)],
          });
        }
      }
    };

    const draw = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      const resolveStart = maxDelay + TRAVEL_FRAMES;
      const resolveT = Math.min(
        1,
        Math.max(0, (frameCount - resolveStart) / RESOLVE_FRAMES),
      );

      for (const p of particles) {
        const localT = Math.min(
          1,
          Math.max(0, (frameCount - p.delay) / TRAVEL_FRAMES),
        );
        if (localT > 0) {
          const eased = easeOutCubic(localT);
          p.x = p.sx + (p.tx - p.sx) * eased;
          p.y = p.sy + (p.ty - p.sy) * eased;
          p.alpha = Math.min(1, p.alpha + 0.07);
        }

        if (p.alpha <= 0.01) continue;

        // The grain fades out as the resolve fades the real glyph in —
        // one continuous cross-blend, not a pop. Round dots read as soft
        // particles/dust rather than hard square pixels.
        ctx.globalAlpha = p.alpha * (1 - resolveT);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x + p.size / 2, p.y + p.size / 2, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (resolveT > 0) {
        ctx.globalAlpha = resolveT;
        paintWordmark(ctx, width, height, '#ffffff');
      }
      ctx.globalAlpha = 1;

      if (!hasSettled && frameCount >= resolveStart) {
        hasSettled = true;
        onSettledRef.current();
      }

      if (resolveT >= 1) {
        isDone = true;
        frame = 0;
        return; // Stop the loop — the solid glyph stays on the canvas as-is.
      }

      frame = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !frame && !isDone) {
          frame = requestAnimationFrame(draw);
        } else if (!isVisible && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const start = () => {
      build();
      if (isVisible && !frame) frame = requestAnimationFrame(draw);
    };

    // Wait for Roboto — sampling a fallback face gives the wrong letterforms.
    void (document.fonts?.ready ?? Promise.resolve()).then(start);

    const onResize = () => {
      if (isDone) build();
    };
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 block h-full w-full"
    />
  );
}
