'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Menu, X, Phone, MessageCircle, Calendar } from 'lucide-react';
import businessData from '@/data/business.json';
import { useWishlist } from '@/hooks/useWishlist';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import InstagramButton from '@/components/common/InstagramButton';

export default function Navbar({ onOpenSearch, onOpenAppointment }) {
  const pathname = usePathname();
  const { count: wishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Bridal', href: '/bridal' },
    { name: 'About', href: '/about' },
    { name: 'Journal', href: '/journal' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 select-none ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#0a0a0c]/80 via-[#0a0a0c]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Trigger & Search */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-2 text-neutral-300 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
            >
              <Menu className="w-5 h-5 text-[#E2C792]" />
            </button>
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search Jewellery Catalogue"
              className="p-2 text-neutral-300 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Brand Logo */}
          <Link href="/" className="flex flex-col items-center group text-center">
            <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.22em] text-[#FAF8F5] uppercase group-hover:text-[#E2C792] transition-colors font-light">
              PUKHRAJ
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C5A059] uppercase font-sans font-medium -mt-0.5">
              JEWELLERS • NAGPUR
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs uppercase tracking-[0.18em] font-sans transition-colors py-1 ${
                    isActive ? 'text-[#C5A059] font-medium' : 'text-neutral-300 hover:text-[#E2C792]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A059]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Search Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search Catalogue"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#C5A059]/50 text-neutral-300 hover:text-white text-xs transition-all duration-300"
            >
              <Search className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-neutral-400 font-sans tracking-wide">Search</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[9px] bg-black/40 text-neutral-400 rounded">⌘K</kbd>
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              aria-label={`View saved wishlist (${wishlistCount} items)`}
              className="relative p-2 text-neutral-300 hover:text-[#E2C792] transition-colors"
            >
              <Heart className="w-5 h-5 text-neutral-200 hover:text-[#E2C792]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C5A059] text-black font-sans text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Book Visit Consultation Button */}
            <button
              type="button"
              onClick={onOpenAppointment}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm border border-[#C5A059]/40 hover:border-[#C5A059] bg-[#C5A059]/10 hover:bg-[#C5A059]/20 text-[#FAF8F5] text-xs uppercase tracking-wider font-sans transition-all duration-300"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden md:inline">Book Visit</span>
            </button>

            {/* WhatsApp Quick Enquire Button */}
            <WhatsAppButton
              size="sm"
              variant="gold"
              className="hidden md:inline-flex"
            >
              Enquire
            </WhatsAppButton>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0c]/98 backdrop-blur-2xl flex flex-col justify-between p-6 lg:hidden"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-[0.2em] text-[#FAF8F5]">PUKHRAJ</span>
                <span className="text-[9px] tracking-[0.3em] text-[#C5A059]">JEWELLERS • NAGPUR</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 text-neutral-400 hover:text-white rounded-full bg-white/5"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links List */}
            <nav className="flex flex-col gap-5 py-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-2xl tracking-wider text-neutral-200 hover:text-[#C5A059] flex items-center justify-between py-1 transition-colors"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs font-sans text-[#C5A059]/60">0{idx + 1}</span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                <Link
                  href="/presentation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-lg tracking-wider text-[#C5A059] hover:underline flex items-center gap-2 pt-2"
                >
                  <span>Owner Pitch & Presentation</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#C5A059]/20 font-sans">Proposal</span>
                </Link>
              </motion.div>
            </nav>

            {/* Mobile Actions Bottom Section */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAppointment) onOpenAppointment();
                  }}
                  className="w-full py-3 bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#E2C792] text-xs uppercase tracking-wider font-sans rounded-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Visit</span>
                </button>

                <WhatsAppButton
                  variant="gold"
                  size="md"
                  className="w-full justify-center text-xs"
                >
                  WhatsApp
                </WhatsAppButton>
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-400 font-sans pt-2">
                <span>Nagpur, Maharashtra</span>
                <a
                  href={`tel:${businessData.phoneRaw || '+917120000000'}`}
                  className="text-[#C5A059] hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{businessData.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
