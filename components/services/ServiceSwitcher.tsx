'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { SERVICES } from '@/content/services';
import { cn } from '@/lib/cn';

/**
 * Sits directly under every service detail hero so a visitor can jump
 * discipline-to-discipline without dropping back to the hub. The active tab's
 * mustard underline is a shared `layoutId`, so switching tabs slides the bar
 * across instead of snapping — the one moment of motion in an otherwise
 * static, sticky strip.
 */
export function ServiceSwitcher() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Switch service"
      className="sticky top-0 z-40 border-b border-navy/10 bg-white/95 backdrop-blur-sm"
    >
      <div className="shell">
        <ul className="flex gap-1 overflow-x-auto">
          {SERVICES.map((service) => {
            const href = `/services/${service.id}`;
            const isActive = pathname === href;

            return (
              <li key={service.id} className="relative shrink-0">
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-2.5 whitespace-nowrap px-5 py-6 text-[0.6875rem] font-bold uppercase tracking-[0.22em] transition-colors duration-normal sm:px-6',
                    isActive
                      ? 'text-navy'
                      : 'text-navy/40 hover:text-mustard-dark',
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
                    layoutId="service-switcher-underline"
                    className="absolute inset-x-5 -bottom-px h-[3px] rounded-full bg-mustard-dark sm:inset-x-6"
                    transition={{ duration: 0.5, ease: EASE.expo }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
