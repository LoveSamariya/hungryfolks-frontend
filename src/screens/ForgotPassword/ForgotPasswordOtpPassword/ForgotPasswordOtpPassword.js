import React from 'react';
import { Text, View, SafeAreaView, ScrollView, Image } from 'react-native';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { useThemeAwareObject } from '../../../hooks/themeAwareObject';

import { commonCreateStyle } from '../../../constants/common';

import {
  BackButton,
  CustomButton,
  CustomPasswordInput,
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
  otp: {
    name: 'otp',
    label: 'OTP',
  },
  newPassword: {
    name: 'newPassword',
    label: 'New Password',
  },
  confirmPassword: {
    name: 'confirmPassword',
    label: 'Confirm Password',
  },
};

export default function ForgotPasswordOtpPassword({ navigation }) {
  const dispatch = useDispatch();

  const { formState, handleSubmit, control, setError } = useForm({
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
    if (
      formData[formNames.newPassword.name] !=
      formData[formNames.confirmPassword.name]
    ) {
      setError(formNames.confirmPassword.name, {
        type: 'custom',
        message: 'Password does not match',
      });
      return;
    }
    console.log(formData);
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
              Reset Password
            </Text>
            <Text style={CommonStyle.textGray3}>
              You have just received an OTP code on your entered email address.
              Check inbox or spam folder.
            </Text>
          </View>
          <FormField label={formNames.otp.label}>
            <HookFormInput
              control={control}
              name={formNames.otp.name}
              label={formNames.otp.label}
              keyboardType={'numeric'}
              maxLength={6}
              required
              rules={{
                minLength: {
                  value: 6,
                  message: 'OTP code should be 6 digits long',
                },
              }}
            />
          </FormField>
          <FormField label={formNames.newPassword.label}>
            <CustomPasswordInput
              control={control}
              name={formNames.newPassword.name}
              label={formNames.newPassword.label}
              required
            />
          </FormField>
          <FormField label={formNames.confirmPassword.label}>
            <CustomPasswordInput
              control={control}
              name={formNames.confirmPassword.name}
              label={formNames.confirmPassword.label}
              required
            />
          </FormField>
          <CustomButton
            text="Reset password"
            style={{ marginTop: 18 }}
            onPress={handleSubmit(onSubmit)}
            //   isLoading={isLoading}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
