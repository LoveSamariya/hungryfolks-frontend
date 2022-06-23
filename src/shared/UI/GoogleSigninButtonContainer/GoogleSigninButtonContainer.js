import React from 'react';
import qs from 'qs';
import config from './googleConfig';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { useGoogleAuth } from '../../../context/auth.google.context';
import { CustomGoogleSigninButton } from '../CustomGoogleSigninButton';
import { useDispatch } from 'react-redux';
import { externalLogin } from '../../../services/auth/auth.slice';

GoogleSignin.configure(config);

export default function GoogleSigninButtonContainer({ ...props }) {
  const dispatch = useDispatch();
  const { signIn, userInfo } = useGoogleAuth();

  const userInfoObj = userInfo || {};
  console.log(userInfoObj, 'userInfoObj---------------------');
  const onExternalLoginSuccess = () => {
    console.log('success');
  };
  React.useEffect(() => {
    if (!Object.keys(userInfoObj)?.length) {
      return;
    }
    dispatch(
      externalLogin({ idToken: userInfoObj.idToken, onExternalLoginSuccess }),
    );
  }, [qs.stringify(userInfoObj)]);

  return <CustomGoogleSigninButton onPress={signIn} {...props} />;
}
