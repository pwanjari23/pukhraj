'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MessageCircle, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import businessData from '@/data/business.json';

export default function FinalCTA({ onOpenAppointment }) {
  return (
    <section className="relative py-28 md:py-36 bg-[#08080a] text-[#FAF8F5] overflow-hidden text-center">
      {/* Cinematic Background with Subtle Parallax & Zoom Effect */}
      <motion.div
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 z-0 opacity-30"
      >
        <Image
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=90"
          alt="Pukhraj Jewellers Royal Indian Gold & Diamond Suite"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/85 to-[#08080a]/60" />
      </motion.div>

      {/* Background Decorative Gold Concentric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#E2C792] text-xs uppercase tracking-[0.25em] font-sans font-medium"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>The Digital Flagship • Nagpur</span>
        </motion.div>

        {/* Exact Requested Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-[#FAF8F5] leading-[1.12]"
        >
          FIND THE PIECE THAT <br />
          <span className="text-gold-gradient italic font-normal">FEELS LIKE YOU.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base font-sans text-neutral-300 font-light max-w-xl mx-auto leading-relaxed"
        >
          Immerse yourself in centuries of hallmark craftsmanship, transparent guidance, and bespoke bridal elegance at our flagship Nagpur showroom.
        </motion.p>

        {/* 3 Explicit Buttons: Explore Jewellery, Visit Our Store, WhatsApp Us */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link
            href="/collections"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] hover:brightness-110 text-black font-sans text-xs uppercase tracking-[0.2em] font-semibold rounded-sm shadow-xl shadow-[#C5A059]/20 transition-all transform hover:-translate-y-0.5"
          >
            Explore Jewellery
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-[#FAF8F5] border border-white/20 hover:border-[#C5A059] font-sans text-xs uppercase tracking-[0.2em] font-medium rounded-sm backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4 text-[#C5A059]" />
            <span>Visit Our Store</span>
          </Link>

          <WhatsAppButton
            size="lg"
            variant="primary"
            className="w-full sm:w-auto text-xs"
          >
            WhatsApp Us
          </WhatsAppButton>
        </motion.div>
      </div>
    </section>
  );
}
