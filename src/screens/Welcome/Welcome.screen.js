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

import { AuthMethods, CustomStatusBar } from '../../shared';

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
            <TouchableHighlight
              underlayColor="transperent"
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Text style={{ marginTop: 12, textDecorationLine: 'underline' }}>
                Continue as guest
              </Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
