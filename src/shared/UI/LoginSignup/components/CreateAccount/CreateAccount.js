import React from 'react';

import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from '../../../../regex';
import CustomButton from '../../../CustomButton/CustomButton';
import { FormField, HookFormInput } from '../../../Form/Form';

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

export default function CreateAccount({ onCreateAccountPressed }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  const passwordValue = watch(formNames.password.name);
  const repeatPasswordValue = watch(formNames.repeatPassword.name);

  const onSubmit = data => {
    console.log(data, passwordValue, repeatPasswordValue);
    if (passwordValue != repeatPasswordValue) {
      setError(formNames.repeatPassword.name, {
        type: 'custom',
        message: 'Password does not match',
      });
      return;
    }
    onCreateAccountPressed(data);
  };

  return (
    <>
      <FormField label={formNames.name.label}>
        <HookFormInput control={control} name={formNames.name.name} required />
      </FormField>
      <FormField label={formNames.email.label}>
        <HookFormInput
          control={control}
          name={formNames.email.name}
          rules={{
            pattern: {
              value: EMAIL_REGEX,
              message: 'Please enter a valid email address.',
            },
          }}
          required
        />
      </FormField>
      <FormField label={formNames.age.label}>
        <HookFormInput
          control={control}
          name={formNames.age.name}
          required
          rules={{
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
              message: 'Please enter valid age.',
            },
          }}
        />
      </FormField>
      <FormField label={formNames.password.label}>
        <HookFormInput
          control={control}
          name={formNames.password.name}
          required
        />
      </FormField>
      <FormField label={formNames.repeatPassword.label}>
        <HookFormInput
          control={control}
          name={formNames.repeatPassword.name}
          onChange={() => setError(formNames.repeatPassword.name, '')}
          required
        />
      </FormField>
      <CustomButton
        text="Create an Account"
        style={{ marginTop: 18 }}
        onPress={handleSubmit(onSubmit)}
      />
    </>
  );
}
