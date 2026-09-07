'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';
import articlesData from '@/data/articles.json';
import SectionHeading from '@/components/common/SectionHeading';

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Articles & Guides' },
    { id: 'gold', label: 'Gold Buying' },
    { id: 'bridal', label: 'Bridal Guides' },
    { id: 'jewellery-care', label: 'Jewellery Care' },
    { id: 'jewellery-trends', label: 'Trends & Astrological' }
  ];

  const filteredArticles = selectedCategory === 'all'
    ? articlesData
    : articlesData.filter((a) => a.categorySlug === selectedCategory);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold">
          The Jewellery Journal
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF8F5] mt-2 mb-4">
          Connoisseur Guides & Care
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light leading-relaxed">
          Expert insights from our master gemologists on hallmarking standards, bridal suite layering, Ceylon Yellow Sapphires, and heirloom maintenance.
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-sans rounded-full uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#C5A059] text-black font-semibold shadow-md shadow-[#C5A059]/20'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((art) => (
          <article
            key={art.id}
            className="bg-[#121215] border border-white/10 hover:border-[#C5A059]/50 rounded-sm overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-xl"
          >
            <div>
              <div className="relative aspect-[16/10] bg-black/40 overflow-hidden">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-sans font-semibold bg-black/80 text-[#C5A059] border border-[#C5A059]/30 rounded">
                    {art.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-[11px] text-neutral-400 font-sans mb-2">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    {art.readTime}
                  </span>
                </div>

                <Link href={`/journal/${art.slug}`}>
                  <h2 className="font-serif text-xl text-[#FAF8F5] group-hover:text-[#E2C792] transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h2>
                </Link>

                <p className="text-xs text-neutral-400 font-sans font-light mt-2.5 line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/journal/${art.slug}`}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-sans text-[#C5A059] hover:text-[#E2C792] transition-colors"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
