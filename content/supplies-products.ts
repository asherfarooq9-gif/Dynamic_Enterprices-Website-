export interface SuppliesProduct {
  id: string;
  name: string;
  /** REPLACE: drop the photo at this path — falls back to the gradient placeholder. */
  image?: string;
}

export const SUPPLIES_PRODUCTS: readonly SuppliesProduct[] = [
  {
    id: 'cleaning-products',
    name: 'Cleaning Products',
    image: '/images/services/supplies-products/1.jpg',
  },
  {
    id: 'housekeeping',
    name: 'Housekeeping',
    image: '/images/services/supplies-products/2.jpg',
  },
  {
    id: 'disposable-products',
    name: 'Disposable Products',
    image: '/images/services/supplies-products/3.jpg',
  },
  {
    id: 'medical-disposal-products',
    name: 'Medical Disposal Products',
    image: '/images/services/supplies-products/4.jpg',
  },
  {
    id: 'lab-furniture',
    name: 'Lab Furniture',
    image: '/images/services/supplies-products/5.jpg',
  },
] as const;
