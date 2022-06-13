import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../CustomButton/CustomButton';
import { FormField, HookFormInput } from '../../../Form/Form';

const formNames = {
  otp: {
    name: 'otp',
    label: 'Otp',
  },
};

export default function OtpVerification({
  onOtpVerificationPressed,
  isLoading,
}) {
  const { handleSubmit, control } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  const onSubmit = data => {
    console.log(data);
    onOtpVerificationPressed(data);
  };

  return (
    <>
      <View style={{ marginTop: 12 }}>
        <FormField label={formNames.otp.label}>
          <HookFormInput
            control={control}
            name={formNames.otp.name}
            keyboardType={'numeric'}
            required
          />
        </FormField>
      </View>
      <CustomButton
        text="Verify"
        style={{ marginTop: 18 }}
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />
    </>
  );
}
