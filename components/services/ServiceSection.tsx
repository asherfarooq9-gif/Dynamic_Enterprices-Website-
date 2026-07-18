import { SplitText } from '@/components/motion/SplitText';
import { Reveal } from '@/components/motion/Reveal';
import { PhotoSlot } from '@/components/ui/PhotoSlot';
import type { Service } from '@/content/services';
import { cn } from '@/lib/cn';

interface ServiceSectionProps {
  service: Service;
  /** Even index sits on white, odd on cream — the same light-curve rhythm as Home. */
  index: number;
}

/**
 * One full-bleed discipline per section, image and text alternating sides —
 * the for-living.it/services rhythm (a dedicated block per offering) rebuilt
 * for our four disciplines instead of their fourteen categories. Anchored by
 * `service.id` so the Home services cards (`/services#interior` etc.) land
 * directly on their section.
 */
export function ServiceSection({ service, index }: ServiceSectionProps) {
  const isReversed = index % 2 === 1;

  return (
    <section
      id={service.id}
      aria-label={service.title}
      className={cn(
        'section-y scroll-mt-28',
        index % 2 === 0 ? 'bg-white' : 'bg-cream',
      )}
    >
      <div className="shell">
        <div
          className={cn(
            'flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20',
            isReversed && 'lg:flex-row-reverse',
          )}
        >
          <div className="lg:w-1/2">
            <PhotoSlot
              ratio={service.ratio}
              aspectRatio={service.cardAspectRatio}
              placeholder={service.placeholder}
              src={service.sectionImage ?? service.image}
              alt={service.title}
              caption={service.title}
              subcaption={service.meta.left}
              zoom
              className="group rounded-lg shadow-large"
            />
          </div>

          <div className="lg:w-1/2">
            <span
              aria-hidden
              className="mb-6 block text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-mustard-dark"
            >
              {service.index} &mdash; {service.meta.right}
            </span>

            <SplitText
              as="h2"
              text={service.title.toUpperCase()}
              className="text-section uppercase text-navy"
            />

            <Reveal delay={0.1} className="mt-6">
              <p className="max-w-prose text-lead text-navy/70">
                {service.short}
              </p>
              <p className="mt-4 max-w-prose text-body text-navy/55">
                {service.body}
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <ul className="grid grid-cols-1 gap-x-8 gap-y-3 border-t border-navy/10 pt-8 sm:grid-cols-2">
                {service.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-start gap-3 text-small text-navy/70"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mustard-dark"
                    />
                    {capability}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
