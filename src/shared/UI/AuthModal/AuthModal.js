import React from 'react';
import { View, Image } from 'react-native';
import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import createStyles from './AuthModal.style';
import {
  CustomModal,
  GoogleSigninButtonContainer,
  CustomButton,
} from '../../../shared';

function AuthModal({ modalVisible, setModalVisible, navigation, ...props }) {
  const Styles = useThemeAwareObject(createStyles);
  const handleNavigate = screen => {
    navigation.replace(screen);
    setModalVisible(false);
  };
  return (
    <CustomModal
      modalVisible={modalVisible}
      style={Styles.pageBgColor}
      setModalVisible={setModalVisible}
      {...props}>
      <View style={Styles.logoContainer}>
        <Image
          style={Styles.logo}
          source={require('../../../assets/images/logo/logo.png')}
        />
      </View>
      <View style={Styles.authArea}>
        <CustomButton
          variant={'SecondaryLight'}
          text="Login"
          style={{
            marginTop: 18,
            width: '100%',
          }}
          onPress={() => {
            handleNavigate('Login');
          }}
        />
        <CustomButton
          variant={'SecondaryLight'}
          text="Register"
          style={{ marginTop: 18, marginBottom: 18, width: '100%' }}
          onPress={() => handleNavigate('CreateAccount')}
        />

        <GoogleSigninButtonContainer />
      </View>
    </CustomModal>
  );
}

export default AuthModal;
