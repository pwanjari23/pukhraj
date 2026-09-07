'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import occasionsData from '@/data/occasions.json';
import SectionHeading from '@/components/common/SectionHeading';

export default function ShopByOccasion() {
  return (
    <section className="py-20 md:py-28 bg-[#09090b] text-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Life's Milestones"
          title="Shop By Occasion"
          subtitle="Whether commemorating a sacred royal wedding, celebrating Dhanteras, or seeking effortless daily gold."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {occasionsData.map((occ, idx) => (
            <motion.div
              key={occ.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative h-[360px] sm:h-[400px] rounded-sm overflow-hidden border border-white/10 hover:border-[#C5A059]/50 shadow-xl"
            >
              <Link href={`/collections?occasion=${occ.slug}`} className="block w-full h-full relative">
                <Image
                  src={occ.image}
                  alt={occ.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/50 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end text-left z-10">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold mb-1">
                    {occ.tagline}
                  </span>

                  <h3 className="font-serif text-2xl text-[#FAF8F5] group-hover:text-[#E2C792] transition-colors">
                    {occ.name}
                  </h3>

                  <p className="text-xs text-neutral-300 font-sans font-light mt-2 line-clamp-2 leading-relaxed">
                    {occ.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-sans">
                    <span className="text-neutral-400">{occ.count}</span>
                    <span className="text-[#C5A059] group-hover:translate-x-1 transition-transform flex items-center gap-1 uppercase tracking-wider">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
