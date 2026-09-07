'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import productsData from '@/data/products.json';
import { createProductWhatsAppLink } from '@/utils/whatsapp';
import SectionHeading from '@/components/common/SectionHeading';

export default function GiftFinder() {
  const [recipient, setRecipient] = useState('Wife');
  const [occasion, setOccasion] = useState('Anniversary');
  const [budget, setBudget] = useState('50k-plus');

  const recipients = ['Wife', 'Mother', 'Sister', 'Bride', 'Friend', 'Husband', 'Father'];
  const occasions = ['Birthday', 'Anniversary', 'Wedding', 'Festival', 'Special Moment'];
  const budgets = [
    { label: 'Under ₹25K', value: 'under-25k' },
    { label: '₹25K – ₹50K', value: '25k-50k' },
    { label: '₹50K – ₹1L', value: '50k-100k' },
    { label: '₹1L+', value: '50k-plus' }
  ];

  // Gift matching logic
  const recommendedGifts = productsData.filter((p) => {
    if (recipient === 'Husband' || recipient === 'Father') {
      return (p.occasion || []).includes('for-him') || p.tags?.includes('for-him');
    }
    if (recipient === 'Bride') {
      return (p.tags || []).includes('bridal') || p.category === 'Bridal Jewellery';
    }
    if (occasion === 'Anniversary') {
      return p.category === 'Diamond Jewellery' || p.tags?.includes('anniversary') || p.subcategory === 'Solitaire Rings';
    }
    if (budget === 'under-25k') {
      return (p.priceValue || 0) <= 50000;
    }
    return true;
  }).slice(0, 3);

  return (
    <section className="py-20 md:py-24 bg-[#121215] border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Art of Thoughtful Gifting"
          title="Find The Perfect Gift"
          subtitle="Discover heirlooms wrapped in emotional reverence for someone unforgettable."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#18181d] border border-[#C5A059]/20 rounded-sm p-6 sm:p-10 shadow-xl">
          {/* Questions Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Who Question */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C5A059] font-sans mb-2.5 font-medium">
                1. Who is this precious gift for?
              </label>
              <div className="flex flex-wrap gap-2">
                {recipients.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRecipient(r)}
                    className={`px-3 py-1.5 text-xs font-sans rounded-sm transition-all ${
                      recipient === r
                        ? 'bg-[#C5A059] text-black font-semibold shadow'
                        : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion Question */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C5A059] font-sans mb-2.5 font-medium">
                2. What milestone are you celebrating?
              </label>
              <div className="flex flex-wrap gap-2">
                {occasions.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setOccasion(o)}
                    className={`px-3 py-1.5 text-xs font-sans rounded-sm transition-all ${
                      occasion === o
                        ? 'bg-[#C5A059] text-black font-semibold shadow'
                        : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Question */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C5A059] font-sans mb-2.5 font-medium">
                3. Your preferred investment tier?
              </label>
              <div className="flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setBudget(b.value)}
                    className={`px-3 py-1.5 text-xs font-sans rounded-sm transition-all ${
                      budget === b.value
                        ? 'bg-[#C5A059] text-black font-semibold shadow'
                        : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations Preview Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Gift className="w-4 h-4 text-[#C5A059]" />
              <span className="text-xs uppercase tracking-wider text-[#FAF8F5] font-sans font-medium">
                Gift Recommendations for {recipient} ({occasion})
              </span>
            </div>

            <div className="space-y-3">
              {recommendedGifts.map((gift) => (
                <div
                  key={gift.id}
                  className="p-3 bg-black/40 border border-white/10 hover:border-[#C5A059]/40 rounded-sm flex items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-sm overflow-hidden bg-neutral-900 shrink-0">
                      <Image
                        src={gift.image}
                        alt={gift.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-sans block">
                        {gift.category} • {gift.purity}
                      </span>
                      <h4 className="font-serif text-sm text-[#FAF8F5] line-clamp-1">
                        {gift.name}
                      </h4>
                      <span className="text-xs text-neutral-300 font-sans">{gift.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/products/${gift.slug}`}
                      className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-xs text-neutral-200 font-sans uppercase rounded-sm"
                    >
                      View
                    </Link>
                    <a
                      href={createProductWhatsAppLink(gift)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-sm"
                      aria-label="Gift Enquiry on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
