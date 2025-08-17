import { Category } from '@/types';
import pairingCategories from '../../data/pairing-categories.json';

export function getPairingCategoryName(categoryId: string, locale: string, categories: Category[]): string {
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return categoryId;
  
  const name = category.name[locale as keyof typeof category.name];
  return name || category.name.en || categoryId;
}

export function getAllPairingCategories(): string[] {
  try {
    return pairingCategories.map((cat: Category) => cat.id);
  } catch (error) {
    console.error('Error loading pairing categories:', error);
    return [];
  }
} 