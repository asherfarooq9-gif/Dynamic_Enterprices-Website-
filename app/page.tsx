import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { ServicesCards } from '@/components/home/ServicesCards';
import { Stats } from '@/components/home/Stats';
import { WorkMarquee } from '@/components/home/WorkMarquee';
import { Method } from '@/components/home/Method';
import { AtmosphereReel } from '@/components/home/AtmosphereReel';
import { FounderStory } from '@/components/home/FounderStory';
import { Testimonials } from '@/components/home/Testimonials';
import { FinalCta } from '@/components/home/FinalCta';
import { SITE } from '@/lib/site';

const HOME_DESCRIPTION =
  'Dynamic Enterprises — interior design, FF&E supplies, corporate films and uniforms from one accountable studio in Karachi, Pakistan since 2017.';

export const metadata: Metadata = {
  title: {
    absolute: 'Interior Design, FF&E Supplies, Corporate Films & Uniforms in Karachi',
  },
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: HOME_DESCRIPTION,
    url: SITE.url,
  },
  twitter: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: HOME_DESCRIPTION,
  },
};

/**
 * The light curve of the page:
 *   dark hero → white → cream → NAVY (the one held breath) → white → cream →
 *   white marble → navy footer.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesCards />
      <Stats />
      <WorkMarquee />
      <Method />
      <AtmosphereReel />
      <FounderStory />
      <Testimonials />
      <FinalCta />
    </>
  );
}
