import React from 'react';

import { useForm } from 'react-hook-form';
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

export default function CreateAccount() {
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
      <CustomButton
        text="Create an Account"
        style={{ marginTop: 18 }}
        onPress={handleSubmit(onSubmit)}
      />
    </>
  );
}
