import React from 'react';

import config from './googleConfig';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { useGoogleAuth } from '../../../context/auth.google.context';
import { CustomGoogleSigninButton } from '../CustomGoogleSigninButton';

GoogleSignin.configure(config);

export default function GoogleSigninButtonContainer({ ...props }) {
  const { signIn } = useGoogleAuth();

  return (
    <CustomGoogleSigninButton onPress={signIn} {...props} />
    // <GoogleSigninButton
    //   style={{
    //     width: '100%',
    //     border: 0,
    //     elevation: 0,
    //     shadowOpacity: 0,
    //   }}
    //   size={GoogleSigninButton.Size.Wide}
    //   color={GoogleSigninButton.Color.Light}
    //   onPress={signIn}
    //   disabled={false}
    // />
  );
}
