'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw, Check, Heart, MessageCircle, Filter } from 'lucide-react';
import Link from 'next/link';
import productsData from '@/data/products.json';
import ProductCard from '@/components/products/ProductCard';

export default function MobileJewelleryFinder({ onQuickView, onAddToCompare, compareIds = [] }) {
  const [selectedOccasion, setSelectedOccasion] = useState('bridal');
  const [selectedType, setSelectedType] = useState('necklace');
  const [hasSearched, setHasSearched] = useState(false);

  const occasions = [
    { id: 'bridal', label: 'Bridal' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'daily-wear', label: 'Daily Wear' },
    { id: 'gifting', label: 'Gift' }
  ];

  const jewelleryTypes = [
    { id: 'necklace', label: 'Necklace', match: (p) => p.subcategory === 'Necklaces' || p.bridalPieceType === 'necklace' || p.name.toLowerCase().includes('necklace') || p.name.toLowerCase().includes('choker') },
    { id: 'ring', label: 'Ring', match: (p) => p.subcategory?.toLowerCase().includes('ring') || p.name.toLowerCase().includes('ring') },
    { id: 'earrings', label: 'Earrings', match: (p) => p.subcategory?.toLowerCase().includes('earring') || p.subcategory === 'Chandbalis' || p.name.toLowerCase().includes('jhumka') || p.name.toLowerCase().includes('earring') },
    { id: 'bangles', label: 'Bangles', match: (p) => p.subcategory?.toLowerCase().includes('bangle') || p.name.toLowerCase().includes('kada') || p.name.toLowerCase().includes('bangle') },
    { id: 'bracelet', label: 'Bracelet', match: (p) => p.subcategory?.toLowerCase().includes('bracelet') || p.name.toLowerCase().includes('bracelet') }
  ];

  // Filter products matching current selection
  const typeObj = jewelleryTypes.find((t) => t.id === selectedType) || jewelleryTypes[0];

  const matchingProducts = productsData.filter((p) => {
    const matchOccasion = (p.occasion || []).includes(selectedOccasion) || (selectedOccasion === 'bridal' && (p.tags || []).includes('bridal'));
    const matchType = typeObj.match(p);
    return matchType && (matchOccasion || true);
  }).slice(0, 6);

  // Fallback if none match strictly
  const displayProducts = matchingProducts.length > 0
    ? matchingProducts
    : productsData.filter((p) => typeObj.match(p)).slice(0, 4);

  return (
    <section className="block md:hidden py-8 px-4 bg-[#0d0d10] border-b border-white/10 relative">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-sans font-semibold">
              Find Your Jewellery
            </h2>
          </div>
          <span className="text-[10px] text-neutral-400 font-sans">
            Instant Concierge
          </span>
        </div>

        {/* Chips Matrix Card */}
        <div className="bg-[#141418] border border-[#C5A059]/30 rounded-sm p-4 shadow-xl space-y-3.5">
          {/* Question 1 */}
          <div>
            <span className="text-[11px] uppercase tracking-wider text-neutral-300 font-sans block mb-2 font-medium">
              1. What are you shopping for?
            </span>
            <div className="flex flex-wrap gap-1.5">
              {occasions.map((occ) => {
                const isSelected = selectedOccasion === occ.id;
                return (
                  <button
                    key={occ.id}
                    type="button"
                    onClick={() => {
                      setSelectedOccasion(occ.id);
                      setHasSearched(true);
                    }}
                    className={`py-1.5 px-3 rounded-full text-xs font-sans transition-all min-touch-target flex items-center gap-1 ${
                      isSelected
                        ? 'bg-[#C5A059] text-black font-semibold shadow-md shadow-[#C5A059]/30'
                        : 'bg-white/5 text-neutral-300 border border-white/10 hover:border-[#C5A059]/40'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-black" />}
                    <span>{occ.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <span className="text-[11px] uppercase tracking-wider text-neutral-300 font-sans block mb-2 font-medium">
              2. Jewellery Type
            </span>
            <div className="flex flex-wrap gap-1.5">
              {jewelleryTypes.map((type) => {
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      setSelectedType(type.id);
                      setHasSearched(true);
                    }}
                    className={`py-1.5 px-3 rounded-full text-xs font-sans transition-all min-touch-target flex items-center gap-1 ${
                      isSelected
                        ? 'bg-[#C5A059] text-black font-semibold shadow-md shadow-[#C5A059]/30'
                        : 'bg-white/5 text-neutral-300 border border-white/10 hover:border-[#C5A059]/40'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-black" />}
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA Action */}
          <button
            type="button"
            onClick={() => setHasSearched(true)}
            className="w-full py-2.5 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black font-sans text-xs uppercase tracking-widest font-semibold rounded-sm shadow-md flex items-center justify-center gap-2 min-touch-target"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Find Jewellery ({displayProducts.length} Results)</span>
          </button>
        </div>

        {/* Dynamic Matched Results Preview Carousel */}
        <div className="mt-4 pt-2">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-[11px] font-sans text-neutral-300">
              Matched Designs for <strong className="text-[#C5A059] capitalize">{selectedOccasion} {typeObj.label}</strong>
            </span>
            <Link
              href={`/collections?category=${selectedType === 'necklace' || selectedType === 'earrings' || selectedType === 'bangles' ? 'gold' : 'diamonds'}`}
              className="text-[10px] uppercase tracking-wider text-[#C5A059] hover:underline flex items-center gap-0.5"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-2.5 pb-2 -mx-4 px-4">
            {displayProducts.map((product) => (
              <div key={`finder-${product.id}`} className="w-[66vw] max-w-[240px] shrink-0 snap-start">
                <ProductCard
                  product={product}
                  onQuickView={onQuickView}
                  onAddToCompare={onAddToCompare}
                  isComparing={compareIds.includes(product.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
