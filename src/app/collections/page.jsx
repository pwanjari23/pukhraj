'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, SlidersHorizontal, X } from 'lucide-react';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import occasionsData from '@/data/occasions.json';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import ProductSort from '@/components/products/ProductSort';
import { useGlobalUI } from '@/components/layout/RootClientLayout';

function CollectionsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialOccasion = searchParams.get('occasion') || '';
  const initialFilter = searchParams.get('filter') || '';

  const { openQuickView, addToCompare, compareIds } = useGlobalUI();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedOccasion, setSelectedOccasion] = useState(initialOccasion);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedPurity, setSelectedPurity] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        // Query search
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchTags = (product.tags || []).some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchCat && !matchTags) return false;
        }

        // Category filter
        if (selectedCategory) {
          const matchCategory =
            product.category.toLowerCase() === selectedCategory.toLowerCase() ||
            product.category.toLowerCase().includes(selectedCategory.toLowerCase().replace(/-/g, ' '));
          if (!matchCategory) return false;
        }

        // Occasion filter
        if (selectedOccasion) {
          const matchOccasion = (product.occasion || []).some(
            (o) => o.toLowerCase() === selectedOccasion.toLowerCase()
          );
          if (!matchOccasion) return false;
        }

        // Style filter
        if (selectedStyle) {
          const matchStyle = (product.style || []).some(
            (s) => s.toLowerCase() === selectedStyle.toLowerCase()
          );
          if (!matchStyle) return false;
        }

        // Purity filter
        if (selectedPurity) {
          if (!product.purity || !product.purity.toLowerCase().includes(selectedPurity.toLowerCase())) {
            return false;
          }
        }

        // Budget tier filter
        if (selectedBudget) {
          const val = product.priceValue || 0;
          if (selectedBudget === 'under-50k' && val > 50000) return false;
          if (selectedBudget === '50k-100k' && (val <= 50000 || val > 100000)) return false;
          if (selectedBudget === '100k-300k' && (val <= 100000 || val > 300000)) return false;
          if (selectedBudget === 'above-300k' && val <= 300000) return false;
        }

        // Quick query param filters (new, trending)
        if (initialFilter === 'new' && !product.isNew) return false;
        if (initialFilter === 'trending' && !product.isTrending) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (sortBy === 'trending') return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
        if (sortBy === 'price-asc') return (a.priceValue || 0) - (b.priceValue || 0);
        if (sortBy === 'price-desc') return (b.priceValue || 0) - (a.priceValue || 0);
        if (sortBy === 'weight-desc') {
          const wA = parseFloat(a.weight) || 0;
          const wB = parseFloat(b.weight) || 0;
          return wB - wA;
        }
        // Default: featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [
    searchQuery,
    selectedCategory,
    selectedOccasion,
    selectedStyle,
    selectedPurity,
    selectedBudget,
    sortBy,
    initialFilter
  ]);

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedOccasion('');
    setSelectedStyle('');
    setSelectedPurity('');
    setSelectedBudget('');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold">
          High Jewellery Atelier
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF8F5] mt-2 mb-3">
          The Jewellery Catalogue
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light leading-relaxed">
          Explore our complete archive of 22K hallmarked gold, certified solitaires, antique temple chokers, and modern lightweight elegance.
        </p>
      </div>

      {/* Mobile Filter Toggle & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jewellery by design, metal, or style..."
            className="w-full px-4 py-2.5 bg-[#121215] border border-white/15 focus:border-[#C5A059] rounded-sm text-sm text-white font-sans placeholder:text-neutral-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="lg:hidden w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-[#FAF8F5] text-xs uppercase tracking-wider font-sans rounded-sm flex items-center justify-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
          <span>Filters & Categories</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24">
          <ProductFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedOccasion={selectedOccasion}
            onSelectOccasion={setSelectedOccasion}
            selectedStyle={selectedStyle}
            onSelectStyle={setSelectedStyle}
            selectedPurity={selectedPurity}
            onSelectPurity={setSelectedPurity}
            selectedBudget={selectedBudget}
            onSelectBudget={setSelectedBudget}
            onResetFilters={handleResetFilters}
            categories={categoriesData}
            occasions={occasionsData}
          />
        </aside>

        {/* Mobile Filters Drawer Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 flex flex-col justify-end lg:hidden">
            <div className="bg-[#141418] border border-white/10 rounded-t-lg p-6 max-h-[85vh] overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif text-lg text-[#FAF8F5]">Filter Jewellery</h3>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ProductFilters
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedOccasion={selectedOccasion}
                onSelectOccasion={setSelectedOccasion}
                selectedStyle={selectedStyle}
                onSelectStyle={setSelectedStyle}
                selectedPurity={selectedPurity}
                onSelectPurity={setSelectedPurity}
                selectedBudget={selectedBudget}
                onSelectBudget={setSelectedBudget}
                onResetFilters={handleResetFilters}
                categories={categoriesData}
                occasions={occasionsData}
              />

              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#C5A059] text-black font-sans uppercase text-xs tracking-widest font-semibold rounded-sm"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        )}

        {/* Products Grid & Sorting (Main Content) */}
        <div className="lg:col-span-9 space-y-6">
          <ProductSort
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalCount={filteredProducts.length}
          />

          <ProductGrid
            products={filteredProducts}
            onQuickView={openQuickView}
            onAddToCompare={addToCompare}
            compareIds={compareIds}
            emptyTitle="No Pieces Matching Your Selections"
            emptyDescription="Try resetting your purity, style, or budget filters to browse the rest of our collection."
          />
        </div>
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-neutral-400 font-serif">Loading catalogue...</div>}>
      <CollectionsContent />
    </Suspense>
  );
}
