'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Navigation, Phone, MessageCircle, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import businessData from '@/data/business.json';
import { getMapEmbedUrl, getDirectionsUrl } from '@/utils/maps';
import DirectionsButton from '@/components/common/DirectionsButton';
import CallButton from '@/components/common/CallButton';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import SectionHeading from '@/components/common/SectionHeading';

export default function StoreMap() {
  const embedUrl = getMapEmbedUrl();
  const directionsUrl = getDirectionsUrl();
  const rawPhone = businessData.phoneRaw || businessData.phone.replace(/[^0-9+]/g, '');

  return (
    <section id="store-location" className="py-10 sm:py-14 md:py-28 bg-[#09090b] text-[#FAF8F5] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Visit Our Showroom"
          title="Nagpur Store Location"
          subtitle="Immerse yourself in our private viewing lounges. Centrally situated in Nagpur's historic jewellery and commercial district."
        />

        {/* Mobile Presentation: Compact Store Card + Map Preview (180-220px) */}
        <div className="block md:hidden">
          <div className="bg-[#121215] border border-[#C5A059]/30 rounded-sm p-4 shadow-xl space-y-3.5">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold block mb-0.5">
                Visit Our Store
              </span>
              <h3 className="font-serif text-xl text-[#FAF8F5]">
                {businessData.name}
              </h3>
              <p className="text-xs text-neutral-300 font-sans mt-1 leading-relaxed">
                {businessData.address}
              </p>
              <p className="text-[11px] text-[#C5A059] font-sans mt-0.5">
                {businessData.landmark}
              </p>
            </div>

            {/* Timings */}
            <div className="pt-2.5 border-t border-white/10 space-y-1 text-[11px] text-neutral-300 font-sans">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#C5A059]" />
                  <span>Mon – Sat:</span>
                </span>
                <span>10:30 AM – 8:30 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Sunday:</span>
                <span>11:00 AM – 7:00 PM</span>
              </div>
            </div>

            {/* 3 Action Buttons */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black font-sans text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center justify-center gap-1.5 min-touch-target"
              >
                <Navigation className="w-3.5 h-3.5 fill-black text-black" />
                <span>Get Directions</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <CallButton size="sm" variant="outline" className="w-full justify-center text-xs min-touch-target">
                  Call Showroom
                </CallButton>
                <WhatsAppButton size="sm" variant="primary" className="w-full justify-center text-xs min-touch-target">
                  WhatsApp
                </WhatsAppButton>
              </div>
            </div>

            {/* Compact Map Preview (approx 200px) */}
            <div className="relative h-[200px] w-full rounded-sm overflow-hidden border border-white/10 mt-2 bg-[#1a1a20]">
              <iframe
                src={embedUrl}
                title="Pukhraj Jewellers Nagpur Google Map Mobile"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(115%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Large Desktop / Responsive Interactive Map Panel (100% Unchanged) */}
        <div className="hidden md:grid bg-[#121215] border border-[#C5A059]/30 rounded-sm overflow-hidden shadow-2xl grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Column: Store Details & Action Matrix */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold block mb-1">
                  Flagship Destination
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5]">
                  {businessData.name}
                </h3>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">
                  {businessData.city}, Maharashtra
                </p>
              </div>

              {/* Showroom Address */}
              <div className="pt-3 border-t border-white/10 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-sans font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Address & Landmarks
                </span>
                <p className="text-xs text-neutral-200 font-sans leading-relaxed">
                  {businessData.address}
                </p>
                <p className="text-[11px] text-neutral-400 font-sans">
                  {businessData.landmark}
                </p>
                <div className="text-[10px] text-neutral-500 font-mono pt-1">
                  GPS: {businessData.latitude}° N, {businessData.longitude}° E
                </div>
              </div>

              {/* Opening Hours */}
              <div className="pt-3 border-t border-white/10 space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-sans font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Showroom Visiting Hours
                </span>
                {businessData.openingHours?.map((oh, i) => (
                  <div key={i} className="text-xs text-neutral-300 font-sans flex items-center justify-between">
                    <span>{oh.days}</span>
                    <span className="text-neutral-400">{oh.hours}</span>
                  </div>
                ))}
              </div>

              {/* Phone & Direct Contact */}
              <div className="pt-3 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-sans font-medium block mb-1">
                  Direct Inquiries
                </span>
                <a
                  href={`tel:${rawPhone}`}
                  className="text-sm text-neutral-200 hover:text-[#C5A059] font-sans font-medium transition-colors"
                >
                  {businessData.phone}
                </a>
              </div>
            </div>

            {/* Action Buttons Matrix */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] hover:brightness-110 text-black font-sans text-xs uppercase tracking-widest font-semibold rounded-sm shadow-xl shadow-[#C5A059]/20 transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 fill-black text-black" />
                <span>Get Google Maps Directions</span>
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <CallButton size="md" variant="outline" className="w-full justify-center text-xs">
                  Call Showroom
                </CallButton>

                <WhatsAppButton size="md" variant="primary" className="w-full justify-center text-xs">
                  WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Interactive Google Map */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px] bg-[#1a1a20]">
            <iframe
              src={embedUrl}
              title="Pukhraj Jewellers Nagpur Google Map"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(115%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />

            {/* Subtle Overlay Badge on Map */}
            <div className="absolute top-4 right-4 z-10 hidden sm:block">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-black/85 backdrop-blur-md border border-[#C5A059]/40 text-[#E2C792] text-xs font-sans rounded-sm shadow-xl flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3 h-3 text-[#C5A059]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
