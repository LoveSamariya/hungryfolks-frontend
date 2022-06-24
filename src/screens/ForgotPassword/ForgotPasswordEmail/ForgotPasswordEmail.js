import React from 'react';
import { Text, View, SafeAreaView, ScrollView, Image } from 'react-native';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { useThemeAwareObject } from '../../../hooks/themeAwareObject';

import { commonCreateStyle } from '../../../constants/common';

import {
  BackButton,
  CustomButton,
  CustomStatusBar,
  EMAIL_REGEX,
  FormField,
  HookFormInput,
} from '../../../shared';
import { OtpVerification } from '../../../shared/UI/LoginSignup/components';

import {
  otpVerifyReq,
  resendOtpReq,
  selectOtpLoadingState,
} from '../../../services/auth/auth.slice';
import { useCallBackSessionNavigation } from '../../../hooks/callbackSessionNavigation';
import createStyles from '../ForgotPassword.style';

const formNames = {
  email: {
    name: 'email',
    label: 'Email address',
  },
  password: {
    name: 'password',
    label: 'Password',
  },
};

export default function ForgotPasswordEmailScreen({ navigation }) {
  const dispatch = useDispatch();

  const { formState, control, handleSubmit } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  //   const isLoading = useSelector(selectOtpLoadingState);
  const CommonStyle = useThemeAwareObject(commonCreateStyle);
  const Styles = useThemeAwareObject(createStyles);
  const { sessionAwareNavigate } = useCallBackSessionNavigation(navigation);

  //   const onOtpVerificationPressed = otpData => {
  //     dispatch(
  //       otpVerifyReq({
  //         verificationCode: otpData.verificationCode,
  //         onOtpVerified,
  //       }),
  //     );
  //   };

  //   const onResendOtpPressed = onResendOtpSuccess => {
  //     dispatch(resendOtpReq({ onResendOtpSuccess }));
  //   };
  const onSubmit = formData => {
    console.log(formData);
    navigation.navigate('ForgotPasswordOtpPassword');
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
              source={require('../../../assets/images/logo/logo.png')}
            />
            <Text style={Styles.screenHeading} underlayColor>
              Forgot Password
            </Text>
            <Text style={CommonStyle.textGray3}>
              We will send you an OTP Code to your entered email address on the
              below field. Please enter your email on below field and press Send
              me OTP
            </Text>
          </View>
          <FormField label={formNames.email.label}>
            <HookFormInput
              control={control}
              name={formNames.email.name}
              label={formNames.email.label}
              required
              rules={{
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Please enter a valid email address.',
                },
              }}
              keyboardType={'email-address'}
            />
            <CustomButton
              text="Send me OTP"
              style={{ marginTop: 18 }}
              onPress={handleSubmit(onSubmit)}
              //   isLoading={isLoading}
            />
          </FormField>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
