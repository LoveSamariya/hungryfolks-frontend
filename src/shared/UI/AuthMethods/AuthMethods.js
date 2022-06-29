import React from 'react';
import { GoogleSigninButtonContainer, CustomButton } from '../../../shared';

function AuthMethods({ navigation }) {
  return (
    <>
      <CustomButton
        variant={'SecondaryLight'}
        text="Login"
        style={{ marginBottom: 18 }}
        onPress={() => navigation.navigate('Login')}
        btnBlock
      />
      <CustomButton
        variant={'SecondaryLight'}
        text="Register"
        style={{ marginBottom: 18 }}
        onPress={() => navigation.navigate('CreateAccount')}
        btnBlock
      />

      <GoogleSigninButtonContainer />
    </>
  );
}

export default AuthMethods;
