import { API_URL } from '@env';
import { CREATE_ACCOUNT, LOGIN, VERIFY_OTP } from '../constants';
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
  async ({ userInfo, onCreateAccountProceed }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}${LOGIN}`, userInfo);
      return response.data;
    } catch (err) {
      onCreateAccountProceed();

      return rejectWithValue(err.response.data);
    }
  },
);

export const otpVerifyReq = createAsyncThunk(
  `auth/otp-verify`,
  async ({ otpCode, onOtpVerified }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}${VERIFY_OTP}`, otpCode);
      return response.data;
    } catch (err) {
      onOtpVerified();
      return rejectWithValue(err.response.data);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loginError: null,
    otpVerifyError: null,
  },
  reducers: {
    resetLoginError(state) {
      state.loginError = null;
    },
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(createAccountReq.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(createAccountReq.rejected, (state, action) => {
        console.log(action.payload, 'asd');
      });

    builder
      .addCase(loginReq.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(loginReq.rejected, (state, action) => {
        state.loginError = action.payload;
      });

    builder
      .addCase(otpVerifyReq.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(otpVerifyReq.rejected, (state, action) => {
        state.otpVerifyError = action.payload;
      });
  },
});

export const { resetLoginError } = authSlice.actions;

export const selectLoginError = state => state.auth.loginError;
