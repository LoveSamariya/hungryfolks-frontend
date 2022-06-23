import React, { useState } from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const Context = React.createContext({
  userInfo: null,
  signIn: () => {
    console.log('ThemeProvider is not rendered!');
  },
  signOut: () => {
    console.log('ThemeProvider is not rendered!');
  },
});

export const AuthProviderGoogle = ({ initial, children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const signIn = React.useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      console.log(userInfo);
      // this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log(error, 'error');
        // some other error happened
      }
    }
  }, []);

  const signOut = React.useCallback(async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  }, []);

  const MemoizedValue = React.useMemo(() => {
    const value = {
      userInfo,
      signIn,
      signOut,
    };
    return value;
  }, [userInfo]);

  return <Context.Provider value={MemoizedValue}>{children}</Context.Provider>;
};

export const useGoogleAuth = () => React.useContext(Context);
