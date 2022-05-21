import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import { LoginSignup } from '../../shared';

const createStyles = theme => {
  const styles = StyleSheet.create({
    logo: {
      maxWidth: '100%',
      height: 250,
      display: 'flex',
    },
  });
  return styles;
};

export default function WelcomeScreen() {
  const Styles = useThemeAwareObject(createStyles);
  return (
    <View>
      <Image
        style={Styles.logo}
        source={require('../../assets/images/logo/logo.png')}
      />
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <LoginSignup />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
