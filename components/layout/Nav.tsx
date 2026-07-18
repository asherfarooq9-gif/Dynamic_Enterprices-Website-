'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { NAV_LINKS, SITE } from '@/lib/site';
import { cn } from '@/lib/cn';

/**
 * Permanently navy, on every page, at every scroll position — matching the
 * for-living.it reference bar rather than the old transparent-over-hero
 * treatment. One fixed dark strip the whole site sits under.
 */
export function Nav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // A locked body is the only correct behaviour behind a full-screen menu.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* A compact, centred pill — not a stretched bar. Width is content-driven
          (w-fit) with a cap, so it reads as an object floating over the hero
          rather than a strip spanning it. The near-black fill plus a hairline
          ring gives it real contrast against the navy hero behind it. */}
      <motion.header
        className="fixed left-1/2 top-4 z-[80] w-fit max-w-[calc(100vw-2rem)] rounded-full bg-white shadow-premium ring-1 ring-navy/10 backdrop-blur-sm sm:top-6"
        // Framer writes its own inline `transform`, which would otherwise wipe
        // out a Tailwind `-translate-x-1/2` class on the same element — so the
        // horizontal centering travels with Framer's x value instead.
        initial={{ x: '-50%', y: -96, opacity: 0 }}
        animate={{ x: '-50%', y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE.expo, delay: 0.1 }}
      >
        <nav
          aria-label="Main navigation"
          className="flex h-14 items-center gap-6 px-5 sm:h-16 sm:gap-10 sm:px-7"
        >
          <Link href="/" aria-label={SITE.name} className="flex items-center">
            <Image
              src="/images/logo.jpg"
              alt={SITE.name}
              width={112}
              height={125}
              priority
              className="h-10 w-auto sm:h-12"
            />
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'group relative block py-1 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-navy/60 transition-colors duration-normal hover:text-mustard-dark',
                      isActive && 'text-navy',
                    )}
                  >
                    {link.label}
                    {/* Underline draws from the left on hover, stays drawn on
                        the active route. */}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute -bottom-0.5 left-0 h-px w-full origin-left bg-mustard-dark transition-transform duration-500 ease-expo',
                        isActive
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100',
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="hidden rounded-full px-6 py-2.5 text-[0.625rem] font-bold uppercase tracking-[0.22em] text-navy ring-1 ring-navy/25 transition-colors duration-normal hover:bg-mustard hover:text-navy hover:ring-mustard md:block"
            >
              Contact
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="flex h-8 w-8 flex-col items-end justify-center gap-1.5 md:hidden"
            >
              <span
                className={cn(
                  'h-px transition-all duration-normal ease-expo',
                  isMenuOpen
                    ? 'w-6 translate-y-[3.5px] rotate-45 bg-navy'
                    : 'w-6 bg-navy',
                )}
              />
              <span
                className={cn(
                  'h-px transition-all duration-normal ease-expo',
                  isMenuOpen
                    ? 'w-6 -translate-y-[3.5px] -rotate-45 bg-navy'
                    : 'w-4 bg-navy',
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[75] flex flex-col justify-center bg-navy md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE.expo }}
          >
            <ul className="shell space-y-2">
              {[...NAV_LINKS, { href: '/contact', label: 'Contact' }].map(
                (link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2 + i * 0.06,
                      duration: 0.6,
                      ease: EASE.expo,
                    }}
                  >
                    <Link
                      href={link.href}
                      className="block py-2 text-section uppercase text-cream transition-colors hover:text-mustard"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ),
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
