'use client';

import Link from 'next/link';
import { FiArrowUpRight, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { NAV_LINKS, SITE, DISCIPLINES } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Navy close. The site opens dark, spends its life in the light, and closes
 * dark — the footer is the back cover, not another section.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy text-cream">
      {/* Gradient washes so the flat navy never reads as a solid block. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(12,92,87,0.9),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/3 right-0 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(212,183,74,0.10),transparent_60%)]"
      />

      <div className="shell relative pb-20 pt-section">
        <Reveal className="text-center">
          <p className="whitespace-nowrap text-[clamp(1.5rem,0.6rem+3vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-[-0.035em] text-white">
            Spaces designed. <span className="text-mustard">Stories delivered.</span>
          </p>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr]">
          <Reveal delay={0.05}>
            <p className="max-w-prose text-body text-cream/60">
              {DISCIPLINES.join(' · ')} — one studio, full accountability.
            </p>

            {/* REPLACE: newsletter posts nowhere until an endpoint exists. */}
            <form
              className="mt-10 flex max-w-md items-center gap-4 border-b border-cream/20 pb-3 focus-within:border-mustard"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                required
                placeholder="Your email"
                className="w-full bg-transparent text-body text-cream placeholder:text-cream/35 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-11 w-11 shrink-0 items-center justify-center text-mustard transition-transform duration-normal ease-expo hover:translate-x-1"
              >
                <FiArrowUpRight size={20} />
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="eyebrow text-mustard">Menu</h2>
            <ul className="mt-8 space-y-4">
              {[...NAV_LINKS, { href: '/contact', label: 'Contact' }].map(
                (link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-body text-cream/70 transition-colors duration-normal hover:text-mustard"
                    >
                      <span
                        aria-hidden
                        className="h-px w-0 bg-mustard transition-[width] duration-500 ease-expo group-hover:w-5"
                      />
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <h2 className="eyebrow text-mustard">Studio</h2>
            <address className="mt-8 space-y-4 not-italic text-body text-cream/70">
              <p>{SITE.address}</p>
              <p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-mustard"
                >
                  {SITE.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                  className="transition-colors hover:text-mustard"
                >
                  {SITE.phone}
                </a>
              </p>
            </address>

            <div className="mt-8 flex gap-4">
              <a
                href={SITE.social.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-cream/15 transition-colors duration-normal hover:bg-mustard hover:text-navy hover:ring-mustard"
              >
                <FiInstagram size={16} />
              </a>
              <a
                href={SITE.social.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-cream/15 transition-colors duration-normal hover:bg-mustard hover:text-navy hover:ring-mustard"
              >
                <FiLinkedin size={16} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4 border-t border-cream/10 py-8 text-[0.625rem] uppercase tracking-[0.22em] text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            {SITE.city} · {SITE.country}
          </span>
          <span>
            &copy; {year} {SITE.name}
          </span>
          <span>
            Est · <b className="text-mustard">{SITE.foundedRoman}</b>
          </span>
        </div>
      </div>
    </footer>
  );
}
