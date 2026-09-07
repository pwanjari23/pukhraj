'use client';

import { X, RotateCcw } from 'lucide-react';

export default function ProductFilters({
  selectedCategory,
  onSelectCategory,
  selectedOccasion,
  onSelectOccasion,
  selectedStyle,
  onSelectStyle,
  selectedPurity,
  onSelectPurity,
  selectedBudget,
  onSelectBudget,
  onResetFilters,
  categories = [],
  occasions = []
}) {
  const styles = [
    { label: 'All Styles', value: '' },
    { label: 'Traditional', value: 'traditional' },
    { label: 'Modern', value: 'modern' },
    { label: 'Minimal', value: 'minimal' },
    { label: 'Statement', value: 'statement' }
  ];

  const purities = [
    { label: 'All Purities', value: '' },
    { label: '22K Gold (916)', value: '22K' },
    { label: '18K Diamond Gold', value: '18K' },
    { label: '925 Sterling Silver', value: '925 Silver' }
  ];

  const budgets = [
    { label: 'All Budgets', value: '' },
    { label: 'Under ₹50,000', value: 'under-50k' },
    { label: '₹50,000 – ₹1,00,000', value: '50k-100k' },
    { label: '₹1,00,000 – ₹3,00,000', value: '100k-300k' },
    { label: '₹3,00,000 & Above', value: 'above-300k' }
  ];

  const hasActiveFilters = Boolean(
    selectedCategory || selectedOccasion || selectedStyle || selectedPurity || selectedBudget
  );

  return (
    <div className="bg-[#121215] border border-white/5 p-5 rounded-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <h3 className="font-serif text-lg text-[#FAF8F5] tracking-wide">Refine Catalogue</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] font-sans uppercase tracking-wider text-[#C5A059] hover:text-[#E2C792] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-sans uppercase tracking-wider text-[#C5A059] mb-2.5 font-medium">
          Jewellery Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => onSelectCategory('')}
            className={`px-3 py-1 text-xs rounded-sm transition-colors ${
              !selectedCategory
                ? 'bg-[#C5A059] text-black font-medium'
                : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug || selectedCategory === cat.name;
            return (
              <button
                key={cat.id || cat.slug}
                type="button"
                onClick={() => onSelectCategory(isSelected ? '' : cat.name)}
                className={`px-3 py-1 text-xs rounded-sm transition-colors ${
                  isSelected
                    ? 'bg-[#C5A059] text-black font-medium'
                    : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Occasion Filter */}
      <div>
        <label className="block text-xs font-sans uppercase tracking-wider text-[#C5A059] mb-2.5 font-medium">
          Occasion
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => onSelectOccasion('')}
            className={`px-3 py-1 text-xs rounded-sm transition-colors ${
              !selectedOccasion
                ? 'bg-[#C5A059] text-black font-medium'
                : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            All
          </button>
          {occasions.map((occ) => {
            const isSelected = selectedOccasion === occ.slug || selectedOccasion === occ.id;
            return (
              <button
                key={occ.id}
                type="button"
                onClick={() => onSelectOccasion(isSelected ? '' : occ.id)}
                className={`px-3 py-1 text-xs rounded-sm transition-colors ${
                  isSelected
                    ? 'bg-[#C5A059] text-black font-medium'
                    : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                }`}
              >
                {occ.name.split('&')[0].trim()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Style Filter */}
      <div>
        <label className="block text-xs font-sans uppercase tracking-wider text-[#C5A059] mb-2.5 font-medium">
          Design Aesthetic
        </label>
        <div className="grid grid-cols-2 gap-2">
          {styles.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => onSelectStyle(s.value)}
              className={`px-2.5 py-1.5 text-xs text-left rounded-sm transition-colors ${
                selectedStyle === s.value
                  ? 'bg-[#C5A059]/20 text-[#E2C792] border border-[#C5A059]'
                  : 'bg-white/5 text-neutral-400 hover:text-white border border-transparent'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Purity Filter */}
      <div>
        <label className="block text-xs font-sans uppercase tracking-wider text-[#C5A059] mb-2.5 font-medium">
          Purity / Metal
        </label>
        <div className="space-y-1.5">
          {purities.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => onSelectPurity(p.value)}
              className={`w-full px-2.5 py-1.5 text-xs text-left rounded-sm transition-colors ${
                selectedPurity === p.value
                  ? 'bg-[#C5A059]/20 text-[#E2C792] border border-[#C5A059]'
                  : 'bg-white/5 text-neutral-400 hover:text-white border border-transparent'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Tier Filter */}
      <div>
        <label className="block text-xs font-sans uppercase tracking-wider text-[#C5A059] mb-2.5 font-medium">
          Indicative Budget
        </label>
        <div className="space-y-1.5">
          {budgets.map((b) => (
            <button
              key={b.value}
              type="button"
              onClick={() => onSelectBudget(b.value)}
              className={`w-full px-2.5 py-1.5 text-xs text-left rounded-sm transition-colors ${
                selectedBudget === b.value
                  ? 'bg-[#C5A059]/20 text-[#E2C792] border border-[#C5A059]'
                  : 'bg-white/5 text-neutral-400 hover:text-white border border-transparent'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
