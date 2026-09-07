'use client';

import { useState, useEffect } from 'react';
import productsData from '@/data/products.json';

const STORAGE_KEY = 'pukhraj_wishlist_ids';

export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setWishlistIds(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('LocalStorage error reading wishlist:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveToStorage = (newIds) => {
    setWishlistIds(newIds);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
      window.dispatchEvent(new Event('wishlist-updated'));
    } catch (e) {
      console.warn('LocalStorage error saving wishlist:', e);
    }
  };

  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setWishlistIds(JSON.parse(stored));
        else setWishlistIds([]);
      } catch (e) {}
    };

    window.addEventListener('wishlist-updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('wishlist-updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const toggleWishlist = (productId) => {
    if (!productId) return;
    const exists = wishlistIds.includes(productId);
    const updated = exists
      ? wishlistIds.filter((id) => id !== productId)
      : [...wishlistIds, productId];
    saveToStorage(updated);
  };

  const isInWishlist = (productId) => {
    return wishlistIds.includes(productId);
  };

  const removeFromWishlist = (productId) => {
    const updated = wishlistIds.filter((id) => id !== productId);
    saveToStorage(updated);
  };

  const clearWishlist = () => {
    saveToStorage([]);
  };

  // Full product objects
  const wishlistProducts = wishlistIds
    .map((id) => productsData.find((p) => p.id === id))
    .filter(Boolean);

  return {
    wishlistIds,
    wishlistProducts,
    count: wishlistIds.length,
    isLoaded,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist
  };
}
