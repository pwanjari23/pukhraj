'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye, MessageCircle, ArrowRight, GitCompare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '@/hooks/useWishlist';
import { createProductWhatsAppLink } from '@/utils/whatsapp';

export default function ProductCard({
  product,
  onQuickView,
  onAddToCompare,
  isComparing = false
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const whatsappUrl = createProductWhatsAppLink(product);

  // Badge logic from JSON
  let badgeText = null;
  if (product.tags?.includes('bestseller')) badgeText = 'BESTSELLER';
  else if (product.tags?.includes('bridal')) badgeText = 'BRIDAL PICK';
  else if (product.isNew) badgeText = 'NEW ARRIVAL';
  else if (product.isTrending) badgeText = 'TRENDING';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col bg-[#121215] border border-white/5 hover:border-[#C5A059]/40 rounded-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#C5A059]/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Showcase Container */}
      <div className="relative w-full aspect-[4/5] bg-[#18181d] overflow-hidden">
        {/* Main Product Image */}
        <Link href={`/products/${product.slug}`} className="relative block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover object-center transition-transform duration-700 ease-out ${
              isHovered ? 'scale-108' : 'scale-100'
            }`}
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {badgeText && (
            <span className="px-2.5 py-0.5 text-[9px] font-sans font-semibold tracking-wider text-[#FAF8F5] bg-[#0a0a0c]/85 border border-[#C5A059]/40 rounded-sm uppercase">
              {badgeText}
            </span>
          )}
          {product.purity && (
            <span className="px-2 py-0.5 text-[9px] font-sans font-medium text-[#E2C792] bg-[#C5A059]/20 backdrop-blur-md rounded-sm w-fit">
              {product.purity}
            </span>
          )}
        </div>

        {/* Top Right Actions (Wishlist & Compare) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
              inWishlist
                ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/30'
                : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/80'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-black' : ''}`} />
          </button>

          {onAddToCompare && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onAddToCompare(product.id);
              }}
              aria-label="Add to comparison"
              title="Compare with another design"
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                isComparing
                  ? 'bg-[#FAF8F5] text-black'
                  : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/80'
              }`}
            >
              <GitCompare className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Bottom Hover Overlay Action Bar */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent flex items-center justify-between gap-2 transition-all duration-300 z-20 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="flex-1 py-1.5 px-2 bg-white/10 hover:bg-white/20 text-neutral-200 text-[11px] uppercase tracking-wider font-sans rounded-sm backdrop-blur-md flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            className="flex-1 py-1.5 px-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] uppercase tracking-wider font-sans font-medium rounded-sm shadow-md flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </a>
        </div>
      </div>

      {/* Card Information Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-neutral-400 font-sans uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            {product.weight && <span>~{product.weight}</span>}
          </div>

          <Link href={`/products/${product.slug}`} className="block group-hover:text-[#E2C792] transition-colors">
            <h3 className="font-serif text-base sm:text-lg text-[#FAF8F5] line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#C5A059] font-sans uppercase tracking-wider">Hallmarked</span>
            <span className="text-xs font-sans font-medium text-neutral-300">
              {product.price || 'Price on Request'}
            </span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1 text-xs text-[#C5A059] hover:text-[#E2C792] font-sans uppercase tracking-wider transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
