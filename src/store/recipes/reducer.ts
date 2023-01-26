import { createSlice } from '@reduxjs/toolkit';
import { Category, Meal } from '../../utils/types';
import {
  fetchMealsByCategory,
  fetchCategories,
  fetchSearchMeals,
} from './actions';

export interface RecipeState {
  recipes: Meal[];
  favoriteRecipes: Meal[];
  userRecipes: Meal[];
  categories: Category[];
  loading: boolean;
}

const initialState: RecipeState = {
  recipes: [],
  favoriteRecipes: [],
  userRecipes: [],
  categories: [],
  loading: false,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    toggleFavoriteItem(state, action) {
      const recipe = state.favoriteRecipes.find(
        ({ idMeal }) => idMeal === action.payload.idMeal,
      );
      if (recipe) {
        state.favoriteRecipes = state.favoriteRecipes.filter(
          ({ idMeal }) => idMeal !== action.payload.idMeal,
        );
      } else {
        state.favoriteRecipes = [...state.favoriteRecipes, action.payload];
      }
    },
    addRecipe(state, action) {
      const ingredientsEntries = action.payload.ingredients.map(
        (ingredient: string, index: number) => [
          `strIngredient${index + 1}`,
          ingredient,
        ],
      );
      const ingredientsObj = Object.fromEntries(ingredientsEntries);
      const newRecipe: Meal = {
        idMeal: action.payload.name,
        strMeal: action.payload.name,
        strCategory: action.payload.category,
        strInstructions: action.payload.instructions,
        strMealThumb: action.payload.img,
        ...ingredientsObj,
      };
      state.userRecipes = [...state.userRecipes, newRecipe];
    },
    filterCategory(state, action) {
      state.recipes = state.recipes.filter(
        ({ strCategory }) => strCategory !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMealsByCategory.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.length) {
        const category: string = action.meta.arg;
        const userRecipesByCategory = state.userRecipes.filter(
          ({ strCategory }) => strCategory === category,
        );
        state.recipes = [
          ...state.recipes.filter(
            ({ strCategory }) => strCategory !== category,
          ),
          ...action.payload,
          ...userRecipesByCategory,
        ];
      }
    });
    builder.addCase(fetchMealsByCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchMealsByCategory.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchSearchMeals.fulfilled, (state, action) => {
      state.loading = false;
      const search: string = action.meta.arg;
      const userRecipesByCategory: Meal[] = state.userRecipes.filter(
        ({ strMeal }) => strMeal.includes(search),
      );
      if (action.payload) {
        state.recipes = [...action.payload, ...userRecipesByCategory];
      } else {
        state.recipes = userRecipesByCategory;
      }
    });
    builder.addCase(fetchSearchMeals.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSearchMeals.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

const { actions, reducer } = recipesSlice;
export const { toggleFavoriteItem, addRecipe, filterCategory } = actions;

export default reducer;
