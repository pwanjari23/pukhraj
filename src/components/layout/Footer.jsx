'use client';

import Link from 'next/link';
import { ShieldCheck, Sparkles, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import InstagramIcon from '@/components/common/InstagramIcon';
import businessData from '@/data/business.json';
import { getCleanWhatsAppNumber } from '@/utils/whatsapp';

export default function Footer({ onOpenAppointment }) {
  const cleanWaNumber = getCleanWhatsAppNumber();
  const rawPhone = businessData.phoneRaw || businessData.phone.replace(/[^0-9+]/g, '');

  const collectionsLinks = [
    { name: 'Gold Jewellery', href: '/collections?category=gold-jewellery' },
    { name: 'Bridal Suites', href: '/bridal' },
    { name: 'Diamond Solitaires', href: '/collections?category=diamond-jewellery' },
    { name: 'Polki & Kundan', href: '/collections?category=polki-kundan' },
    { name: 'Daily Wear Gold', href: '/collections?category=daily-wear' },
    { name: 'Silver & Pooja', href: '/collections?category=silver-jewellery' }
  ];

  const quickLinks = [
    { name: 'About Our Heritage', href: '/about' },
    { name: 'Bridal Look Builder', href: '/bridal' },
    { name: 'Jewellery Journal', href: '/journal' },
    { name: 'Gold & Diamond Care', href: '/journal/how-to-clean-and-care-for-gold-jewellery' },
    { name: 'Customer Wishlist', href: '/wishlist' },
    { name: 'Owner Proposal Deck', href: '/presentation' },
    { name: 'Contact & Showroom', href: '/contact' }
  ];

  return (
    <footer className="bg-[#070709] border-t border-[#C5A059]/20 text-neutral-400 font-sans pb-24 md:pb-12 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Promise Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-white/10 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-serif text-[#FAF8F5] tracking-wide">100% BIS Hallmarked</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Every piece stamped with government HUID purity.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-serif text-[#FAF8F5] tracking-wide">Certified Diamonds</h4>
              <p className="text-xs text-neutral-400 mt-0.5">International IGI & SGL laboratory certificates.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-serif text-[#FAF8F5] tracking-wide">Generational Trust</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Crafting heirlooms for Vidarbha&apos;s finest families.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.25em] text-[#FAF8F5] uppercase">
                PUKHRAJ
              </span>
              <span className="text-[10px] tracking-[0.4em] text-[#C5A059] uppercase font-medium">
                JEWELLERS • NAGPUR
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {businessData.subTagline || "Timeless craftsmanship for life's most unforgettable moments."}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={businessData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C5A059]/20 border border-white/10 hover:border-[#C5A059] flex items-center justify-center text-[#C5A059] transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${cleanWaNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Concierge"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366] flex items-center justify-center text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${rawPhone}`}
                aria-label="Call Store"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C5A059]/20 border border-white/10 hover:border-[#C5A059] flex items-center justify-center text-[#C5A059] transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={businessData.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Showroom Directions"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C5A059]/20 border border-white/10 hover:border-[#C5A059] flex items-center justify-center text-[#C5A059] transition-colors"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Jewellery Collections */}
          <div>
            <h3 className="font-serif text-base text-[#FAF8F5] tracking-wider mb-4 uppercase">
              Collections
            </h3>
            <ul className="space-y-2.5 text-xs">
              {collectionsLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-[#C5A059] transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C5A059]/50" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation & Guides */}
          <div>
            <h3 className="font-serif text-base text-[#FAF8F5] tracking-wider mb-4 uppercase">
              The Atelier
            </h3>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-[#C5A059] transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C5A059]/50" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Showroom & Hours */}
          <div className="space-y-3 text-xs">
            <h3 className="font-serif text-base text-[#FAF8F5] tracking-wider mb-4 uppercase">
              Nagpur Showroom
            </h3>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span className="text-neutral-300 leading-relaxed">
                {businessData.address}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
              <a href={`tel:${rawPhone}`} className="hover:text-[#C5A059] text-neutral-300">
                {businessData.phone}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
              <a href={`mailto:${businessData.email}`} className="hover:text-[#C5A059] text-neutral-300">
                {businessData.email}
              </a>
            </div>

            <div className="pt-2 border-t border-white/5 space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-[#C5A059] font-medium">
                Visiting Hours:
              </div>
              {businessData.openingHours?.map((oh, i) => (
                <div key={i} className="text-[11px] text-neutral-400">
                  <span className="text-neutral-300">{oh.days}:</span> {oh.hours}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onOpenAppointment}
              className="mt-3 w-full py-2 bg-[#C5A059]/10 hover:bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#E2C792] text-xs uppercase tracking-wider rounded-sm transition-colors"
            >
              Book In-Store Viewing
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} {businessData.name}, {businessData.city}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>{businessData.hallmarkNote}</span>
            <Link href="/presentation" className="text-[#C5A059] hover:underline">
              Owner Redesign Proposal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
