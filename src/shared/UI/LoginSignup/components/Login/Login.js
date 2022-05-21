import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Alert,
  View,
} from 'react-native';
import { useThemeAwareObject } from '../../../../../hooks/themeAwareObject';
import { createStylesForm } from '../../../../styles/form.style';
import { useController, useForm } from 'react-hook-form';

function FormField({ label, children }) {
  const Styles = useThemeAwareObject(createStylesForm);

  return (
    <View style={Styles.input_wrapper}>
      <Text style={Styles.input_label}>{label}</Text>
      {children}
    </View>
  );
}

function HookFormInput({ control, name }) {
  const Styles = useThemeAwareObject(createStylesForm);

  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
    // defaultValue: '',
  });

  return (
    <TextInput style={Styles.input} {...field} onChangeText={field.onChange} />
  );
}

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
    label: 'Repeat Password',
  },
};

export default function Login() {
  const Styles = useThemeAwareObject(createStylesForm);

  const [text, onChangeText] = React.useState('');

  const { handleSubmit, control } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <FormField label={formNames.name.label}>
        <HookFormInput control={control} name={formNames.name.name} />
      </FormField>
      <FormField label={formNames.email.label}>
        <HookFormInput control={control} name={formNames.email.name} />
      </FormField>
      <FormField label={formNames.age.label}>
        <HookFormInput control={control} name={formNames.age.name} />
      </FormField>
      <FormField label={formNames.password.label}>
        <HookFormInput control={control} name={formNames.password.name} />
      </FormField>
      <FormField label={formNames.repeatPassword.label}>
        <HookFormInput control={control} name={formNames.repeatPassword.name} />
      </FormField>
      <Button title="Create an account" onPress={handleSubmit(onSubmit)} />
    </>
  );
}
