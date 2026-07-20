'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { SERVICES } from '@/content/services';
import { cn } from '@/lib/cn';

/**
 * Pinned to the bottom of the viewport on every page so a visitor can jump
 * discipline-to-discipline from anywhere. Full-width, four equal cells from
 * `sm` up; the active cell carries a tinted fill plus a mustard top edge
 * (shared `layoutId`, so it slides between cells on navigation instead of
 * snapping). Below `sm` it stays horizontally scrollable so four labels
 * never get crushed on a narrow phone.
 */
export function ServiceSwitcher() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Switch service"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-white shadow-[0_-4px_24px_rgba(10,15,24,0.08)]"
    >
      <ul className="flex overflow-x-auto sm:grid sm:grid-cols-4">
        {SERVICES.map((service) => {
          const href = `/services/${service.id}`;
          const isActive = pathname === href;

          return (
            <li key={service.id} className="relative shrink-0 sm:shrink">
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center justify-center gap-2.5 whitespace-nowrap px-6 py-5 text-[0.6875rem] font-bold uppercase tracking-[0.22em] transition-colors duration-normal sm:w-full',
                  isActive
                    ? 'bg-navy/[0.04] text-navy'
                    : 'text-navy/45 hover:text-mustard-dark',
                )}
              >
                <span
                  className={cn(
                    'text-[0.625rem] font-normal tracking-normal',
                    isActive ? 'text-mustard-dark' : 'text-navy/25',
                  )}
                >
                  {service.index}
                </span>
                {service.title}
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
