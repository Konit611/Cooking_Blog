import { Category } from '@/types';
import recipeCategories from '../../data/recipe-categories.json';

export function getRecipeCategoryName(categoryId: string, locale: string, categories: Category[]): string {
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return categoryId;
  
  const name = category.name[locale as keyof typeof category.name];
  return name || category.name.en || categoryId;
}

export function getAllRecipeCategories(): string[] {
  try {
    return recipeCategories.map((cat: Category) => cat.id);
  } catch (error) {
    console.error('Error loading recipe categories:', error);
    return [];
  }
} 