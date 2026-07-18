import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { CORE_VALUES } from '@/content/about';

/**
 * Six values, six cards — cream bed, the same light register as Stats and
 * the mission/vision section either side of it.
 */
export function CoreValues() {
  return (
    <section aria-label="Core values" className="section-y bg-cream">
      <div className="shell">
        <SectionHeading eyebrow="What we stand on" title={'CORE\nVALUES'} />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((value, i) => (
            <Reveal
              key={value.title}
              delay={i * 0.06}
              className="surface-card p-7 transition-colors duration-500 hover:bg-cream-paper hover:ring-mustard/40"
            >
              <span className="text-[0.625rem] font-bold uppercase tracking-[0.25em] text-mustard-dark">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-subtitle text-navy">{value.title}</h3>
              <p className="mt-4 text-small text-navy/60">{value.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
