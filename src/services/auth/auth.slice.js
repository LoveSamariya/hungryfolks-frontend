import * as Keychain from 'react-native-keychain';
import axios from 'axios';

import { API_URL } from '@env';
import {
  REGISTRATION,
  LOGIN,
  VERIFY_OTP,
  RESEND_OTP,
  USER_PROFILE,
  EXTERNAL_LOGIN,
} from '../constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function setAxiosAuthorizationToken(auth_token) {
  console.log(auth_token);
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth_token;
}

async function setEmailTokenClientSide(data) {
  const {
    profile: { email },
    accessToken,
  } = { ...data };
  try {
    const savedClientSide = await Keychain.setGenericPassword(
      email,
      accessToken,
    );
    setAxiosAuthorizationToken(accessToken);
    console.log(email, accessToken, 'email, accessToken', savedClientSide);
  } catch (e) {
    // saving error
  }
}

async function resetEmailTokenClientSide() {
  try {
    await Keychain.resetGenericPassword();
    return true;
  } catch (e) {
    return false;
  }
}

async function setUsernameIDClientSide(data) {
  const {
    profile: { id, name },
  } = { ...data };
  try {
    const jsonValue = JSON.stringify({ id, name });
    console.log(await AsyncStorage.setItem(USER_PROFILE, jsonValue), 'rrr');
    const value = await AsyncStorage.getItem(USER_PROFILE);
    console.log('from async storage', value);
  } catch (e) {
    console.log(e, 'sdfjk');
    // saving error
  }
}

async function resetUsernameIDClientSide() {
  try {
    await AsyncStorage.removeItem(USER_PROFILE);
    return true;
  } catch (e) {
    // remove error
    return false;
  }
}

export const loginReq = createAsyncThunk(
  `auth/login`,
  async ({ userInfo, onLoginSuccess }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}${LOGIN}`, userInfo);
      setAxiosAuthorizationToken(response.data.accessToken);

      await Promise.all([
        setEmailTokenClientSide(response.data),
        setUsernameIDClientSide(response.data),
      ]);

      onLoginSuccess();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const logoutReq = createAsyncThunk(
  `auth/logout`,
  async ({ onLogoutSuccess }, { rejectWithValue }) => {
    try {
      await Promise.all([
        resetEmailTokenClientSide(),
        resetUsernameIDClientSide(),
      ]);
      setAxiosAuthorizationToken(null);
      onLogoutSuccess();
      return true;
    } catch (err) {
      return rejectWithValue(false);
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
      setAxiosAuthorizationToken(response.data.accessToken);
      setEmailTokenClientSide(response.data);
      setUsernameIDClientSide(response.data);
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
      setEmailTokenClientSide(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const externalLogin = createAsyncThunk(
  `auth/externalLogin`,
  async ({ idToken, onExternalLoginSuccess }, { rejectWithValue }) => {
    try {
      console.log(45);
      const response = await axios.post(`${API_URL}${EXTERNAL_LOGIN}`, {
        idToken,
        provider: 'GOOGLE',
      });

      await Promise.all([
        setEmailTokenClientSide(response.data),
        setUsernameIDClientSide(response.data),
      ]);

      onExternalLoginSuccess();
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
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
    callbackSession: {},
  },
  reducers: {
    resetLoginError(state) {
      state.loginError = null;
    },
    setUserProfileCredentials(state, action) {
      state.userInfo = action.payload;
    },
    setCallbackSession(state, action) {
      state.callbackSession = action.payload;
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
        state.isLoginLoading = false;
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
        state.isLoginLoading = false;
        console.log(action.payload);
      })
      .addCase(loginReq.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginError = action.payload;
      });

    builder
      .addCase(externalLogin.pending, (state, action) => {})
      .addCase(externalLogin.fulfilled, (state, action) => {
        state.userInfo = { ...action.payload };
        console.log(action.payload);
      })
      .addCase(externalLogin.rejected, (state, action) => {});

    builder.addCase(logoutReq.fulfilled, (state, action) => {
      if (action.payload) {
        state.userInfo = {};
      }
    });

    builder
      .addCase(otpVerifyReq.pending, (state, action) => {
        state.isOtpLoading = true;
      })
      .addCase(otpVerifyReq.fulfilled, (state, action) => {
        state.userInfo = { ...action.payload };
        state.isLoginLoading = false;
        console.log(action.payload);
      })
      .addCase(otpVerifyReq.rejected, (state, action) => {
        state.isOtpLoading = false;
        state.isLoginLoading = false;
        console.log(action.payload);

        state.otpVerifyError = action.payload;
      });
  },
});

export const {
  resetLoginError,
  setUserProfileCredentials,
  setCallbackSession,
} = authSlice.actions;

export const selectLoginError = state => state.auth.loginError;
export const selectLoginLoadingState = state => state.auth.isLoginLoading;
export const selectCreateAccountLoadingState = state =>
  state.auth.isCreateAccountLoading;
export const selectOtpLoadingState = state => state.auth.isOtpLoading;
export const selectUserInfo = state => state.auth.userInfo;
export const selectCallbackSession = state => state.auth.callbackSession;
