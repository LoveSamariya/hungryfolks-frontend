import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../CustomButton/CustomButton';
import { FormField, HookFormInput } from '../../../Form/Form';
import { useTimeOutHook } from '../../../../../hooks/timeOutHook';
import { useCommonStyle } from '../../../../../hooks/commonStyle';

const formNames = {
  otp: {
    name: 'verificationCode',
    label: 'Otp',
  },
};

export default function OtpVerification({
  onOtpVerificationPressed,
  onResendOtpPressed,
  isLoading,
}) {
  const resendOtpTimer = 30;
  const [canReSendOtp, setCanReSendOtp] = useState(false);
  const { tick, setTick } = useTimeOutHook({
    timer: resendOtpTimer,
    onComplete: () => {
      setCanReSendOtp(true);
    },
  });

  useEffect(() => {
    if (!canReSendOtp) {
      setTick(resendOtpTimer);
    }
  }, [canReSendOtp]);

  const CommonStyle = useCommonStyle();
  const { handleSubmit, control } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  const onSubmit = data => {
    console.log(data);
    onOtpVerificationPressed(data);
  };

  const onResendOtpSuccess = () => {
    setCanReSendOtp(false);
  };

  const handleResendOtp = () => {
    onResendOtpPressed(onResendOtpSuccess);
  };

  return (
    <>
      <View style={{ marginTop: 12 }}>
        <FormField label={formNames.otp.label}>
          <HookFormInput
            control={control}
            name={formNames.otp.name}
            label={formNames.otp.label}
            keyboardType={'numeric'}
            required
          />
        </FormField>
      </View>
      <View>
        {canReSendOtp ? (
          <TouchableOpacity activeOpacity={0.7} onPress={handleResendOtp}>
            <Text style={CommonStyle.textGray3}>Request otp again </Text>
          </TouchableOpacity>
        ) : (
          <Text style={CommonStyle.textGray5}>
            Didn't get otp? Resend otp in <Text>{tick}s</Text>
          </Text>
        )}
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
