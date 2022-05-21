import React from 'react';

import config from './googleConfig';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

import { useGoogleAuth } from '../../../context/auth.google.context';

GoogleSignin.configure(config);

export default function GoogleSigninButtonContainer() {
  const { signIn } = useGoogleAuth();

  return (
    <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
      disabled={false}
    />
  );
}
