'use client';

import Link from 'next/link';
import { ShieldCheck, Sparkles, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import InstagramIcon from '@/components/common/InstagramIcon';
import businessData from '@/data/business.json';
import { getCleanWhatsAppNumber } from '@/utils/whatsapp';

export default function Footer({ onOpenAppointment }) {
  const cleanWaNumber = getCleanWhatsAppNumber();
  const rawPhone = businessData.phoneRaw || businessData.phone.replace(/[^0-9+]/g, '');


  return (
    <footer className="bg-[#070709] border-t border-[#C5A059]/20 text-neutral-400 font-sans pb-24 md:pb-12 pt-8 sm:pt-12 md:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Promise Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 mb-8 md:pb-12 md:mb-12 border-b border-white/10 max-w-sm sm:max-w-md mx-auto md:max-w-none w-full">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-serif text-[#FAF8F5] tracking-wide">100% BIS Hallmarked</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Every piece stamped with government HUID purity.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-serif text-[#FAF8F5] tracking-wide">Certified Diamonds</h4>
              <p className="text-xs text-neutral-400 mt-0.5">International IGI & SGL laboratory certificates.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-left">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 pb-12">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4 max-w-md">
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

          {/* Col 2: Showroom & Hours */}
          <div className="space-y-3 text-xs md:max-w-md md:ml-auto w-full">
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
