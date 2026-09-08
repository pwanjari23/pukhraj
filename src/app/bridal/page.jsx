'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Crown, Sparkles, Calendar, MessageCircle } from 'lucide-react';
import productsData from '@/data/products.json';
import BridalLookBuilder from '@/components/features/BridalLookBuilder';
import ProductCard from '@/components/products/ProductCard';
import { useGlobalUI } from '@/components/layout/RootClientLayout';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import SectionHeading from '@/components/common/SectionHeading';

export default function BridalHavenPage() {
  const { openAppointment, openQuickView, addToCompare, compareIds } = useGlobalUI();

  const bridalProducts = productsData.filter(
    (p) => p.category === 'Bridal Jewellery' || p.tags?.includes('bridal')
  );

  return (
    <div className="pt-24 pb-20">
      {/* Bridal Cinematic Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/images/hero/bride.jpg"
            alt="The Royal Vidarbha Bridal Sanctuary"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#E2C792] text-xs uppercase tracking-[0.25em] font-sans font-medium">
            <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>The Royal Bridal Haven</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#FAF8F5] uppercase tracking-tight leading-tight">
            Heirlooms For Her <br />
            <span className="text-gold-gradient italic font-normal">Sacred Coronation</span>
          </h1>

          <p className="text-xs sm:text-base text-neutral-300 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Welcome to Central India&apos;s sanctuary of royal bridal karigari. Each suite is cast in pure 22K hallmarked gold and uncut natural Polki, crafted to turn sacred vows into generational legacies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={openAppointment}
              className="px-8 py-4 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black font-sans text-xs uppercase tracking-widest font-semibold rounded-sm shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition-all"
            >
              Book Private Bridal Viewing
            </button>

            <WhatsAppButton
              variant="outline"
              size="lg"
              message="Hi Pukhraj Jewellers, I would like to consult with your bridal stylist about wedding jewellery."
              className="text-xs"
            >
              Consult Bridal Stylist
            </WhatsAppButton>
          </div>
        </div>
      </section>

      {/* Interactive Bridal Look Builder */}
      <BridalLookBuilder onOpenAppointment={openAppointment} />

      {/* Curated Bridal Trousseau Gallery */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Bridal Masterpieces"
          title="The Royal Wedding Gallery"
          subtitle="Explore hand-chiseled temple suites, layered raani haars, and signature Basra pearl naths."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bridalProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={openQuickView}
              onAddToCompare={addToCompare}
              isComparing={compareIds.includes(product.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
