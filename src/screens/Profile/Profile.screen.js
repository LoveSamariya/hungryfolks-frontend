import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useThemeAwareObject } from '../../hooks/themeAwareObject';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faUserCircle,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import { useCommonStyle } from '../../hooks/commonStyle';
import createStyles from './Profile.style';

import { logoutReq } from '../../services/auth/auth.slice';

import {
  AuthMethods,
  BackButton,
  UserAvatar,
  CustomStatusBar,
  TopBar,
  CustomButton,
} from '../../shared';
import { useUserInfoHook } from '../../hooks/userInfoHook';
import { useDispatch } from 'react-redux';
import { alignItemsCenter } from '../../constants/common';
const guestUserData = {
  name: 'Guest Account',
};

function ProfileScreen({ navigation }) {
  const user = useUserInfoHook();
  const Styles = useThemeAwareObject(createStyles);
  const CommonStyles = useCommonStyle();
  const dispatch = useDispatch();
  // const user = {
  //   profile: {
  //     name: 'Harshad prajapati',
  //     email: 'iamharshad.prajapati@gmail.com',
  //   },
  // };
  const isLoggedIn = !!Object.keys(user).length;
  const username = isLoggedIn ? user?.profile?.name : guestUserData.name;
  const onLogoutSuccess = function () {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };
  const handleLogOut = () => {
    dispatch(logoutReq({ onLogoutSuccess }));
  };
  return (
    <>
      <CustomStatusBar variant="primary" />
      <TopBar navigation={navigation}>
        {isLoggedIn && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={Styles.logoutButton}
            onPress={handleLogOut}>
            <Text style={Styles.logoutText}>Logout</Text>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              style={{ marginLeft: 4 }}
              size={14}
              color={'#ffffff'}
            />
          </TouchableOpacity>
        )}
      </TopBar>
      <SafeAreaView
        style={{
          display: 'flex',
          flex: 1,
          height: '100%',
        }}>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              display: 'flex',
              flex: 1,
            }}>
            <View style={Styles.headerAsBreadCrums}></View>
            <View
              style={{
                ...Styles.profilePageContent,
              }}>
              <UserAvatar name={username} />
              <View
                style={{
                  ...Styles.dFlex,
                  ...Styles.alignItemsCenter,
                  ...Styles.flexRow,
                }}>
                {/* <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ marginRight: 4 }}
                  size={32}
                  color={'#000000'}
                /> */}
                <Text style={{ ...Styles.heading }}>{username}</Text>
              </View>
              {isLoggedIn && (
                <Text style={{ ...CommonStyles.textGray5 }}>
                  {user?.profile?.email}
                </Text>
              )}
              {!isLoggedIn && (
                <View style={{ ...Styles.authMethodsContainer }}>
                  <AuthMethods navigation={navigation} />
                </View>
              )}
              {/* TODO */}
              {/* <CustomButton
                text="Reset password"
                style={{ marginTop: 18 }}
                onPress={() => {
                  navigation.navigate('ResetPassword');
                }}
              /> */}
              <View style={{ marginTop: 'auto', display: 'flex' }}>
                <TouchableOpacity
                  style={{
                    ...Styles.footerText,
                  }}
                  onPress={() => navigation.navigate('Credits')}>
                  <Text
                    style={{
                      textAlign: 'right',
                      marginLeft: 'auto',
                      ...Styles.textUnderline,
                      ...Styles.textBlack,
                    }}>
                    credits
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default ProfileScreen;
