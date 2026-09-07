'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, GitCompare, MessageCircle } from 'lucide-react';
import { createWhatsAppLink } from '@/utils/whatsapp';
import businessData from '@/data/business.json';

export default function CompareDrawer({
  isOpen,
  onClose,
  products = [],
  onRemove,
  onClear
}) {
  if (!isOpen) return null;

  const compareMessage = `Hi ${businessData.name}, I would like to enquire about and compare these jewellery designs from your catalogue:\n\n` +
    products.map((p, idx) => `${idx + 1}. ${p.name} (${p.purity || '22K'}, Weight: ${p.weight || 'N/A'}, Price: ${p.price || 'On Request'})`).join('\n') +
    `\n\nPlease assist with price comparisons and design differences.`;

  const whatsappUrl = createWhatsAppLink(compareMessage);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="relative w-full max-w-4xl glass-modal rounded-t-lg sm:rounded-sm z-10 p-6 max-h-[90vh] overflow-y-auto border border-[#C5A059]/30"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059]">
                <GitCompare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[#FAF8F5]">Compare Jewellery Designs</h3>
                <p className="text-xs text-neutral-400 font-sans">
                  Comparing {products.length} of 3 maximum pieces
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {products.length > 0 && (
                <button
                  type="button"
                  onClick={onClear}
                  className="text-xs text-neutral-400 hover:text-red-400 font-sans underline"
                >
                  Clear All
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close comparison"
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 text-sm">
              No products selected for comparison. Click the compare icon on any jewellery card to evaluate pieces side by side.
            </div>
          ) : (
            <div className="space-y-6">
              {/* Product Grid Comparison Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <div key={item.id} className="p-4 bg-white/5 border border-white/10 rounded-sm relative flex flex-col justify-between">
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      aria-label="Remove item"
                      className="absolute top-2 right-2 p-1 rounded-full bg-black/60 hover:bg-black text-neutral-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="space-y-3">
                      <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-black/40">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                      </div>

                      <Link href={`/products/${item.slug}`} className="block">
                        <h4 className="font-serif text-base text-[#FAF8F5] hover:text-[#C5A059] line-clamp-1">
                          {item.name}
                        </h4>
                      </Link>

                      <div className="space-y-2 text-xs font-sans pt-2 border-t border-white/10">
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-neutral-400">Category:</span>
                          <span className="text-neutral-200">{item.category}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-neutral-400">Purity:</span>
                          <span className="text-[#E2C792] font-medium">{item.purity || '22K'}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-neutral-400">Gross Weight:</span>
                          <span className="text-neutral-200">{item.weight || 'On Request'}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-neutral-400">Aesthetic:</span>
                          <span className="text-neutral-200 capitalize">{(item.style || []).join(', ') || 'Traditional'}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-neutral-400">Price Estimate:</span>
                          <span className="text-neutral-200 font-medium">{item.price || 'Price on Request'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom WhatsApp Action */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-neutral-400 font-sans">
                  Ready to enquire about these side-by-side choices?
                </span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-sans uppercase tracking-wider font-semibold rounded-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire About These Designs</span>
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
