'use client';

import { useGlobalUI } from '@/components/layout/RootClientLayout';
import Hero from '@/components/home/Hero';
import QuickActionBar from '@/components/home/QuickActionBar';
import GoldRate from '@/components/home/GoldRate';
import NewArrivals from '@/components/home/NewArrivals';
import TrendingSection from '@/components/home/TrendingSection';
import MobileQuickExplore from '@/components/home/MobileQuickExplore';
import MobileJewelleryFinder from '@/components/home/MobileJewelleryFinder';
import JewelleryFinder from '@/components/features/JewelleryFinder';
import ShopByOccasion from '@/components/home/ShopByOccasion';
import BridalSection from '@/components/home/BridalSection';
import BridalLookBuilder from '@/components/features/BridalLookBuilder';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import CustomJewellery from '@/components/home/CustomJewellery';
import PukhrajPromise from '@/components/home/PukhrajPromise';
import StoreExperience from '@/components/home/StoreExperience';
import StoreMap from '@/components/map/StoreMap';
import Testimonials from '@/components/home/Testimonials';
import InstagramSection from '@/components/home/InstagramSection';
import JournalPreview from '@/components/home/JournalPreview';
import AppointmentSection from '@/components/home/AppointmentSection';
import FinalCTA from '@/components/home/FinalCTA';
import campaignsData from '@/data/campaigns.json';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  const { openAppointment, openQuickView, addToCompare, compareIds } = useGlobalUI();

  // Check active campaign
  const activeCampaign = campaignsData.find((c) => c.isActive);

  return (
    <div className="flex flex-col w-full">
      {/* 3. Fullscreen Cinematic Video Hero (Mobile compact ~75vh / Desktop fullscreen) */}
      <Hero onOpenAppointment={openAppointment} />

      {/* Seasonal / Festival Campaign Ribbon if activated in campaigns.json */}
      {activeCampaign && (
        <div className="bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7934] text-black py-2.5 px-4 text-center text-xs font-sans font-medium flex items-center justify-center gap-2 select-none shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span>
            <strong>{activeCampaign.badge}:</strong> {activeCampaign.title}
          </span>
          <Link
            href={activeCampaign.ctaLink}
            className="underline ml-2 uppercase text-[10px] tracking-wider font-bold hover:text-white transition-colors"
          >
            {activeCampaign.ctaText} →
          </Link>
        </div>
      )}

      {/* Mobile Quick Explore: 2-column compact category grid immediately after hero */}
      <MobileQuickExplore />

      {/* 4. Quick Contact Actions - Desktop only */}
      <div className="hidden md:block">
        <QuickActionBar onOpenAppointment={openAppointment} />
      </div>

      {/* 5. Gold Rate - Desktop only */}
      <div className="hidden md:block">
        <GoldRate />
      </div>

      {/* 6. New Arrivals */}
      <NewArrivals
        onQuickView={openQuickView}
        onAddToCompare={addToCompare}
        compareIds={compareIds}
      />

      {/* 8. Trending Jewellery */}
      <TrendingSection
        onQuickView={openQuickView}
        onAddToCompare={addToCompare}
        compareIds={compareIds}
      />

      {/* 9. Mobile Concierge Jewellery Finder (Mobile only) */}
      <MobileJewelleryFinder
        onQuickView={openQuickView}
        onAddToCompare={addToCompare}
        compareIds={compareIds}
      />

      {/* 10. Desktop Discovery: Jewellery Finder & Shop by Occasion */}
      <div className="hidden md:block">
        <JewelleryFinder onQuickView={openQuickView} />
        <ShopByOccasion />
      </div>

      {/* 11. Bridal Cinematic Experience */}
      <BridalSection onOpenAppointment={openAppointment} />

      {/* 12. Bridal Look Builder */}
      <BridalLookBuilder onOpenAppointment={openAppointment} />

      {/* 13. Featured Jewellery */}
      <FeaturedCollection />

      {/* 14. Custom Jewellery */}
      <CustomJewellery />

      {/* 15. Trust / Pukhraj Promise */}
      <PukhrajPromise />

      {/* 16. Store Experience */}
      <StoreExperience onOpenAppointment={openAppointment} />

      {/* 17. Google Maps / Visit Us */}
      <StoreMap />

      {/* 18. Testimonials */}
      <Testimonials />

      {/* 19. Instagram Gallery */}
      <InstagramSection />

      {/* 20. Jewellery Journal */}
      <JournalPreview />

      {/* 21. Appointment Booking */}
      <AppointmentSection onOpenAppointment={openAppointment} />

      {/* 22. Final Cinematic CTA */}
      <FinalCTA onOpenAppointment={openAppointment} />
    </div>
  );
}
