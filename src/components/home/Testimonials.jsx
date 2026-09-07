'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import testimonialsData from '@/data/testimonials.json';
import SectionHeading from '@/components/common/SectionHeading';

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = () => {
    setCurrentIdx((curr) => (curr === 0 ? testimonialsData.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentIdx((curr) => (curr === testimonialsData.length - 1 ? 0 : curr + 1));
  };

  const item = testimonialsData[currentIdx] || testimonialsData[0];

  return (
    <section className="py-20 md:py-28 bg-[#0a0a0c] text-[#FAF8F5] relative overflow-hidden border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <SectionHeading
          tag="Customer Reverence"
          title="Loved By Our Customers"
          subtitle="Real reflections from families who have entrusted their most precious heirloom moments to Pukhraj Jewellers."
        />

        {/* Carousel Slide Card */}
        <div className="relative bg-[#121215] border border-[#C5A059]/25 rounded-sm p-8 sm:p-12 shadow-2xl">
          <Quote className="w-12 h-12 text-[#C5A059]/20 mx-auto mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Star Ratings */}
              <div className="flex items-center justify-center gap-1 text-[#C5A059]">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-serif text-lg sm:text-2xl text-neutral-200 italic leading-relaxed max-w-2xl mx-auto font-light">
                "{item.review}"
              </p>

              {/* Author Info */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-serif text-lg text-[#FAF8F5]">{item.name}</h4>
                <div className="text-xs text-[#C5A059] font-sans mt-0.5">
                  {item.location} • <span className="text-neutral-400">{item.occasion}</span>
                </div>
                <div className="text-[10px] text-neutral-400 font-sans mt-1">
                  {item.date} • Verified Showroom Experience (Prototype)
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-1.5">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIdx(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIdx === i ? 'w-6 bg-[#C5A059]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
