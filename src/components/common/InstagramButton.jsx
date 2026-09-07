'use client';

import InstagramIcon from '@/components/common/InstagramIcon';
import businessData from '@/data/business.json';

export default function InstagramButton({
  className = '',
  size = 'md',
  variant = 'outline',
  children,
  showIcon = true,
  iconOnly = false
}) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-medium'
  };

  const variantClasses = {
    outline: 'border border-[#C5A059]/40 text-[#FAF8F5] hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition-all duration-300',
    gradient: 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white hover:brightness-110 transition-all duration-300',
    subtle: 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-all duration-300'
  };

  return (
    <a
      href={businessData.instagram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow Pukhraj Jewellers on Instagram"
      className={`inline-flex items-center justify-center rounded-sm font-sans uppercase tracking-wider select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {showIcon && <InstagramIcon className={size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4 text-[#C5A059]'} />}
      {!iconOnly && <span>{children || `Follow ${businessData.instagramHandle || 'Instagram'}`}</span>}
    </a>
  );
}
