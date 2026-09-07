'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw, Check, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import productsData from '@/data/products.json';
import { createProductWhatsAppLink } from '@/utils/whatsapp';
import SectionHeading from '@/components/common/SectionHeading';

export default function JewelleryFinder({ onQuickView }) {
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState('wedding');
  const [style, setStyle] = useState('traditional');
  const [budget, setBudget] = useState('100k-plus');
  const [showResults, setShowResults] = useState(false);

  const occasionOptions = [
    { id: 'wedding', label: 'Wedding & Grand Celebrations', desc: 'Opulent bridal & heirloom pieces' },
    { id: 'engagement', label: 'Engagement & Solitaires', desc: 'Timeless rings & romantic sparkle' },
    { id: 'festive', label: 'Festive & Auspicious', desc: 'Dhanteras, Diwali & temple gold' },
    { id: 'daily-wear', label: 'Daily Wear & Workwear', desc: 'Lightweight chains & subtle rings' },
    { id: 'gifting', label: 'Meaningful Gifting', desc: 'Tokens of love for milestones' }
  ];

  const styleOptions = [
    { id: 'traditional', label: 'Traditional Royal', desc: 'Imperial filigree, antique temple & polki' },
    { id: 'modern', label: 'Modern Contemporary', desc: 'Sleek geometric lines & diamond cuts' },
    { id: 'minimal', label: 'Understated Minimal', desc: 'Feather-light & delicate daily luxury' },
    { id: 'statement', label: 'Bold Statement', desc: 'Showstopper creations with commanding aura' }
  ];

  const budgetOptions = [
    { id: 'under-50k', label: 'Under ₹50,000', desc: 'Lightweight gold, silver pooja & daily pendants' },
    { id: '50k-100k', label: '₹50,000 – ₹1,00,000', desc: 'Diamond earrings, gold chains & mangalsutras' },
    { id: '100k-300k', label: '₹1,00,000 – ₹3,00,000', desc: 'Solitaire rings, diamond bangles & chokers' },
    { id: '100k-plus', label: '₹3,00,000 & Above', desc: 'Grand royal bridal suites & heavy temple necklaces' }
  ];

  // Filtering matching products
  const matchingProducts = productsData.filter((product) => {
    const matchOccasion = (product.occasion || []).includes(occasion);
    const matchStyle = (product.style || []).includes(style);

    // Budget match
    let matchBudget = true;
    const price = product.priceValue || 0;
    if (budget === 'under-50k') matchBudget = price <= 50000;
    else if (budget === '50k-100k') matchBudget = price > 50000 && price <= 100000;
    else if (budget === '100k-300k') matchBudget = price > 100000 && price <= 300000;
    else if (budget === '100k-plus') matchBudget = price > 300000;

    return (matchOccasion || matchStyle) && (matchBudget || true);
  }).slice(0, 4);

  const handleReset = () => {
    setStep(1);
    setOccasion('wedding');
    setStyle('traditional');
    setBudget('100k-plus');
    setShowResults(false);
  };

  return (
    <section className="py-20 md:py-28 bg-[#0e0e12] border-y border-[#C5A059]/15 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="Curated Guided Discovery"
          title="Find Your Perfect Jewellery"
          subtitle="Answer three simple questions to reveal designs meticulously matched to your occasion, aesthetic, and price preference."
        />

        {/* Multi-Step Wizard Card */}
        <div className="bg-[#141418] border border-[#C5A059]/25 rounded-sm p-6 sm:p-10 shadow-2xl">
          {/* Step Progress Indicators */}
          <div className="flex items-center justify-between max-w-xl mx-auto mb-10">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs font-semibold transition-colors ${
                    step >= num || showResults
                      ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/30'
                      : 'bg-white/10 text-neutral-400'
                  }`}
                >
                  {num}
                </div>
                <span className="hidden sm:inline text-xs uppercase tracking-wider font-sans text-neutral-300">
                  {num === 1 ? 'Occasion' : num === 2 ? 'Aesthetic' : 'Budget'}
                </span>
                {num < 3 && <div className="w-8 sm:w-16 h-[1px] bg-white/10 mx-1" />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Occasion */}
            {step === 1 && !showResults && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="font-serif text-2xl text-center text-[#FAF8F5]">
                  Step 1: What sacred occasion are you celebrating?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {occasionOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setOccasion(opt.id)}
                      className={`p-4 rounded-sm border text-left transition-all ${
                        occasion === opt.id
                          ? 'bg-[#C5A059]/20 border-[#C5A059] ring-1 ring-[#C5A059]'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-lg text-[#FAF8F5]">{opt.label}</span>
                        {occasion === opt.id && <Check className="w-4 h-4 text-[#C5A059]" />}
                      </div>
                      <p className="text-xs text-neutral-400 font-sans">{opt.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-[#C5A059] hover:bg-[#b08d47] text-black font-sans text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center gap-2 transition-all"
                  >
                    <span>Next: Select Style</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Style */}
            {step === 2 && !showResults && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="font-serif text-2xl text-center text-[#FAF8F5]">
                  Step 2: What aesthetic best mirrors your personality?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {styleOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setStyle(opt.id)}
                      className={`p-4 rounded-sm border text-left transition-all ${
                        style === opt.id
                          ? 'bg-[#C5A059]/20 border-[#C5A059] ring-1 ring-[#C5A059]'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-lg text-[#FAF8F5]">{opt.label}</span>
                        {style === opt.id && <Check className="w-4 h-4 text-[#C5A059]" />}
                      </div>
                      <p className="text-xs text-neutral-400 font-sans">{opt.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white font-sans"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 bg-[#C5A059] hover:bg-[#b08d47] text-black font-sans text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center gap-2 transition-all"
                  >
                    <span>Next: Select Budget</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Budget */}
            {step === 3 && !showResults && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="font-serif text-2xl text-center text-[#FAF8F5]">
                  Step 3: What is your estimated investment range?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {budgetOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setBudget(opt.id)}
                      className={`p-4 rounded-sm border text-left transition-all ${
                        budget === opt.id
                          ? 'bg-[#C5A059]/20 border-[#C5A059] ring-1 ring-[#C5A059]'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-lg text-[#FAF8F5]">{opt.label}</span>
                        {budget === opt.id && <Check className="w-4 h-4 text-[#C5A059]" />}
                      </div>
                      <p className="text-xs text-neutral-400 font-sans">{opt.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white font-sans"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResults(true)}
                    className="px-8 py-3 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black font-sans text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center gap-2 shadow-lg shadow-[#C5A059]/20 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Show My Jewellery</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step Results */}
            {showResults && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/10 pb-4 gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#FAF8F5]">
                      Meticulously Handpicked For You
                    </h3>
                    <p className="text-xs text-[#C5A059] font-sans mt-0.5">
                      Selections matching {occasion} • {style} aesthetic
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white uppercase tracking-wider font-sans transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Try Another Search</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {matchingProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-[#18181d] border border-white/10 hover:border-[#C5A059]/50 rounded-sm p-3.5 flex flex-col justify-between group transition-all"
                    >
                      <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-black/40 mb-3">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="200px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-0.5 text-[9px] bg-black/80 text-[#C5A059] rounded">
                            {p.purity}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                          {p.category}
                        </span>
                        <h4 className="font-serif text-base text-[#FAF8F5] line-clamp-1">
                          {p.name}
                        </h4>
                        <div className="text-xs text-[#E2C792] font-sans font-medium">
                          {p.price}
                        </div>

                        <div className="pt-3 border-t border-white/10 flex gap-2">
                          <Link
                            href={`/products/${p.slug}`}
                            className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-center text-xs text-neutral-200 uppercase tracking-wider font-sans rounded-sm transition-colors"
                          >
                            Details
                          </Link>
                          <a
                            href={createProductWhatsAppLink(p)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-sm flex items-center justify-center"
                            aria-label="Enquire on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-4">
                  <Link
                    href="/collections"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] hover:text-[#E2C792] font-sans"
                  >
                    <span>Browse Entire {matchingProducts.length > 0 ? matchingProducts[0].category : 'Jewellery'} Catalogue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
