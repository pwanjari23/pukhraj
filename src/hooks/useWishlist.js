'use client';

import { useSyncExternalStore, useMemo } from 'react';
import productsData from '@/data/products.json';

const STORAGE_KEY = 'pukhraj_wishlist_ids';

function subscribe(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('wishlist-updated', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('wishlist-updated', callback);
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot() {
  if (typeof window === 'undefined') return '[]';
  try {
    return localStorage.getItem(STORAGE_KEY) || '[]';
  } catch (e) {
    return '[]';
  }
}

function getServerSnapshot() {
  return '[]';
}

export function useWishlist() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const wishlistIds = useMemo(() => {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [raw]);

  const saveToStorage = (newIds) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
      window.dispatchEvent(new Event('wishlist-updated'));
    } catch (e) {
      console.warn('LocalStorage error saving wishlist:', e);
    }
  };

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
  const wishlistProducts = useMemo(() => {
    return wishlistIds
      .map((id) => productsData.find((p) => p.id === id))
      .filter(Boolean);
  }, [wishlistIds]);

  return {
    wishlistIds,
    wishlistProducts,
    count: wishlistIds.length,
    isLoaded: true,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist
  };
}
