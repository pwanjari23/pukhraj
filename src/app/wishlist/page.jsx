'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { createWishlistWhatsAppLink, createProductWhatsAppLink } from '@/utils/whatsapp';
import EmptyState from '@/components/common/EmptyState';

export default function WishlistPage() {
  const { wishlistProducts, removeFromWishlist, clearWishlist, isLoaded } = useWishlist();

  if (!isLoaded) {
    return (
      <div className="pt-32 pb-24 text-center text-neutral-400 font-serif">
        Loading your saved wishlist...
      </div>
    );
  }

  const hasItems = wishlistProducts && wishlistProducts.length > 0;
  const whatsappWishlistUrl = createWishlistWhatsAppLink(wishlistProducts);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-semibold">
          Your Curated Vault
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF8F5] mt-2 mb-3">
          Saved Jewellery Wishlist
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light leading-relaxed">
          Review your favourite designs or share them directly with our showroom team for pricing, availability, and customizations.
        </p>
      </div>

      {!hasItems ? (
        <EmptyState
          title="Your Jewellery Wishlist is Waiting"
          description="You haven't saved any jewellery pieces yet. Explore our royal gold, solitaire, and bridal collections to curate your dream designs."
          ctaText="Explore Collections"
          ctaLink="/collections"
          icon={Heart}
        />
      ) : (
        <div className="space-y-8">
          {/* Wishlist Action Ribbon */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#141418] border border-white/10 rounded-sm gap-4">
            <div className="text-xs font-sans text-neutral-300">
              You have <strong className="text-[#C5A059]">{wishlistProducts.length}</strong> saved creations in your vault.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={clearWishlist}
                className="text-xs text-neutral-400 hover:text-red-400 font-sans underline"
              >
                Clear All
              </button>

              <a
                href={whatsappWishlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Wishlist on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Wishlist Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#121215] border border-white/10 hover:border-[#C5A059]/40 rounded-sm overflow-hidden flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="relative aspect-[4/5] bg-black/40">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label="Remove item"
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 hover:bg-black text-neutral-400 hover:text-red-400 backdrop-blur-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 text-[9px] bg-black/80 text-[#C5A059] rounded">
                        {product.purity}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-sans block mb-1">
                      {product.category}
                    </span>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-serif text-base text-[#FAF8F5] group-hover:text-[#C5A059] line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="mt-2 text-xs font-sans text-neutral-300">
                      {product.price || 'Price on Request'}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 space-y-2">
                  <a
                    href={createProductWhatsAppLink(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-sans uppercase tracking-wider font-semibold rounded-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Enquire This Piece</span>
                  </a>

                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full py-2 bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-sans uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
