'use client';

import { motion } from 'framer-motion';
import { Palette, MessageSquare, Compass, Hammer, Sparkles, ArrowRight } from 'lucide-react';
import { createCustomJewelleryWhatsAppLink } from '@/utils/whatsapp';
import SectionHeading from '@/components/common/SectionHeading';

export default function CustomJewellery() {
  const steps = [
    {
      num: '01',
      title: 'Share Your Idea',
      desc: 'Send us sketches, heirloom photos, or inspiration moodboards via WhatsApp or in person.',
      icon: Palette
    },
    {
      num: '02',
      title: 'Consult Our Experts',
      desc: 'Collaborate directly with our master gemologists on stone selection, gold karatage, and ergonomics.',
      icon: MessageSquare
    },
    {
      num: '03',
      title: 'Finalize 3D Design',
      desc: 'Preview precision CAD renders and 3D wax molds to approve every facet before casting.',
      icon: Compass
    },
    {
      num: '04',
      title: 'Artisan Handcrafting',
      desc: 'Our generational karigars sculpt, handset, polish, and hallmarked-certify your unique jewel.',
      icon: Hammer
    }
  ];

  const whatsappUrl = createCustomJewelleryWhatsAppLink({
    jewelleryType: 'Custom Bespoke Creation',
    metalPreference: '22K Gold / Diamond',
    estimatedBudget: 'On Consultation',
    notes: 'I would like to discuss creating a personalized custom jewellery design.'
  });

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Bespoke Karigari"
          title="Bring Your Vision To Life"
          subtitle="From reimagining cherished ancestral heirlooms to casting one-of-a-kind engagement rings."
          theme="light"
        />

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 bg-white rounded-sm border border-[#C5A059]/20 shadow-sm relative group hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-3xl font-light text-[#C5A059]">
                    {s.num}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#997A3B]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-serif text-xl font-normal text-neutral-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-neutral-600 font-sans font-light leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bespoke CTA Banner */}
        <div className="bg-neutral-900 text-white rounded-sm p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold">
              Personalized Karigar Studio
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-[#FAF8F5]">
              Ready to Craft Your Heirloom?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-xl mx-auto leading-relaxed">
              Speak directly with our senior jewellery design team at Pukhraj Jewellers, Nagpur to begin your sketch.
            </p>
            <div className="pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black font-sans text-xs uppercase tracking-[0.2em] font-semibold rounded-sm shadow-xl shadow-[#C5A059]/20 hover:brightness-110 transition-all"
              >
                <span>Discuss Your Design</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
