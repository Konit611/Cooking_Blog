import { Category } from '@/types';

import recipeCategories from '../../data/recipe-categories.json';

export function getRecipeCategories(): Category[] {
  try {
    return recipeCategories;
  } catch (error) {
    console.error('Error loading recipe categories:', error);
    return [];
  }
}

export function getRecipeCategoryById(id: string): Category | null {
  try {
    return recipeCategories.find((cat: Category) => cat.id === id) || null;
  } catch (error) {
    console.error('Error loading recipe category by ID:', error);
    return null;
  }
} 