'use client';

import { useState, useEffect } from 'react';
import productsData from '@/data/products.json';

const STORAGE_KEY = 'pukhraj_recently_viewed_ids';

export function useRecentlyViewed() {
  const [viewedIds, setViewedIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setViewedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('LocalStorage error reading recently viewed:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const addViewedProduct = (productId) => {
    if (!productId) return;
    try {
      const filtered = viewedIds.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, 8); // Keep last 8 items
      setViewedIds(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error saving recently viewed:', e);
    }
  };

  const clearRecentlyViewed = () => {
    setViewedIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  const viewedProducts = viewedIds
    .map((id) => productsData.find((p) => p.id === id))
    .filter(Boolean);

  return {
    viewedIds,
    viewedProducts,
    isLoaded,
    addViewedProduct,
    clearRecentlyViewed
  };
}
