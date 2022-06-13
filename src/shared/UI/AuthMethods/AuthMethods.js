import React from 'react';
import { GoogleSigninButtonContainer, CustomButton } from '../../../shared';

function AuthMethods({ navigation }) {
  return (
    <>
      <CustomButton
        variant={'SecondaryLight'}
        text="Login"
        style={{
          width: '100%',
        }}
        onPress={() => navigation.navigate('Login')}
      />
      <CustomButton
        variant={'SecondaryLight'}
        text="Register"
        style={{ marginTop: 18, marginBottom: 18, width: '100%' }}
        onPress={() => navigation.navigate('CreateAccount')}
      />

      <GoogleSigninButtonContainer />
    </>
  );
}

export default AuthMethods;
