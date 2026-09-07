'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, MapPin, Sparkles, X } from 'lucide-react';
import InstagramIcon from '@/components/common/InstagramIcon';
import businessData from '@/data/business.json';
import { getCleanWhatsAppNumber } from '@/utils/whatsapp';

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const cleanWaNumber = getCleanWhatsAppNumber();
  const rawPhone = businessData.phoneRaw || businessData.phone.replace(/[^0-9+]/g, '');

  const actions = [
    {
      label: 'WhatsApp Concierge',
      icon: MessageCircle,
      href: `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent('Hi Pukhraj Jewellers, I would like to consult with your jewellery concierge.')}`,
      bg: 'bg-[#25D366] text-white',
      border: 'border-[#25D366]'
    },
    {
      label: 'Call Showroom',
      icon: Phone,
      href: `tel:${rawPhone}`,
      bg: 'bg-[#C5A059] text-black',
      border: 'border-[#C5A059]'
    },
    {
      label: 'Google Directions',
      icon: MapPin,
      href: businessData.googleMaps,
      bg: 'bg-[#1a1a20] text-[#FAF8F5]',
      border: 'border-[#C5A059]/40'
    },
    {
      label: 'Official Instagram',
      icon: InstagramIcon,
      href: businessData.instagram,
      bg: 'bg-gradient-to-tr from-[#fd1d1d] to-[#833ab4] text-white',
      border: 'border-pink-500/40'
    }
  ];

  return (
    <div className="fixed bottom-20 md:bottom-8 right-5 z-40 flex flex-col items-end">
      {/* Expanded Speed Dial Action Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="flex flex-col items-end gap-2.5 mb-3 select-none"
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <span className="hidden sm:inline-block px-3 py-1 bg-black/85 text-xs text-neutral-200 rounded-md font-sans border border-white/10 shadow-lg group-hover:border-[#C5A059] transition-colors">
                    {action.label}
                  </span>
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-xl border ${action.bg} ${action.border} transform group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close quick contact actions' : 'Open quick contact actions'}
        className="w-13 h-13 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black flex items-center justify-center shadow-2xl shadow-[#C5A059]/30 border border-[#FAF8F5]/30 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="w-6 h-6 text-black" /> : <Sparkles className="w-6 h-6 text-black" />}
        </motion.div>
      </button>
    </div>
  );
}
