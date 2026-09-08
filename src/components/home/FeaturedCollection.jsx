'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import productsData from '@/data/products.json';
import { createProductWhatsAppLink } from '@/utils/whatsapp';
import SectionHeading from '@/components/common/SectionHeading';

export default function FeaturedCollection() {
  const featured = productsData.filter((p) => p.isFeatured === true).slice(0, 5);

  return (
    <section className="py-10 sm:py-14 md:py-28 bg-[#121215] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Curator's Showcase"
          title="Masterpieces of Pukhraj"
          subtitle="A rare glimpse into our most celebrated gold and diamond high-jewellery creations."
        />

        {/* Horizontal Editorial Gallery */}
        <div className="flex gap-3 sm:gap-6 overflow-x-auto no-scrollbar pb-3 sm:pb-6 pt-1 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
          {featured.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="w-[72vw] max-w-[290px] sm:w-[360px] md:w-[400px] shrink-0 snap-start bg-[#16161c] border border-white/10 hover:border-[#C5A059]/50 rounded-sm overflow-hidden flex flex-col group transition-all duration-500 shadow-xl"
            >
              <div className="relative aspect-[4/5] bg-black/40 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="400px"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-sans font-semibold text-black bg-[#C5A059] rounded-sm">
                    Signature Creation
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-sans block mb-1">
                    {product.category} • {product.purity}
                  </span>
                  <h3 className="font-serif text-xl text-[#FAF8F5] group-hover:text-[#E2C792] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans font-light mt-1.5 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-sans">Gross Weight</span>
                    <span className="text-xs text-neutral-200 font-medium font-sans">
                      {product.weight || 'On Request'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/products/${product.slug}`}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-neutral-200 text-xs uppercase tracking-wider font-sans rounded-sm transition-colors"
                    >
                      Details
                    </Link>
                    <a
                      href={createProductWhatsAppLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-sm"
                      aria-label="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
