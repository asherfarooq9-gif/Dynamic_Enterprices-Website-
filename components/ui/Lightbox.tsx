'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxProps {
  images: readonly string[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Fullscreen photo-grid overlay. Closes on Escape, backdrop click, or the
 * close button — locks body scroll while open so the page behind doesn't
 * scroll with it.
 */
export function Lightbox({ images, title, isOpen, onClose }: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-50 overflow-y-auto bg-navy-deeper/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <div className="shell relative py-20">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="fixed right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-cream transition-colors hover:bg-mustard hover:text-navy"
            >
              <FiX size={20} />
            </button>

            <h2 className="mb-10 text-center text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-mustard">
              {title}
            </h2>

            <div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              onClick={(event) => event.stopPropagation()}
            >
              {images.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[4/5] overflow-hidden rounded-lg"
                >
                  <Image
                    src={src}
                    alt={`${title} ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
