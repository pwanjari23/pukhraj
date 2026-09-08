'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Crown, ArrowRight, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileBridalJourney({ onOpenAppointment }) {
  const stages = [
    {
      id: 'first-look',
      stage: 'STAGE 01',
      title: 'The First Look',
      sub: 'Her regal coronation begins with authentic Maharashtrian Motya Nath and imperial chokers.',
      image: '/images/hero/bride.jpg',
      cta: 'Explore Chokers',
      href: '/bridal'
    },
    {
      id: 'engagement',
      stage: 'STAGE 02',
      title: 'The Engagement',
      sub: 'Certified solitaire rings and delicate diamond pendants designed to capture eternity.',
      image: '/images/hero/ring.jpg',
      cta: 'Explore Solitaires',
      href: '/collections?category=diamond-jewellery'
    },
    {
      id: 'wedding',
      stage: 'STAGE 03',
      title: 'The Sacred Wedding',
      sub: 'Kalyani 22K temple haars, syndicate polki, and ancestral craftsmanship for the sacred vows.',
      image: '/images/hero/necklace.jpg',
      cta: 'Explore Bridal Suites',
      href: '/bridal'
    },
    {
      id: 'reception',
      stage: 'STAGE 04',
      title: 'Grand Reception',
      sub: 'Statement cocktail solitaires, antique Pichodi kadas, and glittering diamond cascades.',
      image: '/images/hero/bangles.jpg',
      cta: 'Explore Bangles',
      href: '/collections?category=gold-jewellery'
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const current = stages[activeIdx];

  const next = () => setActiveIdx((i) => (i === stages.length - 1 ? 0 : i + 1));
  const prev = () => setActiveIdx((i) => (i === 0 ? stages.length - 1 : i - 1));

  return (
    <div className="space-y-4">
      {/* Horizontal Tab Stage Selector */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar border-b border-white/10 pb-2">
        {stages.map((stg, i) => {
          const isSelected = activeIdx === i;
          return (
            <button
              key={stg.id}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`py-1.5 px-3 rounded-full text-[11px] font-sans whitespace-nowrap transition-all min-touch-target ${
                isSelected
                  ? 'bg-[#C5A059] text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white bg-white/5'
              }`}
            >
              {stg.title}
            </button>
          );
        })}
      </div>

      {/* Viewport Slide Card */}
      <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-[#C5A059]/30 shadow-2xl bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Slide Content */}
            <div className="absolute inset-0 p-5 flex flex-col justify-end text-left z-10">
              <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#C5A059] mb-1">
                {current.stage}
              </span>
              <h3 className="font-serif text-2xl text-[#FAF8F5] leading-tight mb-1.5">
                {current.title}
              </h3>
              <p className="text-xs text-neutral-300 font-sans font-light line-clamp-2 leading-relaxed mb-4">
                {current.sub}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/15">
                <Link
                  href={current.href}
                  className="flex-1 py-2.5 px-3 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black font-sans text-xs uppercase tracking-wider font-semibold rounded-sm text-center flex items-center justify-center gap-1 min-touch-target"
                >
                  <span>{current.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={onOpenAppointment}
                  aria-label="Book Bridal Consultation"
                  className="py-2.5 px-3 bg-white/10 hover:bg-white/15 border border-white/20 text-[#FAF8F5] font-sans text-xs uppercase tracking-wider font-medium rounded-sm flex items-center justify-center gap-1.5 min-touch-target"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Book Suite</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous & Next Control Arrows */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous bridal stage"
            className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center border border-white/15 min-touch-target"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next bridal stage"
            className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center border border-white/15 min-touch-target"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
