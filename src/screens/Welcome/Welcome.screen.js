import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import createStyles from './Welcome.style';
import { useThemeAwareObject } from '../../hooks/themeAwareObject';

import { AuthMethods, CustomButton, CustomStatusBar } from '../../shared';
import { setAppInitiatedClientSide } from '../../services/auth/auth.slice';
import { loginWithEnum } from '../../constants/enum';
import { useTimeOutHook } from '../../hooks/timeOutHook';

export default function WelcomeScreen({ navigation }) {
  const Styles = useThemeAwareObject(createStyles);

  return (
    <View style={{ ...Styles.pageBgColor, flex: 1, height: '100%' }}>
      <CustomStatusBar variant="secondary" />

      <SafeAreaView style={{ flex: 1, height: '100%', display: 'flex' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={Styles.logoContainer}>
            <Image
              style={Styles.logo}
              source={require('../../assets/images/logo/logo.png')}
            />
          </View>
          <View style={Styles.authArea}>
            <AuthMethods navigation={navigation} />
            <CustomButton
              text="Continue as guest"
              variant={'TextGreyUnderline'}
              onPress={() => {
                setAppInitiatedClientSide(loginWithEnum.guest);
                navigation.replace('Home');
              }}
              style={{ marginTop: 12 }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
