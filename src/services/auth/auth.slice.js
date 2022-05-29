import { API_URL } from '@env';
import { CREATE_ACCOUNT, LOGIN } from '../constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loginReq = createAsyncThunk(
  `auth/login`,
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}${LOGIN}`, userInfo);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const createAccountReq = createAsyncThunk(
  `auth/create-account`,
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}${LOGIN}`, userInfo);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loginError: null,
  },
  reducers: {
    resetLoginError(state) {
      state.loginError = null;
    },
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(createAccountReq.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action.payload);
    });
    builder.addCase(createAccountReq.rejected, (state, action) => {
      // Add user to the state array
      console.log(action.payload, 'asd');
    });

    builder.addCase(loginReq.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action.payload);
    });
    builder.addCase(loginReq.rejected, (state, action) => {
      // Add user to the state array
      state.loginError = action.payload;
      console.log(action.payload, 'asd');
    });
  },
});

export const { resetLoginError } = authSlice.actions;

export const selectLoginError = state => state.auth.loginError;
