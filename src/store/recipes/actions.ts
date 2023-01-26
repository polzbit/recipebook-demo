import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMealsByCategory,
  getCategories,
  searchMeal,
} from '../../api/themealdb';

export const fetchCategories = createAsyncThunk(
  'recipes/fetchCategories',
  async () => {
    const payload = await getCategories();
    const { meals } = payload;
    return meals;
  },
);

export const fetchMealsByCategory = createAsyncThunk(
  'recipes/fetchMealsByCategory',
  async (category: string) => {
    const payload = await getMealsByCategory(category);
    return await Promise.all(payload);
  },
);

export const fetchSearchMeals = createAsyncThunk(
  'recipes/fetchSearchMeals',
  async (char: string) => {
    const payload = await searchMeal(char);
    const { meals } = payload;
    return meals;
  },
);
