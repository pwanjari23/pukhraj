'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Heart, MessageCircle, MapPin } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { getCleanWhatsAppNumber } from '@/utils/whatsapp';

export default function MobileBottomNav({ onOpenExplore }) {
  const pathname = usePathname();
  const { count: wishlistCount } = useWishlist();
  const cleanWaNumber = getCleanWhatsAppNumber();

  const handleVisitClick = (e) => {
    if (pathname === '/') {
      const el = document.getElementById('store-location');
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const items = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/'
    },
    {
      label: 'Explore',
      icon: Compass,
      onClick: onOpenExplore,
      color: 'text-[#C5A059]'
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
      href: `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent('Hi Pukhraj Jewellers, I would like to enquire about jewellery designs.')}`,
      icon: MessageCircle,
      isExternal: true,
      color: 'text-[#25D366]'
    },
    {
      label: 'Visit',
      href: '/#store-location',
      onClick: handleVisitClick,
      icon: MapPin,
      color: 'text-[#FAF8F5]'
    }
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-nav border-t border-[#C5A059]/20 bg-[#0a0a0c]/95 px-1 py-1.5 pb-[calc(0.4rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const content = (
            <div className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1 relative group select-none">
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
                  <span className="absolute -top-1.5 -right-2 bg-[#C5A059] text-black font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-wider uppercase font-sans mt-1 ${
                  item.isActive ? 'text-[#C5A059] font-semibold' : 'text-neutral-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          );

          if (item.onClick) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                aria-label={item.label}
                className="bg-transparent border-0 p-0 focus:outline-none focus:ring-1 focus:ring-[#C5A059]/40 rounded min-touch-target flex items-center justify-center"
              >
                {content}
              </button>
            );
          }

          if (item.isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="min-touch-target flex items-center justify-center no-underline"
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              className="min-touch-target flex items-center justify-center no-underline"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
