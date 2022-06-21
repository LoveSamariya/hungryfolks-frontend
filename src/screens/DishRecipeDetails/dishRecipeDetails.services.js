// Need to use the React-specific entry point to import createApi
import { API_URL } from '@env';
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  DISH_RECIPE_FROM_CODE,
  DISH_RECIPE_FROM_ID,
  MAIN_CATEGORY,
  UPDATE_RATINGS,
} from '../../services/constants';

export const updateRatingsReq = createAsyncThunk(
  `dishRecipeDetails/updateRatings`,
  async (
    { recipeId, ratingsValue, onUpdateRatingsSuccess },
    { rejectWithValue },
  ) => {
    console.log(5456, `${API_URL}${UPDATE_RATINGS(recipeId)}`);
    try {
      const response = await axios.post(
        `${API_URL}${UPDATE_RATINGS(recipeId)}`,
        ratingsValue,
      );
      console.log(response.data);
      onUpdateRatingsSuccess();
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  },
);

export const dishRecipeDetailsSlice = createSlice({
  name: 'dishRecipeDetails',
  initialState: {},
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(updateRatingsReq.pending, (state, action) => {
        // state.isLoginLoading = true;
      })
      .addCase(updateRatingsReq.fulfilled, (state, action) => {
        // state.userInfo = { ...action.payload };
        console.log(action.payload);
      })
      .addCase(updateRatingsReq.rejected, (state, action) => {
        // state.isLoginLoading = false;
        // state.loginError = action.payload;
        console.log(action.payload, 'act', action.error);
      });
  },
});

// Define a service using a base URL and expected endpoints
export const dishRecipeDetailsApi = createApi({
  reducerPath: 'dishRecipeDetailsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getDishRecipeFromCode: builder.query({
      query: code => {
        return DISH_RECIPE_FROM_CODE(code);
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDishRecipeFromCodeQuery } = dishRecipeDetailsApi;
