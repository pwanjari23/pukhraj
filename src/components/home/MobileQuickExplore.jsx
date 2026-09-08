'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Crown, Gem, CircleDot, ShieldCheck, Heart } from 'lucide-react';

export default function MobileQuickExplore() {
  const quickItems = [
    {
      title: 'Gold Jewellery',
      subtitle: '22K BIS Hallmarked',
      href: '/collections?category=gold-jewellery',
      badge: '22K',
      accent: 'from-[#DFBA73]/15 to-transparent'
    },
    {
      title: 'Certified Diamonds',
      subtitle: 'IGI / SGL Certified',
      href: '/collections?category=diamond-jewellery',
      badge: 'Diamonds',
      accent: 'from-blue-500/10 to-transparent'
    },
    {
      title: 'Bridal Suites',
      subtitle: 'Imperial Trousseaus',
      href: '/bridal',
      badge: 'Bridal',
      accent: 'from-amber-600/15 to-transparent'
    },
    {
      title: 'Solitaire Rings',
      subtitle: 'Engagement & Bands',
      href: '/collections?category=diamond-jewellery&subcategory=Rings',
      badge: 'Rings',
      accent: 'from-[#C5A059]/15 to-transparent'
    },
    {
      title: 'Royal Necklaces',
      subtitle: 'Chokers & Haars',
      href: '/collections?category=gold-jewellery&subcategory=Necklaces',
      badge: 'Necklaces',
      accent: 'from-[#C5A059]/15 to-transparent'
    },
    {
      title: 'Heritage Earrings',
      subtitle: 'Jhumkas & Chandbalis',
      href: '/collections?category=gold-jewellery&subcategory=Earrings',
      badge: 'Earrings',
      accent: 'from-[#DFBA73]/15 to-transparent'
    }
  ];

  return (
    <section className="block md:hidden py-5 px-4 bg-[#0a0a0c] border-b border-white/5 relative z-10">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#C5A059]" />
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-sans font-semibold">
            Quick Explore
          </h2>
        </div>
        <Link
          href="/collections"
          className="text-[10px] uppercase tracking-wider text-neutral-400 hover:text-white font-sans flex items-center gap-0.5"
        >
          <span>All Categories</span>
          <ArrowRight className="w-3 h-3 text-[#C5A059]" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {quickItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`relative p-3 rounded-sm bg-[#121215] border border-white/10 hover:border-[#C5A059]/40 bg-gradient-to-br ${item.accent} flex flex-col justify-between min-touch-target group transition-all duration-300 shadow-sm`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] uppercase font-sans font-bold tracking-wider text-[#C5A059] bg-[#C5A059]/10 px-1.5 py-0.5 rounded border border-[#C5A059]/20">
                {item.badge}
              </span>
              <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
            </div>

            <div>
              <h3 className="font-serif text-sm text-[#FAF8F5] leading-snug group-hover:text-[#E2C792] transition-colors">
                {item.title}
              </h3>
              <p className="text-[10px] text-neutral-400 font-sans mt-0.5">
                {item.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
