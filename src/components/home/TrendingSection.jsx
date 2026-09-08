'use client';

import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import productsData from '@/data/products.json';
import ProductCard from '@/components/products/ProductCard';

export default function TrendingSection({ onQuickView, onAddToCompare, compareIds = [] }) {
  const trendingProducts = productsData.filter((p) => p.isTrending === true).slice(0, 4);

  return (
    <section className="py-10 sm:py-14 md:py-28 bg-[#121215] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-12">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold flex items-center gap-1.5 mb-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Beloved by Nagpur Connoisseurs</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#FAF8F5]">
              Trending Now
            </h2>
          </div>

          <Link
            href="/collections?filter=trending"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C5A059] hover:text-[#E2C792] font-sans font-medium transition-colors"
          >
            <span>View All Trending Designs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile: Horizontal Snap Carousel */}
        <div className="flex sm:hidden overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3 pb-2 -mx-4 px-4">
          {trendingProducts.map((product) => (
            <div key={`mobile-trend-${product.id}`} className="w-[68vw] max-w-[260px] shrink-0 snap-start">
              <ProductCard
                product={product}
                onQuickView={onQuickView}
                onAddToCompare={onAddToCompare}
                isComparing={compareIds.includes(product.id)}
              />
            </div>
          ))}
        </div>

        {/* Desktop: 4-Column Grid (100% Unchanged) */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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

        {/* Mobile View All CTA */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/collections?filter=trending"
            className="inline-flex items-center justify-center gap-1.5 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-[#FAF8F5] text-xs font-sans uppercase tracking-wider rounded-sm min-touch-target"
          >
            <span>View All Trending Designs</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
