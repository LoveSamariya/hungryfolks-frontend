import React from 'react';

import { View, SafeAreaView, ScrollView, Image } from 'react-native';
import { useDispatch } from 'react-redux';

import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getIntroPassedClientSide,
  lastLoggedInClientSide,
  logoutReq,
  setAppPassedAuth,
  setAxiosAuthorizationToken,
  setUserProfileCredentials,
} from '../../services/auth/auth.slice';

import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import { CustomStatusBar } from '../../shared';

import createStyles from './AppInit.style';
import { useUserInfoHook } from '../../hooks/userInfoHook';
import { PASSED_AUTH, USER_PROFILE } from '../../constants/storageKeys';
import { diffInDays } from '../../shared/helperFunctions';
import { useGoogleAuth } from '../../context/auth.google.context';
import { AUTH_EXPIRATION_DAYS } from '../../constants/constants';

const getCredentialFromClientStorage = async () => {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log(
        'Credentials successfully loaded for user ' + credentials.username,
        +'' + credentials.password,
      );

      return { email: credentials.username, accessToken: credentials.password };
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
};

const getUserProfileDataFromClientStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(USER_PROFILE);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e, 'error while getting profile data');
  }
};

export const getPassedAuth = async () => {
  try {
    const value = await AsyncStorage.getItem(PASSED_AUTH);
    return !!value;
  } catch (e) {
    console.log(e, 'error while getting profile data');
  }
};

export default function AppInitScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useUserInfoHook();
  const Styles = useThemeAwareObject(createStyles);
  const { signOut } = useGoogleAuth();

  const handleLogOut = () => {
    signOut().then(() => {
      dispatch(logoutReq());
    });
  };

  const handleSetUserProfileCredentials = usr => {
    dispatch(setUserProfileCredentials(usr));
  };

  const handleLoggedInUser = (userCredentials, userProfile) => {
    handleSetUserProfileCredentials({
      profile: {
        email: userCredentials.email,
        name: userProfile.name,
        id: userProfile.id,
      },
      accessToken: userCredentials.accessToken,
    });
    setAxiosAuthorizationToken(userCredentials.accessToken);
  };

  const handleUserNavigation = async () => {
    const passedAuth = await getPassedAuth();
    dispatch(setAppPassedAuth(passedAuth));
    if (passedAuth) {
      navigation.replace('Home');
      return;
    }

    const passedIntro = await getIntroPassedClientSide();
    if (!passedIntro) {
      navigation.replace('Intro');
      return;
    }

    navigation.replace('Welcome');
  };

  const isUserTokenValid = async () => {
    const lastLoggedIn = await lastLoggedInClientSide();
    const loggedInBeforeDays = diffInDays(lastLoggedIn, new Date());
    return loggedInBeforeDays <= AUTH_EXPIRATION_DAYS;
  };

  const handleAuthInit = async () => {
    const authValues = await Promise.all([
      getCredentialFromClientStorage(),
      getUserProfileDataFromClientStorage(),
    ]);

    const [userCredentials, userProfile] = authValues;
    const isUserLoggedIn = userCredentials && userProfile;

    if (isUserLoggedIn) {
      const userTokenValid = await isUserTokenValid();

      if (!userTokenValid) {
        handleLogOut();
        navigation.replace('Welcome');
        return false;
      }

      await handleLoggedInUser(userCredentials, userProfile);
    }
    return true;
  };
  const onAppInit = async () => {
    const authOk = await handleAuthInit();
    if (!authOk) return;
    await handleUserNavigation();
  };

  React.useEffect(() => {
    onAppInit().catch(() => {});
  }, []);

  return (
    <View style={Styles.page}>
      <CustomStatusBar variant="secondary" />
      <SafeAreaView style={{ flex: 1, display: 'flex' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View style={{ marginBottom: 12 }}>
            <Image
              style={Styles.logo}
              source={require('../../assets/images/logo/logo.png')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
