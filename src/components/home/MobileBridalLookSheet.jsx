'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Sparkles, MessageCircle, Calendar, CheckCircle2, Check } from 'lucide-react';

export default function MobileBridalLookSheet({
  isOpen,
  onClose,
  currentSuite,
  activeSlot,
  setActiveSlot,
  handleSaveLook,
  savedSuccess,
  whatsappUrl,
  onOpenAppointment
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const activeSlotObj = currentSuite.find((s) => s.slotId === activeSlot) || currentSuite[0];
  const selectedCount = currentSuite.filter((s) => Boolean(s.item)).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Slide-Up Bottom Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative z-10 w-full max-h-[90vh] bg-[#121215] border-t border-[#C5A059]/35 rounded-t-2xl shadow-2xl flex flex-col overflow-hidden pb-safe"
        >
          {/* Handle & Header */}
          <div className="pt-2.5 pb-3 px-4 border-b border-white/10 shrink-0">
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-2.5" />
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-sans font-semibold">
                  Interactive Trousseau Builder
                </span>
                <h3 className="font-serif text-lg text-[#FAF8F5]">
                  Your Bridal Suite ({selectedCount} of {currentSuite.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close bridal look builder"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 flex items-center justify-center min-touch-target"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Slot Tabs Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-4 py-2.5 border-b border-white/10 bg-[#16161c] shrink-0">
            {currentSuite.map((slot) => {
              const isSelected = activeSlot === slot.slotId;
              const hasItem = Boolean(slot.item);
              return (
                <button
                  key={slot.slotId}
                  type="button"
                  onClick={() => setActiveSlot(slot.slotId)}
                  className={`py-1.5 px-3 rounded-full text-xs font-sans whitespace-nowrap transition-all flex items-center gap-1 min-touch-target ${
                    isSelected
                      ? 'bg-[#C5A059] text-black font-semibold shadow-sm'
                      : hasItem
                      ? 'bg-white/10 text-[#FAF8F5] border border-[#C5A059]/30'
                      : 'bg-white/5 text-neutral-400'
                  }`}
                >
                  {hasItem && <Check className="w-3 h-3" />}
                  <span>{slot.title.split('/')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Piece Pool Options Grid */}
          <div className="p-4 overflow-y-auto space-y-3 flex-1 no-scrollbar">
            <div className="flex items-center justify-between text-xs text-neutral-300 mb-1">
              <span>Choose {activeSlotObj.title}:</span>
              {savedSuccess && (
                <span className="text-emerald-400 flex items-center gap-1 font-sans text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Saved to Vault
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {activeSlotObj.pool.map((piece) => {
                const isCurrent = activeSlotObj.item?.id === piece.id;
                return (
                  <button
                    key={piece.id}
                    type="button"
                    onClick={() => activeSlotObj.setter(piece)}
                    className={`p-2 rounded-sm border text-left flex flex-col justify-between transition-all group min-touch-target ${
                      isCurrent
                        ? 'bg-[#1e1e26] border-[#C5A059] shadow-md'
                        : 'bg-[#15151a] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="relative aspect-square w-full rounded-sm overflow-hidden mb-2 bg-black/40">
                      <Image
                        src={piece.image}
                        alt={piece.name}
                        fill
                        sizes="140px"
                        className="object-cover"
                      />
                      {isCurrent && (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#C5A059] text-black flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-sans block">
                        {piece.purity || '22K'}
                      </span>
                      <h4 className="font-serif text-xs text-[#FAF8F5] line-clamp-1 leading-snug">
                        {piece.name}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky Actions Footer */}
          <div className="p-3.5 bg-[#0a0a0c] border-t border-white/10 shrink-0 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleSaveLook}
                className="py-2.5 px-3 bg-white/10 hover:bg-white/15 border border-white/15 text-[#FAF8F5] font-sans text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 transition-colors min-touch-target"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{savedSuccess ? 'Saved!' : 'Save Look'}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center justify-center gap-1.5 transition-colors shadow-lg min-touch-target"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Look</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAppointment();
              }}
              className="w-full py-2.5 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black font-sans text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-1.5 min-touch-target"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Bridal Consultation</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
