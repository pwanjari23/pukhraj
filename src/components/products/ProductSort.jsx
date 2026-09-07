'use client';

import { ArrowUpDown } from 'lucide-react';

export default function ProductSort({ sortBy, onSortChange, totalCount = 0 }) {
  const options = [
    { label: 'Featured & Signature', value: 'featured' },
    { label: 'New Arrivals First', value: 'newest' },
    { label: 'Trending First', value: 'trending' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Weight: Heavy to Light', value: 'weight-desc' }
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
      <div className="text-xs font-sans text-neutral-400">
        Showing <span className="text-[#FAF8F5] font-semibold">{totalCount}</span> exquisite creations
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="catalogue-sort" className="text-xs font-sans uppercase tracking-wider text-neutral-400 flex items-center gap-1">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Sort By:</span>
        </label>
        <select
          id="catalogue-sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-[#121215] border border-white/15 text-xs text-neutral-200 rounded-sm px-3 py-1.5 focus:outline-none focus:border-[#C5A059] font-sans"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#121215] text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
