'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import collectionsData from '@/data/collections.json';
import SectionHeading from '@/components/common/SectionHeading';

export default function CollectionsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Artisanal Galleries"
          title="Curated Collections"
          subtitle="From sacred 22K temple chokers to certified solitaire rings, explore masterworks created for eternity."
          theme="light"
        />

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectionsData.slice(0, 6).map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className={`group relative overflow-hidden rounded-sm bg-neutral-900 cursor-pointer shadow-lg ${
                idx === 0 || idx === 3 ? 'md:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'
              }`}
            >
              <Link href={`/collections?category=${col.slug}`} className="block w-full h-full relative">
                {/* Background Editorial Image */}
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Gradient Scrim & Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/50 transition-colors duration-500" />

                {/* Content Box */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-left z-10">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                    <span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-[#C5A059] bg-black/60 backdrop-blur-md rounded-sm mb-2">
                      {col.tag}
                    </span>

                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FAF8F5] tracking-wide">
                      {col.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light mt-1 max-w-lg line-clamp-2 leading-relaxed">
                      {col.description}
                    </p>
                  </div>

                  {/* Animated Gold Hairline & Action */}
                  <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                    <span className="text-xs font-sans text-neutral-400">
                      {col.itemCount}+ Unique Creations
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-[#C5A059] font-sans uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      <span>Explore Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Categories Link */}
        <div className="mt-12 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 hover:bg-black text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.2em] font-medium rounded-sm transition-all duration-300 shadow-md"
          >
            <span>View All 11 Catalogue Collections</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
