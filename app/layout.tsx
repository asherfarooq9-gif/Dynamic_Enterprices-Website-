import type { Metadata, Viewport } from 'next';
import { Roboto, Homemade_Apple } from 'next/font/google';
import './globals.css';

import { SITE } from '@/lib/site';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ServiceSwitcher } from '@/components/services/ServiceSwitcher';
import { ChatWidget } from '@/components/chat/ChatWidget';
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
    'interior design Karachi',
    'turnkey interiors Pakistan',
    'FF&E procurement Pakistan',
    'architectural films',
    'corporate event production Pakistan',
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

export const viewport: Viewport = {
  themeColor: '#004346',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/logo.png`,
    image: `${SITE.url}/images/logo.png`,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: String(SITE.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address,
      addressLocality: SITE.city,
      addressRegion: 'Sindh',
      addressCountry: SITE.country,
    },
    description: SITE.description,
    sameAs: ['https://www.instagram.com/dynamicenterprises25'],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
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
          {/* Spacer so the fixed bottom ServiceSwitcher never overlaps the
              footer's own content/links. */}
          <div
            aria-hidden
            className="h-[calc(3.75rem+env(safe-area-inset-bottom))] sm:h-[4.25rem]"
          />
          <ServiceSwitcher />
          <ChatWidget />
        </SmoothScroll>
      </body>
    </html>
  );
}
