'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const VIDEO_SRC = '/videos/home/atmosphere.mp4';
const POSTER_SRC = '/images/home/atmosphere-poster.jpg';

/**
 * A second, shorter dark breath between Method and FounderStory — sawdust and
 * joinery again, echoing the hero's dust motif. The video byte cost only hits
 * the network once the section is ~400px from view, and playback itself is
 * gated to actual visibility, so this never taxes the initial page load.
 */
export function AtmosphereReel() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReduced) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    loadObserver.observe(section);
    return () => loadObserver.disconnect();
  }, [prefersReduced]);

  useEffect(() => {
    if (!shouldLoad || prefersReduced) return;
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    video.load();

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    playObserver.observe(section);
    return () => playObserver.disconnect();
  }, [shouldLoad, prefersReduced]);

  return (
    <section
      ref={sectionRef}
      aria-label="Inside the studio"
      className="relative h-[70svh] min-h-[26rem] w-full overflow-hidden bg-navy"
    >
      {prefersReduced ? (
        <Image
          src={POSTER_SRC}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          preload="none"
          poster={POSTER_SRC}
        >
          {shouldLoad && <source src={VIDEO_SRC} type="video/mp4" />}
        </video>
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,31,29,0.3)_0%,rgba(0,12,11,0.35)_55%,rgba(0,12,11,0.82)_100%)]"
      />

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end px-6 pb-16 text-center sm:pb-20">
        <Reveal>
          <p className="text-[clamp(1.25rem,0.75rem+2.2vw,2.75rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
            Every detail, <span className="text-mustard">made by hand.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
