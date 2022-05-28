import React from 'react';
import { Image, StyleSheet, View, Button, Text } from 'react-native';
import { useGoogleAuth } from '../../context/auth.google.context';
import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import { LoginSignup } from '../../shared';
import CustomButton from '../../shared/UI/CustomButton/CustomButton';

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
      <View>
        <Image
          style={Styles.logo}
          source={require('../../assets/images/logo/logo.png')}
        />
      </View>

      <LoginSignup />
    </View>
  );
}
