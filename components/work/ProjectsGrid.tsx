import { PhotoSlot } from '@/components/ui/PhotoSlot';
import { VideoSlot } from '@/components/ui/VideoSlot';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { PROJECTS } from '@/content/projects';
import { CORPORATE_FILMS } from '@/content/corporate-films';

/**
 * Two bodies of work — Interior photography and Corporate Films — each in
 * its own labelled section. Supplies and Scrub & Uniforms have no uploaded
 * work yet, so they're skipped here rather than shown empty.
 */
export function ProjectsGrid() {
  const interiorProjects = PROJECTS.filter((p) => p.discipline === 'Interior');

  return (
    <section aria-label="Projects" className="section-y bg-white">
      <div className="shell">
        <div>
          <SectionHeading eyebrow="01" title="INTERIOR" />

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {interiorProjects.map((project, i) => (
              <Reveal key={project.id} delay={Math.min(i * 0.05, 0.3)}>
                <div
                  id={project.id}
                  className="group scroll-mt-28 overflow-hidden rounded-lg shadow-large ring-1 ring-navy/[0.06] transition-shadow duration-500 ease-expo hover:shadow-premium hover:ring-mustard"
                >
                  <PhotoSlot
                    ratio="4:5"
                    placeholder={project.placeholder}
                    src={project.image}
                    alt={project.name}
                    zoom
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24 border-t border-navy/10 pt-20">
          <SectionHeading eyebrow="02" title="CORPORATE FILMS" />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {CORPORATE_FILMS.map((film, i) => (
              <Reveal key={film.src} delay={Math.min(i * 0.08, 0.3)}>
                <VideoSlot
                  src={film.src}
                  poster={film.poster}
                  title={film.title}
                  className="shadow-large"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
