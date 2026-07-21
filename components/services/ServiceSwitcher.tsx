'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCouch, FaBoxOpen, FaFilm, FaTshirt } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { EASE } from '@/lib/motion';
import { SERVICES } from '@/content/services';
import { cn } from '@/lib/cn';

const SERVICE_ICONS: Record<string, IconType> = {
  interior: FaCouch,
  supplies: FaBoxOpen,
  'corporate-films': FaFilm,
  'scrub-uniforms': FaTshirt,
};

/** Short mobile-only cue under each icon — four unlabeled icons aren't
 * self-explanatory to a first-time visitor. */
const SHORT_LABEL: Record<string, string> = {
  interior: 'Interior',
  supplies: 'Supplies',
  'corporate-films': 'Films',
  'scrub-uniforms': 'Uniforms',
};

/**
 * Pinned to the bottom of the viewport on every page so a visitor can jump
 * discipline-to-discipline from anywhere. Four equal cells, always. Below
 * `sm` each cell collapses to just its icon (an app-style tab bar — four
 * text labels don't fit a phone width without crushing); `sm` and up shows
 * the icon's index + label instead. The active cell carries a tinted fill
 * plus a mustard top edge (shared `layoutId`, so it slides between cells on
 * navigation instead of snapping).
 */
export function ServiceSwitcher() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Switch service"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(10,15,24,0.08)]"
    >
      <ul className="grid grid-cols-4">
        {SERVICES.map((service) => {
          const href = `/services/${service.id}`;
          const isActive = pathname === href;
          const Icon = SERVICE_ICONS[service.id];

          return (
            <li key={service.id} className="relative">
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                aria-label={service.title}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-2 py-3 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-navy transition-colors duration-normal sm:flex-row sm:gap-2.5 sm:px-6 sm:py-5',
                  isActive && 'bg-navy/[0.04]',
                )}
              >
                {Icon && (
                  <Icon aria-hidden className="text-lg text-navy sm:hidden" />
                )}
                <span
                  aria-hidden
                  className="text-[0.5rem] font-normal normal-case tracking-normal text-navy sm:hidden"
                >
                  {SHORT_LABEL[service.id]}
                </span>
                <span className="hidden text-[0.625rem] font-normal tracking-normal text-navy sm:inline">
                  {service.index}
                </span>
                <span className="hidden whitespace-nowrap text-navy sm:inline">
                  {service.title}
                </span>
              </Link>

              {isActive && (
                <motion.span
                  aria-hidden
                  layoutId="service-switcher-indicator"
                  className="absolute inset-x-0 top-0 h-[3px] bg-mustard-dark"
                  transition={{ duration: 0.5, ease: EASE.expo }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
