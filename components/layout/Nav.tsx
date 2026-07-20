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
      {/* Apple-style glass bar: transparent/frosted rather than a solid fill,
          so the hero (always the dark navy `bg-hero-radial` treatment on
          every page) shows through with blur. Full-width on phones for a
          wider touch target; settles back into a compact centred pill from
          `sm` up. */}
      <motion.header
        className="fixed left-1/2 top-4 z-[80] w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] rounded-full bg-navy/35 shadow-premium ring-1 ring-white/15 backdrop-blur-xl sm:top-6 sm:w-fit"
        // Framer writes its own inline `transform`, which would otherwise wipe
        // out a Tailwind `-translate-x-1/2` class on the same element — so the
        // horizontal centering travels with Framer's x value instead.
        initial={{ x: '-50%', y: -96, opacity: 0 }}
        animate={{ x: '-50%', y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE.expo, delay: 0.1 }}
      >
        <nav
          aria-label="Main navigation"
          className="flex h-14 items-center justify-between gap-6 px-5 sm:h-16 sm:gap-10 sm:px-7"
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
                      'group relative block py-1 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-white/70 transition-colors duration-normal hover:text-mustard',
                      isActive && 'text-white',
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
              className="hidden rounded-full px-6 py-2.5 text-[0.625rem] font-bold uppercase tracking-[0.22em] text-white ring-1 ring-white/30 transition-colors duration-normal hover:bg-mustard hover:text-navy hover:ring-mustard md:block"
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
                    ? 'w-6 translate-y-[3.5px] rotate-45 bg-white'
                    : 'w-6 bg-white',
                )}
              />
              <span
                className={cn(
                  'h-px transition-all duration-normal ease-expo',
                  isMenuOpen
                    ? 'w-6 -translate-y-[3.5px] -rotate-45 bg-white'
                    : 'w-4 bg-white',
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[75] flex flex-col overflow-y-auto bg-navy md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE.expo }}
          >
            {/* `m-auto` centres the list when it fits the viewport and lets it
                scroll from the top when the options overflow (long lists,
                short/landscape viewports) instead of clipping. */}
            <ul className="shell m-auto w-full space-y-2 py-24">
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
