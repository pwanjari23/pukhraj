'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, Compass, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import businessData from '@/data/business.json';
import { getCleanWhatsAppNumber } from '@/utils/whatsapp';

export default function MobileExploreMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  const cleanWaNumber = getCleanWhatsAppNumber();
  const rawPhone = businessData.phoneRaw || businessData.phone.replace(/[^0-9+]/g, '');

  const exploreCategories = [
    {
      title: 'Full Collections',
      sub: 'All curated galleries',
      href: '/collections',
      badge: 'All'
    },
    {
      title: '22K Gold Jewellery',
      sub: 'BIS Hallmarked temple & heritage',
      href: '/collections?category=gold',
      badge: '22K'
    },
    {
      title: 'Certified Diamonds',
      sub: 'Solitaires, necklaces & bangles',
      href: '/collections?category=diamonds',
      badge: 'Diamonds'
    },
    {
      title: 'Royal Bridal Suites',
      sub: 'Trousseau chokers, haars & naths',
      href: '/bridal',
      badge: 'Bridal'
    },
    {
      title: 'Solitaire & Rings',
      sub: 'Engagement bands & daily rings',
      href: '/collections?category=diamonds',
      badge: 'Rings'
    },
    {
      title: 'Imperial Necklaces',
      sub: 'Chokers, raani haars & collars',
      href: '/collections?category=gold',
      badge: 'Necklaces'
    },
    {
      title: 'Heritage Earrings',
      sub: 'Jhumkas, chandbalis & studs',
      href: '/collections?category=gold',
      badge: 'Earrings'
    },
    {
      title: 'New Arrivals',
      sub: 'Fresh creations from karigars',
      href: '/collections?filter=new',
      badge: 'Fresh'
    },
    {
      title: 'Trending Designs',
      sub: 'Connoisseurs top picks',
      href: '/collections?filter=trending',
      badge: 'Popular'
    },
    {
      title: 'Custom Karigari',
      sub: 'Bespoke design for your moment',
      href: '/#custom-jewellery',
      badge: 'Bespoke'
    },
    {
      title: 'Jewellery Journal',
      sub: 'Buying guides & gold wisdom',
      href: '/journal',
      badge: 'Guides'
    },
    {
      title: 'Visit Showroom',
      sub: 'Nagpur private viewing lounge',
      href: '/#store-location',
      badge: 'Nagpur'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Slide-Up Bottom Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative z-10 w-full max-h-[85vh] bg-[#101014] border-t border-[#C5A059]/30 rounded-t-2xl shadow-2xl flex flex-col overflow-hidden pb-safe"
        >
          {/* Header Bar with Pull Handle */}
          <div className="pt-3 pb-4 px-5 border-b border-white/10 shrink-0">
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C5A059]" />
                <span className="font-serif text-lg text-[#FAF8F5]">
                  Explore Catalogue
                </span>
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded-full border border-[#C5A059]/20">
                  Concierge
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close explore menu"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 flex items-center justify-center transition-colors min-touch-target"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Category Grid */}
          <div className="p-4 overflow-y-auto space-y-2 no-scrollbar">
            <div className="grid grid-cols-2 gap-2.5">
              {exploreCategories.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  className="p-3 bg-[#16161c] hover:bg-[#1f1f26] border border-white/5 hover:border-[#C5A059]/40 rounded-sm flex flex-col justify-between group transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] uppercase font-sans font-semibold tracking-wider text-[#C5A059] bg-[#C5A059]/10 px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                    <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-[#C5A059] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-[#FAF8F5] leading-snug group-hover:text-[#E2C792] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-neutral-400 font-sans line-clamp-1 mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Direct Actions Footer */}
          <div className="p-4 bg-[#0a0a0c] border-t border-white/10 grid grid-cols-2 gap-2.5 shrink-0">
            <a
              href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent('Hi Pukhraj Jewellers, I would like to consult with your concierge.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center justify-center gap-1.5 transition-colors min-touch-target"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <a
              href={`tel:${rawPhone}`}
              className="py-2.5 px-3 bg-white/10 hover:bg-white/15 border border-white/15 text-[#FAF8F5] font-sans text-xs uppercase tracking-wider font-medium rounded-sm flex items-center justify-center gap-1.5 transition-colors min-touch-target"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Call Showroom</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
