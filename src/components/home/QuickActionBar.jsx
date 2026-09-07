'use client';

import { MessageCircle, Phone, MapPin, Calendar } from 'lucide-react';
import InstagramIcon from '@/components/common/InstagramIcon';
import businessData from '@/data/business.json';
import { getCleanWhatsAppNumber } from '@/utils/whatsapp';

export default function QuickActionBar({ onOpenAppointment }) {
  const cleanWa = getCleanWhatsAppNumber();
  const rawPhone = businessData.phoneRaw || businessData.phone.replace(/[^0-9+]/g, '');

  const actions = [
    {
      label: 'WhatsApp Concierge',
      sub: 'Instant design & rate enquiry',
      icon: MessageCircle,
      href: `https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi Pukhraj Jewellers, I would like to enquire about jewellery designs.')}`,
      isExternal: true,
      color: 'text-[#25D366]'
    },
    {
      label: 'Call Showroom',
      sub: businessData.phone,
      icon: Phone,
      href: `tel:${rawPhone}`,
      isExternal: true,
      color: 'text-[#C5A059]'
    },
    {
      label: 'Get Directions',
      sub: 'Itwari / Dharampeth, Nagpur',
      icon: MapPin,
      href: businessData.googleMaps,
      isExternal: true,
      color: 'text-[#C5A059]'
    },
    {
      label: 'Instagram Feed',
      sub: businessData.instagramHandle || '@pukhrajjewellers_nagpur',
      icon: InstagramIcon,
      href: businessData.instagram,
      isExternal: true,
      color: 'text-pink-400'
    },
    {
      label: 'Book Store Visit',
      sub: 'Private viewing suite',
      icon: Calendar,
      onClick: onOpenAppointment,
      color: 'text-[#E2C792]'
    }
  ];

  return (
    <div className="bg-[#121215] border-y border-[#C5A059]/20 relative z-20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        {/* Horizontal scroll on mobile, flex on desktop */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-1">
          {actions.map((act, index) => {
            const Icon = act.icon;
            const content = (
              <div className="flex items-center gap-3 shrink-0 group cursor-pointer select-none">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:border-[#C5A059] flex items-center justify-center transition-all duration-300 transform group-hover:scale-105">
                  <Icon className={`w-4 h-4 ${act.color}`} />
                </div>
                <div className="text-left">
                  <span className="text-xs uppercase tracking-wider font-sans font-medium text-[#FAF8F5] group-hover:text-[#C5A059] transition-colors block">
                    {act.label}
                  </span>
                  <span className="text-[10px] font-sans text-neutral-400 block truncate max-w-[140px] sm:max-w-[180px]">
                    {act.sub}
                  </span>
                </div>
              </div>
            );

            if (act.onClick) {
              return (
                <button
                  key={act.label}
                  type="button"
                  onClick={act.onClick}
                  className="bg-transparent border-0 p-0 text-left focus:outline-none"
                >
                  {content}
                </button>
              );
            }

            return (
              <a
                key={act.label}
                href={act.href}
                target={act.isExternal && act.label !== 'Call Showroom' ? '_blank' : undefined}
                rel={act.isExternal && act.label !== 'Call Showroom' ? 'noopener noreferrer' : undefined}
                className="no-underline"
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
