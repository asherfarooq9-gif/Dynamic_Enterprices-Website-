'use client';

import Link from 'next/link';
import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/lib/cn';

type Variant = 'solid' | 'outline' | 'ghost';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: Variant;
  disabled?: boolean;
  className?: string;
  /** Magnetic pull toward the cursor. On by default for primary CTAs. */
  magnetic?: boolean;
}

const BASE = [
  'group relative inline-flex items-center justify-center gap-3',
  'rounded px-8 py-4',
  'text-[0.6875rem] font-bold uppercase tracking-[0.25em]',
  'transition-[background-color,color,box-shadow] duration-normal ease-expo',
  'disabled:pointer-events-none disabled:opacity-40',
].join(' ');

const VARIANT: Record<Variant, string> = {
  // Navy → mustard on hover, exactly as approved in the final CTA prototype.
  solid:
    'bg-navy text-white shadow-large hover:bg-mustard hover:text-navy hover:shadow-premium',
  outline:
    'text-navy ring-1 ring-navy/25 hover:bg-navy hover:text-white hover:ring-navy',
  ghost: 'text-navy hover:text-mustard',
};

export function Button({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'solid',
  disabled = false,
  className,
  magnetic = variant === 'solid',
}: ButtonProps) {
  const ref = useMagnetic<HTMLDivElement>(magnetic ? 0.3 : 0);

  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-normal ease-expo group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </>
  );

  const classes = cn(BASE, VARIANT[variant], className);

  // The magnetic transform lives on a wrapper so it never fights the button's
  // own hover state.
  return (
    <div ref={ref} className="inline-block will-transform">
      {href ? (
        <Link href={href} className={classes}>
          {inner}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={classes}
        >
          {inner}
        </button>
      )}
    </div>
  );
}
