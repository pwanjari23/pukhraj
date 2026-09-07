'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function EmptyState({
  title = 'No Pieces Found',
  description = 'Your jewellery wishlist is waiting for something special.',
  ctaText = 'Explore Collections',
  ctaLink = '/collections',
  icon: Icon = Sparkles,
  action
}) {
  return (
    <div className="text-center py-16 px-4 max-w-md mx-auto">
      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
        <Icon className="w-8 h-8" />
      </div>

      <h3 className="font-serif text-2xl text-[#FAF8F5] mb-2">{title}</h3>

      <p className="text-sm text-neutral-400 font-sans font-light mb-8 leading-relaxed">
        {description}
      </p>

      {action ? (
        action
      ) : (
        <Link
          href={ctaLink}
          className="inline-flex items-center justify-center px-6 py-3 bg-[#C5A059] hover:bg-[#b08d47] text-black font-sans font-medium text-xs tracking-widest uppercase rounded-sm transition-all duration-300 shadow-md shadow-[#C5A059]/15"
        >
          {ctaText}
        </Link>
      )}
    </div>
  );
}
