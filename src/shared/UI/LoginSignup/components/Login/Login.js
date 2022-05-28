import React from 'react';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../CustomButton/CustomButton';
import { FormField, HookFormInput } from '../../../Form/Form';

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

export default function Login() {
  const { handleSubmit, control } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <FormField label={formNames.email.label}>
        <HookFormInput control={control} name={formNames.email.name} />
      </FormField>

      <FormField label={formNames.password.label}>
        <HookFormInput control={control} name={formNames.password.name} />
      </FormField>

      <CustomButton
        text="Login"
        style={{ marginTop: 18 }}
        onPress={handleSubmit(onSubmit)}
      />
    </>
  );
}
