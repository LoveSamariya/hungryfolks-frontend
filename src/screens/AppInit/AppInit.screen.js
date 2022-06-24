import React from 'react';

import { Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  setAxiosAuthorizationToken,
  setUserProfileCredentials,
} from '../../services/auth/auth.slice';

import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import { CustomStatusBar } from '../../shared';

import createStyles from './AppInit.style';
import { useUserInfoHook } from '../../hooks/userInfoHook';
import { PASSED_AUTH, USER_PROFILE } from '../../constants/storageKeys';

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

const getPassedAuth = async () => {
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

  React.useEffect(() => {
    const handleSetUserProfileCredentials = usr => {
      dispatch(setUserProfileCredentials(usr));
    };

    Promise.all([
      getCredentialFromClientStorage(),
      getUserProfileDataFromClientStorage(),
    ])
      .then(values => {
        const [userCredentials, userProfile] = values;
        if (userCredentials && userProfile) {
          handleSetUserProfileCredentials({
            profile: {
              email: userCredentials.email,
              name: userProfile.name,
              id: userProfile.id,
            },
            accessToken: userCredentials.accessToken,
          });
          setAxiosAuthorizationToken(userCredentials.accessToken);
        }
        getPassedAuth().then(passedAuth => {
          if (passedAuth) {
            navigation.replace('Home');
            return;
          }
          navigation.replace('Welcome');
        });
      })
      .catch(e => {
        console.log(e);
      });
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
