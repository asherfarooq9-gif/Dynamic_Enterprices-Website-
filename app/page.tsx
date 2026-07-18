import { Hero } from '@/components/home/Hero';
import { ServicesCards } from '@/components/home/ServicesCards';
import { Stats } from '@/components/home/Stats';
import { WorkMarquee } from '@/components/home/WorkMarquee';
import { Method } from '@/components/home/Method';
import { FounderStory } from '@/components/home/FounderStory';
import { Testimonials } from '@/components/home/Testimonials';
import { FinalCta } from '@/components/home/FinalCta';

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
      <FounderStory />
      <Testimonials />
      <FinalCta />
    </>
  );
}
