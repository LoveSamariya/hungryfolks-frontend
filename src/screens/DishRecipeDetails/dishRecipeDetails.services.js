// Need to use the React-specific entry point to import createApi
import { API_URL } from "@env"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DISH_RECIPE_FROM_CODE, DISH_RECIPE_FROM_ID, MAIN_CATEGORY } from '../../services/constants'

// Define a service using a base URL and expected endpoints
export const dishRecipeDetailsApi = createApi({
  reducerPath: 'dishRecipeDetailsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getDishRecipeFromCode: builder.query({
      query: (code) => {
          return DISH_RECIPE_FROM_CODE(code)
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDishRecipeFromCodeQuery } = dishRecipeDetailsApi