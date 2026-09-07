'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import productsData from '@/data/products.json';

export default function SearchOverlay({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchTerm('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setFilteredProducts([]);
      return;
    }

    const matches = productsData.filter((p) => {
      const matchName = p.name.toLowerCase().includes(term);
      const matchCategory = p.category.toLowerCase().includes(term);
      const matchSub = (p.subcategory || '').toLowerCase().includes(term);
      const matchPurity = (p.purity || '').toLowerCase().includes(term);
      const matchTags = (p.tags || []).some((t) => t.toLowerCase().includes(term));
      const matchOccasion = (p.occasion || []).some((o) => o.toLowerCase().includes(term));
      const matchStyle = (p.style || []).some((s) => s.toLowerCase().includes(term));

      return (
        matchName ||
        matchCategory ||
        matchSub ||
        matchPurity ||
        matchTags ||
        matchOccasion ||
        matchStyle
      );
    });

    setFilteredProducts(matches.slice(0, 8));
  }, [searchTerm]);

  const quickSearchTags = [
    '22K Gold Choker',
    'Diamond Solitaire',
    'Bridal Temple Set',
    'Polki Chandbalis',
    'Antique Kadas',
    'Yellow Sapphire'
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#0a0a0c]/98 backdrop-blur-2xl flex flex-col p-4 sm:p-8"
      >
        {/* Top Bar with Close */}
        <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-sans font-medium">
              Digital Catalogue Search
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close search overlay"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Input Box */}
        <div className="max-w-4xl w-full mx-auto pt-8">
          <div className="relative flex items-center border-b-2 border-[#C5A059]/60 focus-within:border-[#C5A059] pb-3">
            <Search className="w-6 h-6 text-[#C5A059] mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by jewellery piece, gold purity, bridal, solitaire, occasion..."
              className="w-full bg-transparent text-xl sm:text-2xl md:text-3xl text-[#FAF8F5] placeholder:text-neutral-500 font-serif focus:outline-none tracking-wide"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="text-xs text-neutral-400 hover:text-white font-sans uppercase tracking-wider px-2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Suggestions */}
          {!searchTerm && (
            <div className="mt-6">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-sans block mb-3">
                Suggested Curations:
              </span>
              <div className="flex flex-wrap gap-2">
                {quickSearchTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchTerm(tag)}
                    className="px-3.5 py-1.5 bg-white/5 hover:bg-[#C5A059]/15 border border-white/10 hover:border-[#C5A059]/50 text-neutral-300 hover:text-[#E2C792] text-xs font-sans rounded-full transition-all duration-300"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Search Results Container */}
        <div className="max-w-4xl w-full mx-auto flex-1 overflow-y-auto mt-8 pr-1 no-scrollbar">
          {searchTerm && filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-neutral-400 font-sans">
              <p className="text-base font-serif text-neutral-300 mb-2">No matching jewellery pieces found</p>
              <p className="text-xs">Try searching for keywords like "Choker", "22K", "Diamond", "Bangles", or "Bridal".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C5A059]/50 rounded-sm p-3 flex flex-col justify-between transition-all duration-300"
                >
                  <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden bg-black/40 mb-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="200px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-1.5 py-0.5 text-[9px] bg-black/70 text-[#C5A059] border border-[#C5A059]/30 rounded">
                        {product.purity}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-sans mb-1">
                      {product.category}
                    </div>
                    <h4 className="font-serif text-sm text-[#FAF8F5] group-hover:text-[#C5A059] line-clamp-1">
                      {product.name}
                    </h4>
                    <div className="mt-2 flex items-center justify-between text-xs text-[#E2C792] font-sans">
                      <span>{product.price || 'On Request'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
