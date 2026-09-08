'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Smartphone,
  Laptop,
  CheckCircle,
  MessageCircle,
  TrendingUp,
  Award,
  Crown,
  MapPin,
  Calendar,
  Layers,
  Zap,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import businessData from '@/data/business.json';

export default function OwnerPresentationPage() {
  const pillars = [
    {
      title: 'Digital Flagship Experience',
      desc: 'Elevates Pukhraj Jewellers above typical local jewellers into an elite luxury brand destination that commands high customer trust instantly.',
      icon: Award
    },
    {
      title: 'Conversion-Focused WhatsApp Engine',
      desc: 'Prefills specific product names, weights, and bridal suites into WhatsApp messages so customers enquire with one tap, drastically reducing friction.',
      icon: MessageCircle
    },
    {
      title: 'Interactive Bridal Look Builder',
      desc: 'First-of-its-kind feature in Nagpur allowing brides-to-be to assemble matching suites (necklace + earrings + bangles + nath) and share the total package to WhatsApp.',
      icon: Crown
    },
    {
      title: 'Guided Jewellery & Gift Finders',
      desc: 'Multi-step wizards guide undecided customers to the exact piece tailored to their budget, occasion, and relationship in seconds.',
      icon: Sparkles
    },
    {
      title: '100% Zero-Backend JSON Agility',
      desc: 'No expensive databases or fragile server setups. The store owner can update daily gold rates, contact numbers, or products simply by editing clean JSON files.',
      icon: Layers
    },
    {
      title: 'Mobile-First Masterclass',
      desc: 'With over 85% of luxury Indian shoppers browsing on phones, the site features a thumb-friendly bottom nav, swipeable action ribbons, and zero layout shifts.',
      icon: Smartphone
    }
  ];

  const comparison = [
    {
      feature: 'Visual Brand Aura',
      legacy: 'Generic templates, cluttered banners, low-resolution stock feeling',
      redesign: 'Flagship luxury showroom aesthetic with champagne gold accents, serif typography & cinematic reveals'
    },
    {
      feature: 'Customer Conversion',
      legacy: 'Passive phone number links with high drop-off',
      redesign: 'Context-aware dynamic WhatsApp CTAs prefilled with product codes, weights & purities'
    },
    {
      feature: 'Bridal Engagement',
      legacy: 'Static photo lists with no interactivity',
      redesign: 'Custom Bridal Look Builder + 3D Bespoke Custom Design karigari roadmap'
    },
    {
      feature: 'Mobile Usability',
      legacy: 'Shrunk desktop views with hard-to-tap buttons and poor readability',
      redesign: 'Native mobile bottom thumb-bar, full-screen drawer menu & responsive 1-col to 4-col grids'
    },
    {
      feature: 'Maintenance & Cost',
      legacy: 'Heavy database dependencies, slow page loads, expensive upkeep',
      redesign: 'Ultra-fast Next.js static architecture driven entirely by structured JSON files'
    }
  ];

  return (
    <div className="pt-28 pb-28 text-neutral-100 bg-[#08080a]">
      {/* Pitch Deck Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#E2C792] text-xs uppercase tracking-[0.25em] font-sans font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Strategic Proposal & Design Deck</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FAF8F5] leading-tight max-w-4xl mx-auto">
          A NEW DIGITAL EXPERIENCE FOR <br />
          <span className="text-gold-gradient font-normal italic">PUKHRAJ JEWELLERS</span>
        </h1>

        <p className="text-sm sm:text-base text-neutral-300 font-sans font-light max-w-2xl mx-auto mt-4 leading-relaxed">
          Prepared exclusively for the owners and directors of Pukhraj Jewellers, Nagpur. A comprehensive transformation of your brand&apos;s digital presence into a digital flagship showroom.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3.5 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black font-sans text-xs uppercase tracking-widest font-semibold rounded-sm shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition-all flex items-center gap-2"
          >
            <span>Launch Live Flagship Prototype</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/collections"
            className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-[#FAF8F5] border border-white/20 font-sans text-xs uppercase tracking-wider rounded-sm transition-all"
          >
            View Catalogue System
          </Link>
        </div>
      </section>

      {/* The Strategic Customer Journey Diagram */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-[#121215] border border-[#C5A059]/30 rounded-sm p-8 sm:p-12 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-sans font-medium">
              Conversion Architecture
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF8F5] mt-1">
              The Digital Flagship Customer Journey
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4 text-center">
            {[
              { step: '01', title: 'DISCOVER', desc: 'Captivating cinematic hero & verified Google/Instagram presence' },
              { step: '02', title: 'EXPLORE', desc: 'Interactive filters, Gold rate ticker, Occasions & Journal' },
              { step: '03', title: 'FALL IN LOVE', desc: 'Bridal Look Builder & high-res hover zoom galleries' },
              { step: '04', title: 'SAVE', desc: 'Persistent Wishlist & Side-by-side design comparison' },
              { step: '05', title: 'ENQUIRE', desc: '1-click dynamic prefilled WhatsApp messaging' },
              { step: '06', title: 'VISIT', desc: 'Directions to Nagpur showroom & private viewing booking' }
            ].map((item, idx) => (
              <div
                key={item.step}
                className="p-4 bg-white/5 border border-white/10 rounded-sm flex flex-col justify-between space-y-2 hover:border-[#C5A059]/40 transition-colors"
              >
                <span className="font-serif text-2xl text-[#C5A059] font-light">{item.step}</span>
                <h4 className="font-serif text-sm uppercase tracking-wider text-white font-medium">{item.title}</h4>
                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-sans font-medium">
            Strategic Elevation
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF8F5] mt-1">
            Current Digital Presence vs. New Flagship
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
            <thead>
              <tr className="border-b border-white/20 bg-[#141418]">
                <th className="p-4 text-[#C5A059] uppercase tracking-wider font-medium">Dimension</th>
                <th className="p-4 text-neutral-400 uppercase tracking-wider font-medium">Typical Jeweller Site</th>
                <th className="p-4 text-emerald-400 uppercase tracking-wider font-semibold">Pukhraj Flagship Redesign</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {comparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-serif text-base text-[#FAF8F5] whitespace-nowrap">{row.feature}</td>
                  <td className="p-4 text-neutral-400 max-w-xs">{row.legacy}</td>
                  <td className="p-4 text-neutral-200 font-medium max-w-sm text-emerald-200/90">{row.redesign}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-sans font-medium">
            Proprietary Innovations
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF8F5] mt-1">
            Core Business Advantages
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 bg-[#121215] border border-white/10 hover:border-[#C5A059]/40 rounded-sm space-y-3 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-[#FAF8F5]">{pillar.title}</h3>
                <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Device Mockups Simulation Preview */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <div className="p-8 sm:p-12 bg-gradient-to-b from-[#141418] to-[#0d0d10] border border-[#C5A059]/30 rounded-sm shadow-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold">
            Flawless Omnichannel Responsiveness
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF8F5] mt-2 mb-4">
            Tested Across 14 Viewport Breakpoints
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-2xl mx-auto leading-relaxed mb-8">
            From iPhone SE (320px) and Samsung Galaxy to 4K Ultra-wide displays (1920px), typography scales gracefully, images maintain luxury ratios, and floating actions never overlap essential content.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-5 bg-white/5 border border-white/10 rounded-sm">
              <Smartphone className="w-6 h-6 text-[#C5A059] mb-3" />
              <h4 className="font-serif text-base text-white">Mobile View (320px – 480px)</h4>
              <p className="text-xs text-neutral-400 font-sans mt-1">
                Fixed thumb navigation, 1–2 column product cards, swipeable action bar.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-sm">
              <Laptop className="w-6 h-6 text-[#C5A059] mb-3" />
              <h4 className="font-serif text-base text-white">Tablet & Laptop (768px – 1280px)</h4>
              <p className="text-xs text-neutral-400 font-sans mt-1">
                Masonry editorial cards, multi-faceted filter sidebar, zoom lenses.
              </p>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-sm">
              <Layers className="w-6 h-6 text-[#C5A059] mb-3" />
              <h4 className="font-serif text-base text-white">Large Desktop (1440px – 1920px)</h4>
              <p className="text-xs text-neutral-400 font-sans mt-1">
                Generous whitespace, 4-column catalogues, full-screen search overlay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Call to Action */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-serif text-3xl text-[#FAF8F5]">
          Ready to Make This the Official Face of Pukhraj?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-lg mx-auto">
          We are ready to plug in the store owner&apos;s verified contact details, official showroom photography, and live WhatsApp number.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black font-sans text-xs uppercase tracking-widest font-semibold rounded-sm shadow-xl shadow-[#C5A059]/20"
          >
            Review Complete Website Again
          </Link>
          <a
            href={businessData.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/20 font-sans text-xs uppercase tracking-wider rounded-sm transition-colors"
          >
            Nagpur Showroom Map Link
          </a>
        </div>
      </section>
    </div>
  );
}
