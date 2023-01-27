import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMealsByCategoryAPI,
  getCategoriesAPI,
  searchMealAPI,
} from '../../api/themealdb';

export const fetchCategories = createAsyncThunk(
  'recipes/fetchCategories',
  async () => {
    const payload = await getCategoriesAPI();
    const { meals } = payload;
    return meals;
  },
);

export const fetchMealsByCategory = createAsyncThunk(
  'recipes/fetchMealsByCategory',
  async (category: string) => {
    const payload = await getMealsByCategoryAPI(category);
    return await Promise.all(payload);
  },
);

export const fetchSearchMeals = createAsyncThunk(
  'recipes/fetchSearchMeals',
  async (char: string) => {
    const payload = await searchMealAPI(char);
    const { meals } = payload;
    return meals;
  },
);
