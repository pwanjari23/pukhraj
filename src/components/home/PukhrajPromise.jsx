'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Scale, HeartHandshake, Award, Users, CheckCircle } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';

export default function PukhrajPromise() {
  const pillars = [
    {
      title: 'Certified Purity',
      desc: '100% BIS Hallmarked gold with laser-inscribed HUID numbers and internationally certified diamonds (IGI / SGL).',
      icon: ShieldCheck
    },
    {
      title: 'Transparent Guidance',
      desc: 'Clear itemized billing separating exact gold weight, stone carats, and making charges with zero ambiguity.',
      icon: Scale
    },
    {
      title: 'Quality Craftsmanship',
      desc: 'Masterpieces chiseled by generational karigars upholding Central India and Vidarbha royal traditions.',
      icon: Award
    },
    {
      title: 'Personalized Service',
      desc: 'Dedicated private viewing suites for bridal families with one-on-one senior jewellery styling.',
      icon: HeartHandshake
    },
    {
      title: 'Expert Assistance',
      desc: 'Qualified gemologists and astrologers to assist with natural Ceylon Yellow Sapphires (Pukhraj) and gemstones.',
      icon: Users
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#09090b] text-[#FAF8F5] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Pillars of Integrity"
          title="The Pukhraj Promise"
          subtitle="Our sacred commitments that have made Pukhraj Jewellers a trusted name across Nagpur and Central India."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 bg-[#121215] border border-white/10 hover:border-[#C5A059]/40 rounded-sm flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/25 flex items-center justify-center text-[#C5A059] mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-lg text-[#FAF8F5] mb-2 group-hover:text-[#E2C792] transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1 text-[11px] text-[#C5A059] font-sans">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Guaranteed Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
