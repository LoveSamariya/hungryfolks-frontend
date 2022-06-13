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
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { useCommonStyle } from '../../hooks/commonStyle';
import createStyles from './Profile.style';

import {
  AuthMethods,
  BackButton,
  UserAvatar,
  CustomStatusBar,
  TopBar,
} from '../../shared';

const guestUserData = {
  name: 'Guest Account',
};

function ProfileScreen({ navigation }) {
  const Styles = useThemeAwareObject(createStyles);
  const CommonStyles = useCommonStyle();
  const user = {
    name: 'Harshad prajapati',
    email: 'iamharshad.prajapati@gmail.com',
  };
  const isLoggedIn = false;
  const username = isLoggedIn ? user.name : guestUserData.name;

  const handleLogOut = () => {};
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
              <Text style={{ ...Styles.heading }}>{username}</Text>
              {isLoggedIn && (
                <Text style={{ ...CommonStyles.textGray5 }}>{user.email}</Text>
              )}
              {!isLoggedIn && (
                <View style={{ ...Styles.authMethodsContainer }}>
                  <AuthMethods navigation={navigation} />
                </View>
              )}

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
