// Need to use the React-specific entry point to import createApi
import { API_URL } from '@env';
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  DISH_RECIPE_FROM_CODE,
  DISH_RECIPE_FROM_ID,
  GET_USER_RATINGS,
  MAIN_CATEGORY,
  UPDATE_RATINGS,
} from '../../services/constants';

export const updateRatingsReq = createAsyncThunk(
  `dishRecipeDetails/updateRatings`,
  async (
    { recipeId, ratingsValue, onUpdateRatingsSuccess },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}${UPDATE_RATINGS(recipeId)}`,
        ratingsValue,
        { headers: { 'Content-Type': 'application/json' } },
      );
      onUpdateRatingsSuccess();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getUserRatingsReq = createAsyncThunk(
  `dishRecipeDetails/getUserRatings`,
  async ({ recipeId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}${GET_USER_RATINGS(recipeId)}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const dishRecipeDetailsSlice = createSlice({
  name: 'dishRecipeDetails',
  initialState: { userRating: null },
  reducers: {
    resetUserRating: state => {
      state.userRating = null;
    },
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(updateRatingsReq.pending, (state, action) => {
        // state.isLoginLoading = true;
      })
      .addCase(updateRatingsReq.fulfilled, (state, action) => {
        // state.userInfo = { ...action.payload };
      })
      .addCase(updateRatingsReq.rejected, (state, action) => {
        // state.isLoginLoading = false;
        // state.loginError = action.payload;
      });

    builder
      .addCase(getUserRatingsReq.pending, (state, action) => {
        // state.isLoginLoading = true;
      })
      .addCase(getUserRatingsReq.fulfilled, (state, action) => {
        state.userRating = action?.payload?.rate;
      })
      .addCase(getUserRatingsReq.rejected, (state, action) => {
        // state.isLoginLoading = false;
        // state.loginError = action.payload;
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

// Slice actions
export const { resetUserRating } = dishRecipeDetailsSlice.actions;

//State selector functions
export const userRatingSelector = state => state.dishRecipeDetails.userRating;
