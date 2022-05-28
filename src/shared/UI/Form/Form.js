import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';

import { useController } from 'react-hook-form';

import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import { createStylesForm } from '../../styles/form.style';

export function FormField({ label, children }) {
  const Styles = useThemeAwareObject(createStylesForm);

  return (
    <View style={Styles.input_wrapper}>
      <Text style={Styles.input_label}>{label}</Text>
      {children}
    </View>
  );
}

export function HookFormInput({ control, name }) {
  const Styles = useThemeAwareObject(createStylesForm);

  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <TextInput style={Styles.input} {...field} onChangeText={field.onChange} />
  );
}
