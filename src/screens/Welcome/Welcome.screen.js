import React from 'react';
import { Image, StyleSheet, View, Button } from 'react-native';
import { useGoogleAuth } from '../../context/auth.google.context';
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
  const { signOut } = useGoogleAuth();

  const Styles = useThemeAwareObject(createStyles);
  return (
    <View style={{ flex: 1, height: '100%' }}>
      <Image
        style={Styles.logo}
        source={require('../../assets/images/logo/logo.png')}
      />
      <LoginSignup />
    </View>
  );
}
