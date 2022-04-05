import {configureStore} from '@reduxjs/toolkit';

import {mainCategoryApi, recipeSlice} from '../src/screens';

export const store = configureStore({
  reducer: {
    [mainCategoryApi.reducerPath]: mainCategoryApi.reducer,
    recipes: recipeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainCategoryApi.middleware),
});
