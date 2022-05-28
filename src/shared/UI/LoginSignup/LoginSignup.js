import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import { CreateAccount, Login } from './components';
import { createStyles } from './LoginSignup.style';
import { GoogleSigninButtonContainer } from '../../../shared';
import CustomButton from '../CustomButton/CustomButton';

export default function LoginSignup() {
  const Styles = useThemeAwareObject(createStyles);
  const [showFormOfThis, setShowFormOfThis] = useState('');

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
            <Login />
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
            <CreateAccount />
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
