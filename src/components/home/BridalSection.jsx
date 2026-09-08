'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Crown, ArrowRight, ShieldCheck } from 'lucide-react';

import MobileBridalJourney from './MobileBridalJourney';

export default function BridalSection({ onOpenAppointment }) {
  const bridalAdornments = [
    'Imperial Bridal Sets',
    'Chokers & Raani Haars',
    'Heritage Chandbalis',
    'Antique Pichodi Bangles',
    'Royal Maang Tikka',
    'Maharashtrian Motya Nath',
    'Cocktail Solitaire Rings'
  ];

  return (
    <section className="py-10 sm:py-14 md:py-32 bg-[#0c0c0f] text-[#FAF8F5] relative overflow-hidden border-y border-[#C5A059]/20">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-25">
        <Image
          src="/images/hero/bride.jpg"
          alt="Royal Indian Bridal Heirloom Jewellery"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0f] via-[#0c0c0f]/90 to-[#0c0c0f]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile Presentation: Horizontal Storytelling Carousel */}
        <div className="block md:hidden">
          <div className="mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#E2C792] text-[10px] uppercase tracking-[0.22em] font-sans font-medium mb-2">
              <Crown className="w-3 h-3 text-[#C5A059]" />
              <span>Royal Bridal Haven</span>
            </div>
            <h2 className="font-serif text-2xl text-[#FAF8F5] uppercase tracking-tight leading-tight">
              The Bridal Journey
            </h2>
            <p className="text-xs text-neutral-300 font-sans mt-1">
              Four sacred chapters of adornment crafted for her most unforgettable day.
            </p>
          </div>

          <MobileBridalJourney onOpenAppointment={onOpenAppointment} />
        </div>

        {/* Desktop Presentation (100% Unchanged) */}
        <div className="hidden md:grid md:grid-cols-12 gap-12 items-center">
          {/* Left Text Presentation */}
          <div className="md:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#E2C792] text-xs uppercase tracking-[0.25em] font-sans font-medium"
            >
              <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>The Royal Vidarbha Bridal Haven</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#FAF8F5] leading-[1.1]"
            >
              FOR HER MOST <br />
              <span className="text-gold-gradient italic font-normal">IMPORTANT DAY</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base font-sans text-neutral-300 font-light leading-relaxed max-w-xl"
            >
              Step into our private bridal suites in Nagpur, where brides and their families are crowned with 22K hallmarked masterpieces, uncut syndicate Polki, and antique temple artistry passed through generations.
            </motion.p>

            {/* List of 7 Bridal Adornments */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {bridalAdornments.map((piece) => (
                <span
                  key={piece}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-neutral-300"
                >
                  {piece}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link
                href="/bridal"
                className="px-8 py-4 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] hover:brightness-110 text-black font-sans text-xs uppercase tracking-[0.2em] font-semibold rounded-sm text-center shadow-xl shadow-[#C5A059]/20 transition-all"
              >
                Explore Bridal Collection
              </Link>

              <button
                type="button"
                onClick={onOpenAppointment}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-[#FAF8F5] font-sans text-xs uppercase tracking-[0.2em] font-medium rounded-sm transition-colors text-center"
              >
                Book Bridal Suite Visit
              </button>
            </motion.div>
          </div>

          {/* Right Visual Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl">
              <Image
                src="/images/hero/necklace.jpg"
                alt="Imperial 22K Bridal Temple Necklace"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-sans block mb-1">
                  Signature Bridal Heirloom
                </span>
                <h4 className="font-serif text-xl text-white">
                  Kalyani Imperial Temple Suite
                </h4>
                <p className="text-xs text-neutral-300 font-sans mt-1">
                  Pure 22K (916) BIS Hallmarked • 92.60g
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
