'use client';

import { motion } from 'framer-motion';

export default function SectionHeading({
  tag,
  title,
  subtitle,
  align = 'center', // 'center' | 'left'
  theme = 'dark',   // 'dark' | 'light'
  className = ''
}) {
  const isCenter = align === 'center';
  const isLight = theme === 'light';

  return (
    <div className={`mb-6 sm:mb-8 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'} ${className}`}>
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 mb-2 sm:mb-3 px-3 py-1 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-sans font-medium rounded-full ${
            isLight
              ? 'bg-[#C5A059]/15 text-[#997A3B] border border-[#C5A059]/30'
              : 'bg-[#C5A059]/10 text-[#E2C792] border border-[#C5A059]/25'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          {tag}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`font-serif text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.15] ${
          isLight ? 'text-neutral-900' : 'text-[#FAF8F5]'
        }`}
      >
        {title}
      </motion.h2>

      {/* Gold Hairline Accent with Diamond Pip */}
      <div className={`flex items-center gap-2.5 sm:gap-3 my-3 sm:my-4 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <span className="w-8 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]" />
        <span className="w-1.5 h-1.5 rotate-45 bg-[#C5A059]" />
        <span className="w-8 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]" />
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-xs sm:text-base font-sans font-light leading-relaxed ${
            isLight ? 'text-neutral-700' : 'text-neutral-400'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
