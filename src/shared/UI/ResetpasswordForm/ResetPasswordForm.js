import React from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '../Form';
import { CustomButton, CustomPasswordInput } from '../../../shared';
const formNames = {
  currentPassword: {
    name: 'currentPassword',
    label: 'Current Password',
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

function ResetPasswordForm({ onResetPassWordSubmit }) {
  const { handleSubmit, control, setError } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

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
    onResetPassWordSubmit(formData);
  };
  return (
    <>
      <FormField label={formNames.currentPassword.label}>
        <CustomPasswordInput
          control={control}
          name={formNames.currentPassword.name}
          label={formNames.currentPassword.label}
          required
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
      />
    </>
  );
}

export default ResetPasswordForm;
