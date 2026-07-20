import type { Metadata } from 'next';
import { WorkHero } from '@/components/work/WorkHero';
import { ProjectsGrid } from '@/components/work/ProjectsGrid';
import { FinalCta } from '@/components/home/FinalCta';

const WORK_DESCRIPTION =
  'Selected interior and corporate film projects by Dynamic Enterprises — residences, hospitality fit-outs and brand films across Pakistan.';

export const metadata: Metadata = {
  title: 'Work',
  description: WORK_DESCRIPTION,
  alternates: { canonical: '/work' },
  openGraph: { title: 'Work', description: WORK_DESCRIPTION },
  twitter: { title: 'Work', description: WORK_DESCRIPTION },
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
