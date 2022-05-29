import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import { CreateAccount, Login, OtpVerification } from './components';
import { createStyles } from './LoginSignup.style';
import { GoogleSigninButtonContainer } from '../../../shared';
import CustomButton from '../CustomButton/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { resetLoginError } from '../../../services/auth/auth.slice';

export default function LoginSignup({
  onLoginPressed,
  onCreateAccountPressed,
  onOtpVerificationPressed,
  showFormOfThis,
  setShowFormOfThis,
  loginError,
}) {
  const Styles = useThemeAwareObject(createStyles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetLoginError(null));
  }, [showFormOfThis]);

  return (
    <SafeAreaView style={{ flex: 1, height: '100%' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: '100%' }}>
        {!showFormOfThis && (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomButton
              variant={'White'}
              text="Login"
              style={{ marginTop: 18, width: 100 }}
              onPress={() => setShowFormOfThis('login')}
            />
            <CustomButton
              variant={'White'}
              text="Register"
              style={{ marginTop: 18, width: 120, marginBottom: 18 }}
              onPress={() => setShowFormOfThis('signup')}
            />
          </View>
        )}
        {showFormOfThis == 'login' && (
          <View style={Styles.formBox}>
            <Text style={Styles.heading} underlayColor>
              Login
            </Text>
            <Login onLoginPressed={onLoginPressed} loginError={loginError} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 18,
              }}>
              <Text style={{ ...Styles.textGrey1 }}>New to Hungry Folks?</Text>
              <View>
                <CustomButton
                  text="Let's Create an Account"
                  onPress={() => setShowFormOfThis('signup')}
                  variant={'TextPrimary'}
                />
              </View>
            </View>
          </View>
        )}
        {showFormOfThis == 'signup' && (
          <View style={Styles.formBox}>
            <Text style={Styles.heading} underlayColor>
              Create an account
            </Text>
            <CreateAccount onCreateAccountPressed={onCreateAccountPressed} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 18,
              }}>
              <Text style={{ ...Styles.textGrey1 }}>
                Already have an account?
              </Text>
              <View>
                <CustomButton
                  text="Login"
                  onPress={() => setShowFormOfThis('login')}
                  variant={'TextPrimary'}
                />
              </View>
            </View>
          </View>
        )}
        {showFormOfThis == 'otp' && (
          <View style={Styles.formBox}>
            <Text style={Styles.heading} underlayColor>
              OTP Verification
            </Text>
            <Text style={Styles.textGrey1}>
              An otp has been sent to your email address. Please enter otp to
              verify.
            </Text>
            <OtpVerification
              onOtpVerificationPressed={onOtpVerificationPressed}
            />
          </View>
        )}
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <GoogleSigninButtonContainer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
