'use client';

import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import productsData from '@/data/products.json';
import ProductCard from '@/components/products/ProductCard';

export default function TrendingSection({ onQuickView, onAddToCompare, compareIds = [] }) {
  const trendingProducts = productsData.filter((p) => p.isTrending === true).slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-[#121215] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold flex items-center gap-1.5 mb-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Beloved by Nagpur Connoisseurs</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FAF8F5]">
              Trending Now
            </h2>
          </div>

          <Link
            href="/collections?filter=trending"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C5A059] hover:text-[#E2C792] font-sans font-medium transition-colors"
          >
            <span>View All Trending Designs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCompare={onAddToCompare}
              isComparing={compareIds.includes(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
