import React, { useState } from 'react';
import { Image, StyleSheet, View, Button, Text } from 'react-native';
import { useGoogleAuth } from '../../context/auth.google.context';
import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import {
  createAccount,
  createAccountReq,
  loginReq,
  selectLoginError,
  useCreateAccountMutation,
  useLoginMutation,
} from '../../services/auth/auth.slice';
import { LoginSignup } from '../../shared';
import CustomButton from '../../shared/UI/CustomButton/CustomButton';
import { useDispatch, useSelector } from 'react-redux';

const createStyles = theme => {
  const styles = StyleSheet.create({
    logo: {
      maxWidth: '100%',
      height: 250,
      display: 'flex',
    },
  });
  return styles;
};

export default function WelcomeScreen() {
  const { signOut } = useGoogleAuth();
  const dispatch = useDispatch();
  const Styles = useThemeAwareObject(createStyles);
  const [showFormOfThis, setShowFormOfThis] = useState('');

  const loginError = useSelector(selectLoginError);

  const onCreateAccountPressed = async userInfo => {
    const k = await dispatch(createAccountReq(userInfo));
    console.log(k);
    setShowFormOfThis('otp');
  };

  const onLoginPressed = async userInfo => {
    dispatch(loginReq(userInfo));
  };

  const onOtpVerificationPressed = async otpCode => {
    console.log(otpCode);
  };
  return (
    <View style={{ flex: 1, height: '100%' }}>
      <View>
        <Image
          style={Styles.logo}
          source={require('../../assets/images/logo/logo.png')}
        />
      </View>
      <LoginSignup
        showFormOfThis={showFormOfThis}
        setShowFormOfThis={setShowFormOfThis}
        onLoginPressed={onLoginPressed}
        onCreateAccountPressed={onCreateAccountPressed}
        onOtpVerificationPressed={onOtpVerificationPressed}
        loginError={loginError}
      />
    </View>
  );
}
