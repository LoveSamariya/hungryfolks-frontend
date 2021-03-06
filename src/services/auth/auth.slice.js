import * as Keychain from 'react-native-keychain';
import axios from 'axios';

import { API_URL } from '@env';
import {
  REGISTRATION,
  LOGIN,
  VERIFY_OTP,
  RESEND_OTP,
  EXTERNAL_LOGIN,
} from '../constants';
import {
  USER_PROFILE,
  PASSED_AUTH,
  PASSED_INTRO,
  LAST_LOGGED_IN,
} from '../../constants/storageKeys';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginWithEnum } from '../../constants/enum';
import { __PERMANENT__KEY__ } from '../../constants/constants';

export function setAxiosAuthorizationToken(auth_token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth_token;
}

export async function clearAsyncStorageWithExclude() {
  try {
    let keys = await AsyncStorage.getAllKeys();
    keys = keys.filter(key => key.indexOf(__PERMANENT__KEY__) !== 0);
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    // console.log(e);
  }
}
export async function clearAsyncStorage(safeMode = true) {
  try {
    if (!safeMode) return await AsyncStorage.clear();
    return await clearAsyncStorageWithExclude();
  } catch (e) {
    // console.log(e);
  }
}

export async function asyncStorageHelper(key, value) {
  try {
    if (value === undefined) {
      return JSON.parse(await AsyncStorage.getItem(key));
    } else {
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    // console.log(e);
  }
}

export async function lastLoggedInClientSide(date) {
  return await asyncStorageHelper(LAST_LOGGED_IN, date);
}

export async function setAppInitiatedClientSide(appInitiated) {
  try {
    await AsyncStorage.setItem(PASSED_AUTH, appInitiated);
  } catch (e) {
    // console.log(e);
  }
}

export async function setIntroPassedClientSide(passedIntro) {
  try {
    await AsyncStorage.setItem(PASSED_INTRO, passedIntro);
  } catch (e) {
    // console.log(e);
  }
}

export async function getIntroPassedClientSide() {
  try {
    return await AsyncStorage.getItem(PASSED_INTRO);
  } catch (e) {}
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
    await AsyncStorage.setItem(USER_PROFILE, jsonValue);
  } catch (e) {
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
  async ({ userInfo, onLoginSuccess }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}${LOGIN}`, userInfo);
      setAxiosAuthorizationToken(response.data.accessToken);
      dispatch(setAppPassedAuth(loginWithEnum.hungryFolks));
      await Promise.all([
        setEmailTokenClientSide(response.data),
        setUsernameIDClientSide(response.data),
        setAppInitiatedClientSide(loginWithEnum.hungryFolks),
      ]);
      await lastLoggedInClientSide(+new Date());
      onLoginSuccess();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const logoutReq = createAsyncThunk(
  `auth/logout`,
  async ({ onLogoutSuccess } = {}, { rejectWithValue, getState }) => {
    const {
      auth: { passedAuth },
    } = getState();

    try {
      await Promise.all([
        resetEmailTokenClientSide(),
        resetUsernameIDClientSide(),
        setAppInitiatedClientSide(''),
      ]);
      setAxiosAuthorizationToken(null);
      clearAsyncStorage();
      onLogoutSuccess && onLogoutSuccess();
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
    { rejectWithValue, getState, dispatch },
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
      dispatch(setAppPassedAuth(loginWithEnum.hungryFolks));
      onOtpVerified();
      setAxiosAuthorizationToken(response.data.accessToken);
      setEmailTokenClientSide(response.data);
      setUsernameIDClientSide(response.data);
      setAppInitiatedClientSide(loginWithEnum.hungryFolks);
      await lastLoggedInClientSide(new Date());
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
  async (
    { idToken, onExternalLoginSuccess },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await axios.post(`${API_URL}${EXTERNAL_LOGIN}`, {
        idToken,
        provider: 'GOOGLE',
      });

      dispatch(setAppPassedAuth(loginWithEnum.google));

      await Promise.all([
        setEmailTokenClientSide(response.data),
        setUsernameIDClientSide(response.data),
        setAppInitiatedClientSide(loginWithEnum.google),
      ]);
      await lastLoggedInClientSide(new Date());

      onExternalLoginSuccess();
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
    passedAuth: null,
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
    setAppPassedAuth(state, action) {
      state.passedAuth = action.payload;
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
      })
      .addCase(createAccountReq.rejected, (state, action) => {
        state.isCreateAccountLoading = false;
      });

    builder
      .addCase(loginReq.pending, (state, action) => {
        state.isLoginLoading = true;
      })
      .addCase(loginReq.fulfilled, (state, action) => {
        state.userInfo = { ...action.payload };
        state.isLoginLoading = false;
      })
      .addCase(loginReq.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginError = action.payload;
      });

    builder
      .addCase(externalLogin.pending, (state, action) => {})
      .addCase(externalLogin.fulfilled, (state, action) => {
        state.userInfo = { ...action.payload };
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
      })
      .addCase(otpVerifyReq.rejected, (state, action) => {
        state.isOtpLoading = false;
        state.isLoginLoading = false;

        state.otpVerifyError = action.payload;
      });
  },
});

export const {
  resetLoginError,
  setUserProfileCredentials,
  setCallbackSession,
  setAppPassedAuth,
} = authSlice.actions;

export const selectLoginError = state => state.auth.loginError;
export const selectLoginLoadingState = state => state.auth.isLoginLoading;
export const selectCreateAccountLoadingState = state =>
  state.auth.isCreateAccountLoading;
export const selectOtpLoadingState = state => state.auth.isOtpLoading;
export const selectUserInfo = state => state.auth.userInfo;
export const selectCallbackSession = state => state.auth.callbackSession;
export const selectPassedAuth = state => state.auth.passedAuth;
