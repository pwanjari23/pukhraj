'use client';

import { useState, useEffect } from 'react';
import productsData from '@/data/products.json';

const STORAGE_KEY = 'pukhraj_compare_ids';

export function useCompare() {
  const [compareIds, setCompareIds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCompareIds(JSON.parse(stored));
    } catch (e) {}
  }, []);

  const saveToStorage = (ids) => {
    setCompareIds(ids);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      window.dispatchEvent(new Event('compare-updated'));
    } catch (e) {}
  };

  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setCompareIds(JSON.parse(stored));
        else setCompareIds([]);
      } catch (e) {}
    };

    window.addEventListener('compare-updated', handleSync);
    return () => window.removeEventListener('compare-updated', handleSync);
  }, []);

  const addToCompare = (productId) => {
    if (!productId) return false;
    if (compareIds.includes(productId)) {
      setIsOpen(true);
      return true;
    }
    if (compareIds.length >= 3) {
      alert('You can compare a maximum of 3 jewellery pieces at a time.');
      return false;
    }
    const updated = [...compareIds, productId];
    saveToStorage(updated);
    setIsOpen(true);
    return true;
  };

  const removeFromCompare = (productId) => {
    const updated = compareIds.filter((id) => id !== productId);
    saveToStorage(updated);
  };

  const clearCompare = () => {
    saveToStorage([]);
  };

  const compareProducts = compareIds
    .map((id) => productsData.find((p) => p.id === id))
    .filter(Boolean);

  return {
    compareIds,
    compareProducts,
    count: compareIds.length,
    isOpen,
    setIsOpen,
    addToCompare,
    removeFromCompare,
    clearCompare
  };
}
