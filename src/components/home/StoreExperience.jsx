'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Phone, MessageCircle, Calendar, Clock } from 'lucide-react';
import businessData from '@/data/business.json';
import DirectionsButton from '@/components/common/DirectionsButton';
import CallButton from '@/components/common/CallButton';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import SectionHeading from '@/components/common/SectionHeading';

export default function StoreExperience({ onOpenAppointment }) {
  return (
    <section className="py-20 md:py-28 bg-[#121215] text-[#FAF8F5] relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Nagpur Flagship Showroom"
          title="Step Inside Pukhraj"
          subtitle="Experience the grandeur of our private bridal viewing lounges, state-of-the-art karat testing, and warm hospitality."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Showroom Images Collage */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=85"
                alt="Pukhraj Jewellers Nagpur Showroom Interior"
                fill
                sizes="(max-width: 768px) 50vw, 30vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="relative aspect-square rounded-sm overflow-hidden border border-white/10 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&q=85"
                  alt="Private Bridal Lounge Pukhraj Jewellers"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-sm overflow-hidden border border-white/10 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=85"
                  alt="Diamond Solitaire Viewing Counter"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Showroom Information & 4 CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-sm space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-sans block mb-1">
                  Location & Address
                </span>
                <p className="text-sm font-sans text-neutral-200 leading-relaxed">
                  {businessData.address}
                </p>
                <p className="text-xs text-[#C5A059] font-sans mt-1">
                  {businessData.landmark}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-sans block mb-1">
                  Showroom Timings
                </span>
                {businessData.openingHours?.map((oh, i) => (
                  <div key={i} className="text-xs text-neutral-300 font-sans flex items-center justify-between py-0.5">
                    <span>{oh.days}</span>
                    <span className="text-neutral-400">{oh.hours}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-sans block mb-1">
                  Telephone & Inquiries
                </span>
                <p className="text-sm text-neutral-200 font-sans font-medium">
                  {businessData.phone}
                </p>
              </div>
            </div>

            {/* 4 Reusable Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <DirectionsButton size="md" variant="gold" className="w-full justify-center text-xs">
                Get Directions
              </DirectionsButton>

              <CallButton size="md" variant="outline" className="w-full justify-center text-xs">
                Call Store
              </CallButton>

              <WhatsAppButton size="md" variant="primary" className="w-full justify-center text-xs">
                WhatsApp
              </WhatsAppButton>

              <button
                type="button"
                onClick={onOpenAppointment}
                className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/15 border border-white/20 text-[#FAF8F5] text-xs font-sans uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span>Book Visit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
