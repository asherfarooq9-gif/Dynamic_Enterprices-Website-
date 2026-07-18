import { SplitText } from '@/components/motion/SplitText';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  /** Small tracked cap label. The far end of the scale jump. */
  eyebrow?: string;
  /** Use "\n" for deliberate line breaks — headlines are set, not wrapped. */
  title: string;
  /** A single word rendered in mustard, e.g. "HERITAGE." */
  accent?: string;
  as?: 'h1' | 'h2';
  className?: string;
  /** Light sections are the default; dark sections invert the colours. */
  tone?: 'light' | 'dark';
  /** Left is the default; center pulls the eyebrow rule and headline to the middle. */
  align?: 'left' | 'center';
}

/**
 * The one heading component. It enforces the Roboto-only strategy: a tracked
 * 11px eyebrow set directly against a 44–72px tightly-tracked bold headline,
 * with nothing at any size in between.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  as = 'h2',
  className,
  tone = 'light',
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <div
          className={cn(
            'eyebrow mb-6 flex items-center gap-3',
            align === 'center' && 'justify-center',
            tone === 'light' ? 'text-mustard-dark' : 'text-mustard',
          )}
        >
          <span aria-hidden className="h-px w-8 bg-current" />
          {eyebrow}
        </div>
      )}

      <SplitText
        as={as}
        text={title}
        accent={accent}
        className={cn('text-section uppercase', tone === 'dark' && 'text-white')}
      />
    </div>
  );
}
