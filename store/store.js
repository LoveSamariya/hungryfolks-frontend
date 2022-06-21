import { configureStore } from '@reduxjs/toolkit';

import {
  dishRecipeDetailsApi,
  dishRecipeDetailsSlice,
  dishRecipes,
  mainCategoryApi,
  recipeSlice,
  subCategoryApi,
  ingredientsApi,
} from '../src/screens';

import { authSlice } from '../src/services/auth/auth.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    dishRecipeDetails: dishRecipeDetailsSlice.reducer,
    [mainCategoryApi.reducerPath]: mainCategoryApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [dishRecipes.reducerPath]: dishRecipes.reducer,
    [dishRecipeDetailsApi.reducerPath]: dishRecipeDetailsApi.reducer,
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    recipes: recipeSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      mainCategoryApi.middleware,
      subCategoryApi.middleware,
      dishRecipes.middleware,
      dishRecipeDetailsApi.middleware,
      ingredientsApi.middleware,
    ),
});
