import type { Metadata } from 'next';
import { Roboto, Homemade_Apple } from 'next/font/google';
import './globals.css';

import { SITE } from '@/lib/site';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { PageTransition } from '@/components/motion/PageTransition';
import { LoadingScreen } from '@/components/motion/LoadingScreen';
import { ScrollProgress } from '@/components/motion/ScrollProgress';

// Two weights. No 500. The scale jump does the hierarchy, not the weight.
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

// REPLACE: placeholder for the founders' scanned signatures.
const script = Homemade_Apple({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'interior design Islamabad',
    'turnkey interiors Pakistan',
    'FF&E procurement Pakistan',
    'architectural films',
    'event production Islamabad',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: String(SITE.founded),
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressCountry: SITE.country,
    },
    description: SITE.description,
  };

  return (
    <html lang="en" className={`${roboto.variable} ${script.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <LoadingScreen />
        <ScrollProgress />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <Nav />
          <PageTransition>
            <main id="main">{children}</main>
            <Footer />
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
