import React from 'react';
import qs from 'qs';
import config from './googleConfig';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { useGoogleAuth } from '../../../context/auth.google.context';
import { CustomGoogleSigninButton } from '../CustomGoogleSigninButton';
import { useDispatch } from 'react-redux';
import { externalLogin } from '../../../services/auth/auth.slice';
import { useNavigation } from '@react-navigation/native';

GoogleSignin.configure(config);

export default function GoogleSigninButtonContainer({ ...props }) {
  const dispatch = useDispatch();
  const { signIn, userInfo, signOut } = useGoogleAuth();

  const navigation = useNavigation();

  const userInfoObj = userInfo || {};
  const onExternalLoginSuccess = () => {
    navigation.replace('Home');
  };
  React.useEffect(() => {
    if (!Object.keys(userInfoObj)?.length) {
      return;
    }
    dispatch(
      externalLogin({
        idToken: userInfoObj.idToken,
        onExternalLoginSuccess,
        loginWith: 'GOOGLE',
      }),
    );
  }, [qs.stringify(userInfoObj)]);

  return <CustomGoogleSigninButton onPress={signIn} {...props} />;
}
