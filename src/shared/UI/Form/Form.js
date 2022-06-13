import React from 'react';
import { Text, View, TextInput } from 'react-native';

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

export function HookFormInput({
  control,
  name,
  required = false,
  rules,
  label,
  onChange,
  ...rest
}) {
  const Styles = useThemeAwareObject(createStylesForm);
  const controllerRules = {
    required: required ? `${label || name} is required` : false,
    ...rules,
  };
  const {
    field,
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: controllerRules,
  });
  const errorStatusStyle = invalid ? Styles.inputInvalid : {};
  return (
    <>
      <TextInput
        style={{ ...Styles.input, ...errorStatusStyle }}
        {...field}
        onChangeText={val => {
          if (onChange) onChange(val);

          field.onChange(val);
        }}
        {...rest}
      />
      {invalid && <Text style={Styles.errorMessage}> {error.message}</Text>}
    </>
  );
}
