import {configureStore} from '@reduxjs/toolkit';

import {dishRecipeDetailsApi, dishRecipes, mainCategoryApi, recipeSlice, subCategoryApi} from '../src/screens';

export const store = configureStore({
  reducer: {
    [mainCategoryApi.reducerPath]: mainCategoryApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [dishRecipes.reducerPath]: dishRecipes.reducer,
    [dishRecipeDetailsApi.reducerPath]: dishRecipeDetailsApi.reducer,
    recipes: recipeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainCategoryApi.middleware, subCategoryApi.middleware, dishRecipes.middleware, dishRecipeDetailsApi.middleware),
});
