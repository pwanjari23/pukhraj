'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Heart, MessageCircle, Phone } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import businessData from '@/data/business.json';
import { getCleanWhatsAppNumber } from '@/utils/whatsapp';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { count: wishlistCount } = useWishlist();
  const rawPhone = businessData.phoneRaw || businessData.phone.replace(/[^0-9+]/g, '');
  const cleanWaNumber = getCleanWhatsAppNumber();

  const items = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/'
    },
    {
      label: 'Collections',
      href: '/collections',
      icon: Grid,
      isActive: pathname.startsWith('/collections')
    },
    {
      label: 'Wishlist',
      href: '/wishlist',
      icon: Heart,
      isActive: pathname === '/wishlist',
      badge: wishlistCount
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent('Hi Pukhraj Jewellers, I am browsing your collections and have an enquiry.')}`,
      icon: MessageCircle,
      isExternal: true,
      color: 'text-[#25D366]'
    },
    {
      label: 'Call Store',
      href: `tel:${rawPhone}`,
      icon: Phone,
      isExternal: true,
      color: 'text-[#C5A059]'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-nav border-t border-[#C5A059]/20 bg-[#0a0a0c]/95 px-2 py-2">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const content = (
            <div className="flex flex-col items-center justify-center py-1 px-2 relative group select-none">
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    item.color
                      ? item.color
                      : item.isActive
                      ? 'text-[#C5A059]'
                      : 'text-neutral-400 group-hover:text-white'
                  }`}
                />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#C5A059] text-black font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-wider uppercase font-sans mt-1 ${
                  item.isActive ? 'text-[#C5A059] font-medium' : 'text-neutral-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          );

          if (item.isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.label === 'WhatsApp' ? '_blank' : undefined}
                rel={item.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                aria-label={item.label}
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={item.label} href={item.href} aria-label={item.label}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
