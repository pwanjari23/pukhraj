'use client';

import { MessageCircle } from 'lucide-react';
import { createWhatsAppLink } from '@/utils/whatsapp';

export default function WhatsAppButton({
  href,
  message,
  product,
  children,
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg'
  variant = 'primary', // 'primary' | 'outline' | 'gold' | 'text'
  iconOnly = false,
  showIcon = true
}) {
  let targetUrl = href;
  if (!targetUrl) {
    if (product) {
      const { createProductWhatsAppLink } = require('@/utils/whatsapp');
      targetUrl = createProductWhatsAppLink(product);
    } else {
      targetUrl = createWhatsAppLink(message || 'Hi Pukhraj Jewellers, I would like to enquire about your jewellery collections.');
    }
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-medium tracking-wide'
  };

  const variantClasses = {
    primary: 'bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg shadow-[#25D366]/20 transition-all duration-300 transform hover:-translate-y-0.5',
    gold: 'bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black font-medium hover:brightness-110 shadow-lg shadow-[#C5A059]/20 transition-all duration-300 transform hover:-translate-y-0.5',
    outline: 'border border-[#C5A059]/50 text-[#C5A059] hover:bg-[#C5A059]/10 hover:border-[#C5A059] transition-all duration-300',
    text: 'text-[#25D366] hover:text-[#20ba59] hover:underline p-0 inline-flex items-center gap-1.5'
  };

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className={`inline-flex items-center justify-center rounded-sm font-sans uppercase tracking-wider select-none ${variant !== 'text' ? sizeClasses[size] : ''} ${variantClasses[variant]} ${className}`}
    >
      {showIcon && <MessageCircle className={size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
      {!iconOnly && <span>{children || 'WhatsApp Enquire'}</span>}
    </a>
  );
}
