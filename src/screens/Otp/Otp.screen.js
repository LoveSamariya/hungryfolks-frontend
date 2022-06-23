import React from 'react';
import { Text, View, SafeAreaView, ScrollView, Image } from 'react-native';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { useThemeAwareObject } from '../../hooks/themeAwareObject';

import createStyles from './Otp.style';
import { commonCreateStyle } from '../../constants/common';

import { BackButton, CustomStatusBar } from '../../shared';
import { OtpVerification } from '../../shared/UI/LoginSignup/components';

import {
  otpVerifyReq,
  resendOtpReq,
  selectOtpLoadingState,
} from '../../services/auth/auth.slice';
import { useCallBackSessionNavigation } from '../../hooks/callbackSessionNavigation';

export default function OtpScreen({ navigation }) {
  const dispatch = useDispatch();

  const {
    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  const isLoading = useSelector(selectOtpLoadingState);
  const CommonStyle = useThemeAwareObject(commonCreateStyle);
  const Styles = useThemeAwareObject(createStyles);
  const { sessionAwareNavigate } = useCallBackSessionNavigation(navigation);

  const onOtpVerified = () => {
    sessionAwareNavigate('Home');
  };
  const onOtpVerificationPressed = otpData => {
    dispatch(
      otpVerifyReq({
        verificationCode: otpData.verificationCode,
        onOtpVerified,
      }),
    );
  };

  const onResendOtpPressed = onResendOtpSuccess => {
    dispatch(resendOtpReq({ onResendOtpSuccess }));
  };
  return (
    <View style={Styles.page}>
      <CustomStatusBar variant="secondary" />

      <View style={{ ...Styles.backButtonAlignment }}>
        <BackButton navigation={navigation} />
      </View>
      <SafeAreaView style={{ flex: 1, height: '100%', display: 'flex' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ marginBottom: 12 }}>
            <Image
              style={Styles.logo}
              source={require('../../assets/images/logo/logo.png')}
            />
            <Text style={Styles.screenHeading} underlayColor>
              OTP Verification
            </Text>
            <Text style={CommonStyle.textGray3}>
              An otp has been sent to your email address. Please enter otp to
              verify.
            </Text>
            <OtpVerification
              onOtpVerificationPressed={onOtpVerificationPressed}
              onResendOtpPressed={onResendOtpPressed}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
