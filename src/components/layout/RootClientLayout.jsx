'use client';

import { useState, createContext, useContext } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import FloatingActions from './FloatingActions';
import Preloader from './Preloader';
import SearchOverlay from '@/components/features/SearchOverlay';
import AppointmentModal from '@/components/features/AppointmentModal';
import ProductQuickView from '@/components/products/ProductQuickView';
import CompareDrawer from '@/components/products/CompareDrawer';
import { useCompare } from '@/hooks/useCompare';

import MobileExploreMenu from './MobileExploreMenu';

const GlobalUIContext = createContext(null);

export function useGlobalUI() {
  return useContext(GlobalUIContext);
}

export default function RootClientLayout({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [exploreMenuOpen, setExploreMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const {
    compareProducts,
    compareIds,
    isOpen: compareOpen,
    setIsOpen: setCompareOpen,
    addToCompare,
    removeFromCompare,
    clearCompare
  } = useCompare();

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  const openAppointment = () => setAppointmentOpen(true);
  const closeAppointment = () => setAppointmentOpen(false);

  const openExploreMenu = () => setExploreMenuOpen(true);
  const closeExploreMenu = () => setExploreMenuOpen(false);

  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <GlobalUIContext.Provider
      value={{
        openSearch,
        openAppointment,
        openExploreMenu,
        closeExploreMenu,
        openQuickView,
        addToCompare,
        openCompare: () => setCompareOpen(true),
        compareIds
      }}
    >
      <Preloader />

      <Navbar
        onOpenSearch={openSearch}
        onOpenAppointment={openAppointment}
      />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer onOpenAppointment={openAppointment} />

      <MobileBottomNav onOpenExplore={openExploreMenu} />

      <FloatingActions />

      {/* Global Modals & Sheets */}
      <MobileExploreMenu
        isOpen={exploreMenuOpen}
        onClose={closeExploreMenu}
      />

      <SearchOverlay
        isOpen={searchOpen}
        onClose={closeSearch}
      />

      <AppointmentModal
        isOpen={appointmentOpen}
        onClose={closeAppointment}
      />

      <ProductQuickView
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={closeQuickView}
      />

      <CompareDrawer
        isOpen={compareOpen}
        onClose={() => setCompareOpen(false)}
        products={compareProducts}
        onRemove={removeFromCompare}
        onClear={clearCompare}
      />
    </GlobalUIContext.Provider>
  );
}
