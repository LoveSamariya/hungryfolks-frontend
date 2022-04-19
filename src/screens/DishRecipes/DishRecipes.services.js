// Need to use the React-specific entry point to import createApi
import { API_URL } from '@env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DISH_RECIPE, SUB_CATEGORY } from '../../services/constants';

// Define a service using a base URL and expected endpoints
export const dishRecipes = createApi({
  reducerPath: 'dishRecipes',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getDishRecipe: builder.query({
      query: query => {
        return `${DISH_RECIPE}?${query}`;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDishRecipeQuery } = dishRecipes;
