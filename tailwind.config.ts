import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    // Deliberately replacing, not extending: default Tailwind shadows and the
    // default type scale are the two biggest "template" tells.
    boxShadow: {
      none: 'none',
      soft: '0 2px 8px rgba(26,35,50,0.04), 0 8px 24px rgba(26,35,50,0.05)',
      large: '0 12px 32px rgba(26,35,50,0.07), 0 32px 64px rgba(26,35,50,0.08)',
      premium:
        '0 24px 60px rgba(26,35,50,0.10), 0 60px 120px rgba(26,35,50,0.12)',
      'soft-dark': '0 12px 30px rgba(0,0,0,0.35)',
      'large-dark': '0 30px 80px rgba(0,0,0,0.5)',
      'premium-dark': '0 40px 100px rgba(0,0,0,0.65)',
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a2332',
          light: '#2d3d55',
          deep: '#0f1620',
          deeper: '#0a0f18',
          black: '#060a12',
        },
        mustard: {
          DEFAULT: '#d4b74a',
          dark: '#a68b30',
          pale: '#c9b98a',
        },
        cream: {
          DEFAULT: '#f5f0e6',
          warm: '#e8dcc0',
          paper: '#fffcf3',
        },
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      fontSize: {
        // Roboto-only strategy: violent scale contrast, nothing in the middle.
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.25em' }],
        small: ['0.875rem', { lineHeight: '1.6' }],
        body: ['1.0625rem', { lineHeight: '1.7' }],
        lead: ['1.25rem', { lineHeight: '1.6' }],
        subtitle: [
          'clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem)',
          { lineHeight: '1.2', letterSpacing: '-0.02em' },
        ],
        section: [
          'clamp(2.75rem, 1.8rem + 4.2vw, 4.5rem)',
          { lineHeight: '0.95', letterSpacing: '-0.035em' },
        ],
        hero: [
          'clamp(3.25rem, 1rem + 8vw, 7.5rem)',
          { lineHeight: '0.92', letterSpacing: '-0.04em' },
        ],
      },
      spacing: {
        section: 'clamp(6rem, 4rem + 8vw, 12rem)',
        gutter: 'clamp(1.5rem, 1rem + 2.5vw, 4rem)',
      },
      maxWidth: {
        prose: '44ch',
        shell: '90rem',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        power: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '800ms',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(ellipse at 30% 40%, #243349 0%, #1a2332 40%, #0a0f18 100%)',
        'method-radial':
          'radial-gradient(ellipse at 70% 50%, #2d3d55 0%, #1a2332 30%, #0f1620 70%, #060a12 100%)',
        'marble-light':
          'linear-gradient(135deg, #ffffff 0%, #f4f6f9 50%, #eceff4 100%)',
        'paper-fade': 'linear-gradient(180deg, #ffffff 0%, #f5f0e6 100%)',
        'cream-fade': 'linear-gradient(180deg, #e8dcc0 0%, #ffffff 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
