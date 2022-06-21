import { API_URL } from '@env';
import { REGISTRATION, LOGIN, VERIFY_OTP, RESEND_OTP } from '../constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loginReq = createAsyncThunk(
  `auth/login`,
  async ({ userInfo, onLoginSuccess }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}${LOGIN}`, userInfo);
      onLoginSuccess();
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
      const response = await axios.post(`${API_URL}${REGISTRATION}`, userInfo);
      onCreateAccountProceed();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const otpVerifyReq = createAsyncThunk(
  `auth/otp-verify`,
  async (
    { verificationCode, onOtpVerified },
    { rejectWithValue, getState },
  ) => {
    const {
      auth: {
        userInfo: { email, verificationToken },
      },
    } = getState();

    try {
      const response = await axios.post(`${API_URL}${VERIFY_OTP}`, {
        verificationCode,
        email,
        verificationToken,
      });
      onOtpVerified();

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const resendOtpReq = createAsyncThunk(
  `auth/otp-resend`,
  async ({ onResendOtpSuccess }, { rejectWithValue, getState }) => {
    const {
      auth: {
        userInfo: { email, verificationToken },
      },
    } = getState();

    try {
      const response = await axios.post(`${API_URL}${RESEND_OTP}`, {
        email,
        verificationToken,
      });
      onResendOtpSuccess();
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
    otpVerifyError: null,
    isLoginLoading: false,
    isCreateAccountLoading: false,
    isOtpLoading: false,
    userInfo: {},
    user: {},
  },
  reducers: {
    resetLoginError(state) {
      state.loginError = null;
    },
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder
      .addCase(createAccountReq.pending, (state, action) => {
        state.isCreateAccountLoading = true;
      })
      .addCase(createAccountReq.fulfilled, (state, action) => {
        state.userInfo = { ...action.payload };
        console.log(action.payload, state.userInfo);
      })
      .addCase(createAccountReq.rejected, (state, action) => {
        console.log(action.payload, 'asd');
        state.isCreateAccountLoading = false;
      });

    builder
      .addCase(loginReq.pending, (state, action) => {
        state.isLoginLoading = true;
      })
      .addCase(loginReq.fulfilled, (state, action) => {
        state.userInfo = { ...action.payload };
        console.log(action.payload);
      })
      .addCase(loginReq.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginError = action.payload;
      });

    builder
      .addCase(otpVerifyReq.pending, (state, action) => {
        state.isOtpLoading = true;
      })
      .addCase(otpVerifyReq.fulfilled, (state, action) => {
        state.user = { ...action.payload };
        console.log(action.payload);
      })
      .addCase(otpVerifyReq.rejected, (state, action) => {
        state.isOtpLoading = false;
        console.log(action.payload);

        state.otpVerifyError = action.payload;
      });
  },
});

export const { resetLoginError } = authSlice.actions;

export const selectLoginError = state => state.auth.loginError;
export const selectLoginLoadingState = state => state.auth.isLoginLoading;
export const selectCreateAccountLoadingState = state =>
  state.auth.isCreateAccountLoading;
export const selectOtpLoadingState = state => state.auth.isOtpLoading;
export const selectUserInfo = state => state.auth.userInfo;
export const selectUser = state => state.auth.user;
