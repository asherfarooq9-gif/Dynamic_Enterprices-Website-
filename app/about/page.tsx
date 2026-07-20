import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { CoreValues } from '@/components/about/CoreValues';
import { ManagementTeam } from '@/components/about/ManagementTeam';
import { ClientsWall } from '@/components/about/ClientsWall';
import { FinalCta } from '@/components/home/FinalCta';
import { Reveal } from '@/components/motion/Reveal';
import { MISSION, VISION } from '@/content/about';

const ABOUT_DESCRIPTION =
  'Dynamic Enterprises is a Karachi-based multi-discipline studio founded in 2017 — meet the team, mission and values behind the work.';

export const metadata: Metadata = {
  title: 'About',
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: { title: 'About', description: ABOUT_DESCRIPTION },
  twitter: { title: 'About', description: ABOUT_DESCRIPTION },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <section aria-label="Mission and vision" className="section-y bg-white">
        <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3 text-mustard-dark">
              <span aria-hidden className="h-px w-8 bg-current" />
              Mission
            </p>
            <p className="max-w-prose text-lead text-navy/70">{MISSION}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow mb-6 flex items-center gap-3 text-mustard-dark">
              <span aria-hidden className="h-px w-8 bg-current" />
              Vision
            </p>
            <p className="max-w-prose text-lead text-navy/70">{VISION}</p>
          </Reveal>
        </div>
      </section>

      <CoreValues />
      <ManagementTeam />
      <ClientsWall />
      <FinalCta />
    </>
  );
}
