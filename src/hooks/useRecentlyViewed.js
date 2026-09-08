'use client';

import { useSyncExternalStore, useMemo } from 'react';
import productsData from '@/data/products.json';

const STORAGE_KEY = 'pukhraj_recently_viewed_ids';

function subscribe(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('recently-viewed-updated', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('recently-viewed-updated', callback);
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

export function useRecentlyViewed() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const viewedIds = useMemo(() => {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [raw]);

  const addViewedProduct = (productId) => {
    if (!productId) return;
    try {
      const filtered = viewedIds.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, 8); // Keep last 8 items
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('recently-viewed-updated'));
    } catch (e) {
      console.warn('LocalStorage error saving recently viewed:', e);
    }
  };

  const clearRecentlyViewed = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('recently-viewed-updated'));
    } catch (e) {}
  };

  const viewedProducts = useMemo(() => {
    return viewedIds
      .map((id) => productsData.find((p) => p.id === id))
      .filter(Boolean);
  }, [viewedIds]);

  return {
    viewedIds,
    viewedProducts,
    isLoaded: true,
    addViewedProduct,
    clearRecentlyViewed
  };
}
