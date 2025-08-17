import { Category } from '@/types';

import pairingCategories from '../../data/pairing-categories.json';

export function getPairingCategories(): Category[] {
  try {
    return pairingCategories;
  } catch (error) {
    console.error('Error loading pairing categories:', error);
    return [];
  }
}

export function getPairingCategoryById(id: string): Category | null {
  try {
    return pairingCategories.find((cat: Category) => cat.id === id) || null;
  } catch (error) {
    console.error('Error loading pairing category by ID:', error);
    return null;
  }
} 