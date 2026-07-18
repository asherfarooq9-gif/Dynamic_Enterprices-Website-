'use client';

import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PhotoSlot } from '@/components/ui/PhotoSlot';
import { Lightbox } from '@/components/ui/Lightbox';
import { Reveal } from '@/components/motion/Reveal';
import { SUPPLIES_PRODUCTS } from '@/content/supplies-products';
import { LAB_FURNITURE_GALLERY } from '@/content/lab-furniture-gallery';

/** One shared card shape across all five tiles, so the grid reads as a set. */
const PRODUCT_ASPECT: Record<string, string> = {
  'cleaning-products': '3/2',
  housekeeping: '3/2',
  'disposable-products': '3/2',
  'medical-disposal-products': '3/2',
  'lab-furniture': '3/2',
};

/**
 * Supplies-only: the product range, named. Same PhotoSlot + hover-reveal
 * move as InteriorGallery, but each tile carries its product name as a
 * caption instead of running photo-only. Lab Furniture opens a lightbox
 * with the full 12-photo gallery — the only tile with more than one shot.
 */
export function SuppliesProductsGrid() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <section aria-label="Supplies products" className="section-y bg-cream">
      <div className="shell">
        <SectionHeading eyebrow="The range" title={'WHAT WE\nSUPPLY'} align="center" className="mx-auto" />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SUPPLIES_PRODUCTS.map((product, i) => {
            const tile = (
              <PhotoSlot
                ratio="4:5"
                aspectRatio={PRODUCT_ASPECT[product.id]}
                src={product.image}
                alt={product.name}
                caption={product.name}
                zoom
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="rounded-lg shadow-large"
              />
            );

            const isLabFurniture = product.id === 'lab-furniture';

            return (
              <Reveal
                key={product.id}
                delay={Math.min(i * 0.08, 0.3)}
                className={isLabFurniture ? 'sm:col-span-2 lg:col-span-4' : undefined}
              >
                {isLabFurniture ? (
                  <button
                    type="button"
                    onClick={() => setIsGalleryOpen(true)}
                    aria-label={`View ${product.name} gallery`}
                    className="mx-auto block w-full text-left lg:max-w-xs"
                  >
                    {tile}
                  </button>
                ) : (
                  tile
                )}
              </Reveal>
            );
          })}
        </div>
      </div>

      <Lightbox
        images={LAB_FURNITURE_GALLERY}
        title="Lab Furniture"
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </section>
  );
}
