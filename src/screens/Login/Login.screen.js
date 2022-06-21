import React from 'react';
import { Text, View, SafeAreaView, ScrollView, Image } from 'react-native';

import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { useThemeAwareObject } from '../../hooks/themeAwareObject';

import { commonCreateStyle } from '../../constants/common';
import {
  FormField,
  HookFormInput,
  CustomButton,
  LineDivider,
  EMAIL_REGEX,
  GoogleSigninButtonContainer,
  BackButton,
  CustomStatusBar,
  CustomPasswordInput,
} from '../../shared';

import {
  loginReq,
  selectLoginError,
  selectLoginLoadingState,
} from '../../services/auth/auth.slice';

import createStyles from './Login.style';

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

const testData = {
  email: 'iamharshad.prajapati@gmail.com',
  password: 'Admin@123',
};

export default function LoginScreen({ onLoginPressed, navigation }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { ...testData },
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const CommonStyle = useThemeAwareObject(commonCreateStyle);
  const Styles = useThemeAwareObject(createStyles);
  const loginError = useSelector(selectLoginError);
  const isLoading = useSelector(selectLoginLoadingState);

  const onLoginSuccess = () => {
    navigation.popToTop();
    navigation.navigate('Home');
  };

  const onSubmit = userInfo => {
    console.log(userInfo);
    dispatch(loginReq({ userInfo, onLoginSuccess }));
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
          keyboardShouldPersistTaps="handled">
          <View style={{ marginBottom: 12 }}>
            <Image
              style={Styles.logo}
              source={require('../../assets/images/logo/logo.png')}
            />
            <Text style={{ ...Styles.screenHeading }}>Login</Text>

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
            </FormField>
            <FormField label={formNames.password.label}>
              <CustomPasswordInput
                control={control}
                name={formNames.password.name}
                label={formNames.password.label}
                required
              />
            </FormField>
            <View>
              <Text style={CommonStyle.textDanger}>{loginError}</Text>
            </View>
            <CustomButton
              text="Login"
              style={{ marginTop: 18 }}
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
            <LineDivider text="Or" style={{ marginTop: 56 }} />
            <GoogleSigninButtonContainer style={{ marginTop: 32 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
