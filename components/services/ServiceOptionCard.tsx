import Link from 'next/link';
import { PhotoSlot } from '@/components/ui/PhotoSlot';
import type { Service } from '@/content/services';

interface ServiceOptionCardProps {
  service: Service;
}

/**
 * One of the four entry points on the Services hub. Each links straight to
 * its own dedicated route (`/services/[id]`) — there is no in-page detail
 * here, only enough to make the choice: image, index, title, one line.
 */
export function ServiceOptionCard({ service }: ServiceOptionCardProps) {
  return (
    <Link
      href={`/services/${service.id}`}
      className="group block overflow-hidden rounded-lg shadow-large ring-1 ring-navy/[0.06] transition-shadow duration-500 ease-expo hover:shadow-premium hover:ring-mustard"
    >
      <div className="relative overflow-hidden">
        <PhotoSlot
          ratio="4:5"
          placeholder={service.placeholder}
          src={service.image}
          alt={service.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          zoom
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy-deeper/70 via-navy-deeper/10 to-transparent"
        />

        <span className="absolute left-5 top-5 text-[0.6875rem] font-bold uppercase tracking-[0.25em] text-mustard">
          {service.index}
        </span>

        <div className="absolute inset-x-5 bottom-5">
          <h3 className="text-subtitle font-bold uppercase leading-[0.95] text-white">
            {service.title}
          </h3>
          <span className="mt-3 inline-flex items-center gap-2 text-[0.625rem] font-bold uppercase tracking-[0.25em] text-cream/70 transition-colors duration-300 group-hover:text-mustard">
            View service
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
