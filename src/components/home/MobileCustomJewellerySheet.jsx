'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MessageCircle, Hammer, CheckCircle2 } from 'lucide-react';
import { createCustomJewelleryWhatsAppLink } from '@/utils/whatsapp';

export default function MobileCustomJewellerySheet({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [jewelleryType, setJewelleryType] = useState('Bridal Suite');
  const [occasion, setOccasion] = useState('Wedding');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const url = createCustomJewelleryWhatsAppLink({
      jewelleryType: `${jewelleryType} (Occasion: ${occasion})`,
      metalPreference: '22K Gold / Certified Diamond',
      estimatedBudget: 'On Consultation',
      notes: `Customer: ${name.trim()}, Phone: ${phone.trim()}. Vision: ${notes.trim() || 'Custom Karigari Consultation'}`
    });

    setSubmitted(true);
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      onClose();
      setSubmitted(false);
    }, 600);
  };

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
          {/* Header */}
          <div className="pt-2.5 pb-3 px-4 border-b border-white/10 shrink-0">
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-2.5" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hammer className="w-4 h-4 text-[#C5A059]" />
                <h3 className="font-serif text-lg text-[#FAF8F5]">
                  Start Custom Request
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close custom request sheet"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 flex items-center justify-center min-touch-target"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5 flex-1 no-scrollbar">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-sans mb-1 font-medium">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Radhika Sharma"
                className="w-full px-3 py-2.5 bg-[#18181f] border border-white/10 focus:border-[#C5A059] rounded-sm text-xs text-white placeholder-neutral-500 focus:outline-none min-touch-target"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-sans mb-1 font-medium">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98230 00000"
                className="w-full px-3 py-2.5 bg-[#18181f] border border-white/10 focus:border-[#C5A059] rounded-sm text-xs text-white placeholder-neutral-500 focus:outline-none min-touch-target"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-sans mb-1 font-medium">
                  Jewellery Type
                </label>
                <select
                  value={jewelleryType}
                  onChange={(e) => setJewelleryType(e.target.value)}
                  className="w-full px-2.5 py-2.5 bg-[#18181f] border border-white/10 focus:border-[#C5A059] rounded-sm text-xs text-white focus:outline-none min-touch-target"
                >
                  <option value="Bridal Suite">Bridal Suite</option>
                  <option value="Royal Necklace">Royal Necklace</option>
                  <option value="Solitaire Ring">Solitaire Ring</option>
                  <option value="Bangles / Kadas">Bangles / Kadas</option>
                  <option value="Heritage Earrings">Heritage Earrings</option>
                  <option value="Other Bespoke Jewel">Other Bespoke Jewel</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-sans mb-1 font-medium">
                  Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-2.5 py-2.5 bg-[#18181f] border border-white/10 focus:border-[#C5A059] rounded-sm text-xs text-white focus:outline-none min-touch-target"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Festive / Auspicious">Festive</option>
                  <option value="Daily Luxury">Daily Luxury</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-300 font-sans mb-1 font-medium">
                Design Vision or Requirements
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe your design, metal preference, or heirloom re-imagining..."
                className="w-full px-3 py-2 bg-[#18181f] border border-white/10 focus:border-[#C5A059] rounded-sm text-xs text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center justify-center gap-2 shadow-lg transition-all min-touch-target"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Opening WhatsApp...</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Enquiry via WhatsApp</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
