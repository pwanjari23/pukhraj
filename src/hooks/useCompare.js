'use client';

import { useState, useSyncExternalStore, useMemo } from 'react';
import productsData from '@/data/products.json';

const STORAGE_KEY = 'pukhraj_compare_ids';

function subscribe(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('compare-updated', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('compare-updated', callback);
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

export function useCompare() {
  const [isOpen, setIsOpen] = useState(false);
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const compareIds = useMemo(() => {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [raw]);

  const saveToStorage = (ids) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      window.dispatchEvent(new Event('compare-updated'));
    } catch (e) {}
  };

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

  const compareProducts = useMemo(() => {
    return compareIds
      .map((id) => productsData.find((p) => p.id === id))
      .filter(Boolean);
  }, [compareIds]);

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
