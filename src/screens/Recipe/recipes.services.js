// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API, MAIN_CATEGORY } from '../../services/constants'

// Define a service using a base URL and expected endpoints
export const mainCategoryApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
  endpoints: (builder) => ({
    getMainCategory: builder.query({
      query: () => {
        return MAIN_CATEGORY
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMainCategoryQuery } = mainCategoryApi