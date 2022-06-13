import React from 'react';

import { View, Image, SafeAreaView, ScrollView, Text } from 'react-native';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import {
  FormField,
  HookFormInput,
  CustomButton,
  BackButton,
  GoogleSigninButtonContainer,
  LineDivider,
  EMAIL_REGEX,
  NUMBER_REGEX,
  CustomStatusBar,
} from '../../shared';

import createStyles from './CreateAccount.style';

import { useThemeAwareObject } from '../../hooks/themeAwareObject';

import {
  createAccountReq,
  selectCreateAccountLoadingState,
} from '../../services/auth/auth.slice';

const formNames = {
  name: {
    name: 'Name',
    label: 'Name',
  },
  email: {
    name: 'Email',
    label: 'Email',
  },
  age: {
    name: 'Age',
    label: 'Age',
  },
  password: {
    name: 'Password',
    label: 'Password',
  },
  repeatPassword: {
    name: 'repeatPassword',
    label: 'Confirm Password',
  },
};

const testData = {
  Name: 'Maximilian',
  Email: 'max@gmail.com',
  Age: '30',
  Password: '123456',
  repeatPassword: '123456',
};

export default function CreateAccountScreen({ navigation }) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    defaultValues: { ...testData },
    mode: 'onChange',
  });

  const isLoading = useSelector(selectCreateAccountLoadingState);
  const passwordValue = watch(formNames.password.name);
  const repeatPasswordValue = watch(formNames.repeatPassword.name);
  const Styles = useThemeAwareObject(createStyles);

  const onCreateAccountProceed = () => {
    navigation.navigate('Otp');
  };

  const onSubmit = userInfo => {
    console.log(userInfo, passwordValue, repeatPasswordValue);
    if (passwordValue != repeatPasswordValue) {
      setError(formNames.repeatPassword.name, {
        type: 'custom',
        message: 'Password does not match',
      });
      return;
    }
    // onCreateAccountPressed(data);
    dispatch(createAccountReq({ userInfo, onCreateAccountProceed }));
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
            <Text style={{ ...Styles.screenHeading }}>Create account</Text>
            <FormField label={formNames.name.label}>
              <HookFormInput
                control={control}
                name={formNames.name.name}
                label={formNames.name.label}
                required
              />
            </FormField>
            <FormField label={formNames.email.label}>
              <HookFormInput
                control={control}
                name={formNames.email.name}
                label={formNames.email.label}
                rules={{
                  pattern: {
                    value: EMAIL_REGEX,
                    message: 'Please enter a valid email address.',
                  },
                }}
                required
                keyboardType={'email-address'}
              />
            </FormField>
            <FormField label={formNames.age.label}>
              <HookFormInput
                control={control}
                name={formNames.age.name}
                label={formNames.age.label}
                required
                rules={{
                  pattern: {
                    value: NUMBER_REGEX,
                    message: 'Please enter valid age.',
                  },
                }}
                keyboardType={'numeric'}
              />
            </FormField>
            <FormField label={formNames.password.label}>
              <HookFormInput
                control={control}
                name={formNames.password.name}
                label={formNames.password.label}
                required
                secureTextEntry={true}
              />
            </FormField>
            <FormField label={formNames.repeatPassword.label}>
              <HookFormInput
                control={control}
                name={formNames.repeatPassword.name}
                label={formNames.repeatPassword.label}
                onChange={() => setError(formNames.repeatPassword.name, '')}
                required
                secureTextEntry={true}
              />
            </FormField>
            <CustomButton
              text="Create an Account"
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
