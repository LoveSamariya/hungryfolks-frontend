// Need to use the React-specific entry point to import createApi
import { API_URL } from '@env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  INGREDIENT_MAIN_CATEGORY,
  INGREDIENT_SUB_CATEGORY,
} from '../../services/constants';

// Define a service using a base URL and expected endpoints
export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getIngredientMainCategory: builder.query({
      query: () => INGREDIENT_MAIN_CATEGORY,
    }),
    getIngredientSubCategory: builder.query({
      query: query => `${INGREDIENT_SUB_CATEGORY}?${query}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetIngredientMainCategoryQuery,
  useGetIngredientSubCategoryQuery,
} = ingredientsApi;
