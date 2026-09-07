'use client';

import { getRelatedProducts } from '@/utils/recommendations';
import ProductCard from './ProductCard';
import SectionHeading from '@/components/common/SectionHeading';

export default function RelatedProducts({ currentProduct, onQuickView }) {
  const related = getRelatedProducts(currentProduct, 4);

  if (!related || related.length === 0) return null;

  return (
    <div className="pt-16 border-t border-white/10">
      <SectionHeading
        tag="Harmonious Pairings"
        title="Complete The Royal Ensemble"
        subtitle="Artisan-selected pieces handcrafted to complement this silhouette."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {related.map((item) => (
          <ProductCard key={item.id} product={item} onQuickView={onQuickView} />
        ))}
      </div>
    </div>
  );
}
