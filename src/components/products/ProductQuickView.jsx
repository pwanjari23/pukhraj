'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Heart, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { createProductWhatsAppLink } from '@/utils/whatsapp';

export default function ProductQuickView({ product, isOpen, onClose }) {
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const whatsappUrl = createProductWhatsAppLink(product);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl glass-modal rounded-sm overflow-hidden z-10 shadow-2xl border border-[#C5A059]/30"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-neutral-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image */}
              <div className="relative aspect-[4/5] md:aspect-auto md:h-full bg-[#18181d] min-h-[320px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-[10px] font-sans font-semibold tracking-wider text-[#FAF8F5] bg-[#0a0a0c]/80 border border-[#C5A059]/40 rounded-sm uppercase">
                    {product.purity || '22K Hallmarked'}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-sans mb-2">
                    <span>{product.category}</span>
                    <span>•</span>
                    <span>{product.subcategory}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] leading-tight mb-3">
                    {product.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Key Specifications Grid */}
                  <div className="grid grid-cols-2 gap-3 p-3 bg-white/5 border border-white/10 rounded-sm text-xs font-sans">
                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Gross Weight</span>
                      <span className="text-neutral-200 font-medium">{product.weight || 'On Request'}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Purity Standard</span>
                      <span className="text-[#E2C792] font-medium">{product.purity} BIS 916</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Indicative Price</span>
                      <span className="text-neutral-200 font-medium">{product.price || 'Price on Request'}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">Certification</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-medium">
                        <ShieldCheck className="w-3 h-3" />
                        100% Certified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className={`py-3 px-3 rounded-sm border text-xs uppercase tracking-wider font-sans flex items-center justify-center gap-2 transition-all ${
                        inWishlist
                          ? 'bg-[#C5A059] text-black border-[#C5A059] font-medium'
                          : 'bg-white/5 hover:bg-white/10 text-neutral-200 border-white/10'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${inWishlist ? 'fill-black' : ''}`} />
                      <span>{inWishlist ? 'Saved' : 'Wishlist'}</span>
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-3 rounded-sm bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-sans font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#25D366]/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="w-full py-3 bg-[#C5A059]/15 hover:bg-[#C5A059]/25 border border-[#C5A059]/40 text-[#E2C792] text-xs uppercase tracking-widest font-sans rounded-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>View Complete Details & Specifications</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
