'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import articlesData from '@/data/articles.json';
import SectionHeading from '@/components/common/SectionHeading';

export default function JournalPreview() {
  const articles = articlesData.slice(0, 3);

  return (
    <section className="py-10 sm:py-14 md:py-28 bg-[#0a0a0c] text-[#FAF8F5] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-12">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold block mb-1.5">
              The Connoisseur&apos;s Chronicle
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#FAF8F5]">
              Jewellery Journal & Guides
            </h2>
          </div>

          <Link
            href="/journal"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C5A059] hover:text-[#E2C792] font-sans font-medium transition-colors"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile: 2 Compact Articles */}
        <div className="grid grid-cols-1 gap-3.5 sm:hidden">
          {articles.slice(0, 2).map((art) => (
            <article
              key={`mobile-art-${art.id}`}
              className="bg-[#141418] border border-white/10 rounded-sm overflow-hidden flex flex-row items-center gap-3 p-2.5"
            >
              <div className="relative w-24 h-24 shrink-0 rounded-sm overflow-hidden bg-black/40">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-2 text-[10px] text-[#C5A059] font-sans mb-1">
                  <span>{art.category}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
                <Link href={`/journal/${art.slug}`}>
                  <h3 className="font-serif text-sm text-[#FAF8F5] line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                </Link>
                <Link
                  href={`/journal/${art.slug}`}
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#C5A059] font-sans mt-2"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop: 3 Articles Grid (100% Unchanged) */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-6">
          {articles.map((art, idx) => (
            <motion.article
              key={art.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#141418] border border-white/10 hover:border-[#C5A059]/40 rounded-sm overflow-hidden flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-sans font-semibold bg-black/80 text-[#C5A059] border border-[#C5A059]/30 rounded">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-[11px] text-neutral-400 font-sans mb-2">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C5A059]" />
                      {art.readTime}
                    </span>
                  </div>

                  <Link href={`/journal/${art.slug}`}>
                    <h3 className="font-serif text-lg text-[#FAF8F5] group-hover:text-[#E2C792] transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-neutral-400 font-sans font-light mt-2 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/journal/${art.slug}`}
                  className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[#C5A059] hover:text-[#E2C792] font-sans transition-colors"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
