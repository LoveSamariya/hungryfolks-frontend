import React from 'react';
import { useForm } from 'react-hook-form';
import { commonCreateStyle } from '../../../../../constants/common';
import { useThemeAwareObject } from '../../../../../hooks/themeAwareObject';
import { EMAIL_REGEX } from '../../../../regex';
import CustomButton from '../../../CustomButton/CustomButton';
import { FormField, HookFormInput } from '../../../Form/Form';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

const formNames = {
  email: {
    name: 'Email',
    label: 'Email',
  },
  password: {
    name: 'Password',
    label: 'Password',
  },
};

export default function Login({ onLoginPressed, loginError }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  const Styles = useThemeAwareObject(commonCreateStyle);

  const onSubmit = data => {
    console.log(data);
    onLoginPressed(data);
  };

  return (
    <>
      <FormField label={formNames.email.label}>
        <HookFormInput
          control={control}
          name={formNames.email.name}
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
        <HookFormInput
          control={control}
          name={formNames.password.name}
          required
          secureTextEntry={true}
        />
      </FormField>
      <View>
        <Text style={Styles.textDanger}>{loginError}</Text>
      </View>
      <CustomButton
        text="Login"
        style={{ marginTop: 18 }}
        onPress={handleSubmit(onSubmit)}
      />
    </>
  );
}
