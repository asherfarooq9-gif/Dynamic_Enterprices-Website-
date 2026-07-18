import { Counter } from '@/components/motion/Counter';
import { Reveal } from '@/components/motion/Reveal';
import { STATS } from '@/content/about';

/**
 * Numbers, set enormous, on cream. This is the scale-contrast rule doing the
 * work a serif would otherwise do: an 80px figure against a 10px tracked label
 * with nothing in between.
 */
export function Stats() {
  return (
    <section aria-label="Studio in numbers" className="bg-cream pb-section">
      <div className="shell">
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 border-t border-navy/10 pt-14 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <p className="text-[clamp(3rem,2rem+3.5vw,5rem)] font-bold leading-none tracking-[-0.04em] text-navy">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  pad={stat.pad}
                />
              </p>
              <p className="mt-4 text-[0.625rem] uppercase tracking-[0.25em] text-navy/45">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
