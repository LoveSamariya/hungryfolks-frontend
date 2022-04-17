// Need to use the React-specific entry point to import createApi
import { API_URL } from "@env"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_CATEGORY, SUB_CATEGORY } from '../../services/constants'

// Define a service using a base URL and expected endpoints
export const subCategoryApi = createApi({
  reducerPath: 'subCategoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getSubCategory: builder.query({
      query: (query) => `${SUB_CATEGORY}?${query}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSubCategoryQuery } = subCategoryApi