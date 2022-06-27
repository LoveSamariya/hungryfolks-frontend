// Need to use the React-specific entry point to import createApi
import { API_URL } from '@env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { KEYWORD, MAIN_CATEGORY } from '../../services/constants';

// Define a service using a base URL and expected endpoints
export const mainCategoryApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getMainCategory: builder.query({
      query: query => {
        console.log(query, 'query');
        return `${MAIN_CATEGORY}?${query}`;
      },
    }),
    getKeyword: builder.query({
      query: query => {
        console.log(query, 'query');
        return `${KEYWORD}?${query}`;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMainCategoryQuery, useGetKeywordQuery } = mainCategoryApi;
