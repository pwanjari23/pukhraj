'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Phone, Calendar, Share2, ShieldCheck, Check, Copy, ArrowLeft } from 'lucide-react';
import ProductGallery from '@/components/products/ProductGallery';
import RelatedProducts from '@/components/products/RelatedProducts';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import CallButton from '@/components/common/CallButton';
import { useWishlist } from '@/hooks/useWishlist';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useGlobalUI } from '@/components/layout/RootClientLayout';
import { createProductWhatsAppLink } from '@/utils/whatsapp';
import businessData from '@/data/business.json';

export default function ProductDetailView({ product }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addViewedProduct, viewedProducts } = useRecentlyViewed();
  const { openAppointment, openQuickView } = useGlobalUI();

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (product?.id) {
      addViewedProduct(product.id);
    }
  }, [product?.id]);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const whatsappUrl = createProductWhatsAppLink(product);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out the ${product.name} from Pukhraj Jewellers: ${window.location.href}`)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const specs = product.specifications || {};

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 font-sans mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
        <span>/</span>
        <span className="text-[#C5A059] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-20 items-start">
        {/* Left Column: Image Gallery with Zoom */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images && product.images.length > 0 ? product.images : [product.image]}
            productName={product.name}
          />
        </div>

        {/* Right Column: Specifications & CTAs */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-sans font-medium mb-2">
              <span>{product.category}</span>
              <span>•</span>
              <span>{product.subcategory}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] leading-tight">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xl font-serif text-[#E2C792]">
                {product.price || 'Price on Request'}
              </span>
              <span className="text-xs text-neutral-400 font-sans">
                Product Code: <strong className="text-neutral-200">{product.id}</strong>
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
            {product.description}
          </p>

          {/* Specifications Table */}
          <div className="p-4 bg-[#141418] border border-white/10 rounded-sm space-y-2.5 text-xs font-sans">
            <h4 className="text-xs uppercase tracking-wider text-[#C5A059] font-medium mb-3">
              Craftsmanship Specifications
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">Purity Standard:</span>
                <span className="text-[#E2C792] font-medium">{product.purity || '22K (916)'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-400">Gross Weight:</span>
                <span className="text-neutral-200">{product.weight || 'On Request'}</span>
              </div>
              {specs.stone && (
                <div className="col-span-2 flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">Gemstone Details:</span>
                  <span className="text-neutral-200 text-right">{specs.stone}</span>
                </div>
              )}
              {specs.diamondCarat && (
                <div className="col-span-2 flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">Diamond Grade:</span>
                  <span className="text-neutral-200">{specs.diamondCarat} ({specs.diamondClarity || 'VVS'})</span>
                </div>
              )}
              <div className="col-span-2 flex justify-between py-1">
                <span className="text-neutral-400">Hallmark Certification:</span>
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  BIS Hallmarked & Certified
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-sans bg-white/5 text-neutral-300 border border-white/10 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* CTAs Matrix */}
          <div className="space-y-3 pt-2">
            {/* Primary WhatsApp Enquiry */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-sans font-semibold rounded-sm flex items-center justify-center gap-2.5 shadow-xl shadow-[#25D366]/20 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Price & Availability Enquiry</span>
            </a>

            {/* Secondary Action Row: Wishlist & Call */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`py-3 px-4 rounded-sm border text-xs uppercase tracking-wider font-sans font-medium flex items-center justify-center gap-2 transition-all ${
                  inWishlist
                    ? 'bg-[#C5A059] text-black border-[#C5A059]'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-200 border-white/15'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-black' : ''}`} />
                <span>{inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <CallButton size="md" variant="outline" className="w-full justify-center text-xs">
                Call Store
              </CallButton>
            </div>

            {/* Book Store Visit */}
            <button
              type="button"
              onClick={openAppointment}
              className="w-full py-3 bg-[#C5A059]/15 hover:bg-[#C5A059]/25 border border-[#C5A059]/40 text-[#E2C792] text-xs uppercase tracking-widest font-sans font-medium rounded-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Book In-Store Viewing at Nagpur</span>
            </button>
          </div>

          {/* Share Product Drawer / Options */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-sans">
            <span className="flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-[#C5A059]" />
              <span>Share this creation:</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-neutral-300 rounded text-[11px] flex items-center gap-1"
              >
                <MessageCircle className="w-3 h-3 text-[#25D366]" />
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-neutral-300 rounded text-[11px] flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-neutral-400" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Recommendation Engine */}
      <RelatedProducts currentProduct={product} onQuickView={openQuickView} />

      {/* Recently Viewed Products */}
      {viewedProducts.length > 1 && (
        <div className="pt-16 mt-16 border-t border-white/10">
          <h3 className="font-serif text-2xl text-[#FAF8F5] mb-6">
            Recently Viewed Pieces
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {viewedProducts
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="p-3 bg-[#121215] border border-white/10 hover:border-[#C5A059]/40 rounded-sm group transition-all"
                >
                  <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-black/40 mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-serif text-xs text-[#FAF8F5] group-hover:text-[#C5A059] line-clamp-1">
                    {item.name}
                  </h4>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">
                    {item.purity} • {item.price}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
