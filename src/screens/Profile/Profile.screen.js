import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';

import { useThemeAwareObject } from '../../hooks/themeAwareObject';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowRightFromBracket,
  faShareFromSquare,
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
  LineDivider,
} from '../../shared';
import { useUserInfoHook } from '../../hooks/userInfoHook';
import { useDispatch } from 'react-redux';
import { alignItemsCenter } from '../../constants/common';
import { useGoogleAuth } from '../../context/auth.google.context';
import { useTheme } from '../../context/thme.context';
import { SHARE_APP_DATA } from '../../constants/constants';
const guestUserData = {
  name: 'Guest Account',
};

function ProfileScreen({ navigation }) {
  const user = useUserInfoHook();
  const Styles = useThemeAwareObject(createStyles);
  const CommonStyles = useCommonStyle();
  const dispatch = useDispatch();
  const { signOut } = useGoogleAuth();
  const { theme } = useTheme();
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
    signOut().then(() => {
      dispatch(logoutReq({ onLogoutSuccess }));
    });
  };

  const handleAppShare = () => {
    Share.share(SHARE_APP_DATA);
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

              <CustomButton
                variant={'SecondaryLight'}
                text="Share this app"
                style={{ marginTop: 18, marginBottom: 56 }}
                onPress={handleAppShare}>
                <FontAwesomeIcon
                  icon={faShareFromSquare}
                  size={24}
                  style={{ marginRight: 6 }}
                  color={theme.color.gray3}></FontAwesomeIcon>
              </CustomButton>

              {!isLoggedIn && <LineDivider style={{ marginBottom: 32 }} />}

              {!isLoggedIn && <AuthMethods navigation={navigation} />}
              {/* TODO */}
              {/* <CustomButton
                text="Reset password"
                style={{ marginTop: 18 }}
                onPress={() => {
                  navigation.navigate('ResetPassword');
                }}
              /> */}
              <CustomButton
                text="Privacy Policy"
                style={{ marginTop: 48 }}
                variant="TextGreyUnderline"
              />
              <CustomButton
                text="Terms of Use"
                style={{ marginTop: 24 }}
                variant="TextGreyUnderline"
              />
              <CustomButton
                text="Credits"
                style={{ marginTop: 24 }}
                variant="TextGreyUnderline"
                onPress={() => {
                  navigation.navigate('Credits');
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default ProfileScreen;
