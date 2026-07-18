import type { Metadata } from 'next';
import { WorkHero } from '@/components/work/WorkHero';
import { ProjectsGrid } from '@/components/work/ProjectsGrid';
import { FinalCta } from '@/components/home/FinalCta';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Work',
  description: `Selected projects across interior, supplies, corporate films and uniforms — ${SITE.description}`,
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <ProjectsGrid />
      <FinalCta />
    </>
  );
}
