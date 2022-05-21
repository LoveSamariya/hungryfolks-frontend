import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import { Login } from './components';
import { createStyles } from './LoginSignup.style';

export default function LoginSignup() {
  const Styles = useThemeAwareObject(createStyles);

  return (
    <View style={Styles.formBox}>
      <Text style={Styles.heading} underlayColor>
        Create an account
      </Text>
      <Login />
      <View>
        <Text style={{ ...Styles.textGrey1, ...Styles.mtCaptionGap }}>
          Already have an account?
        </Text>
      </View>
      <View>
        <Text style={{ ...Styles.textGrey1, ...Styles.mtCaptionGap }}>
          Already have an account?
        </Text>
      </View>
      <View>
        <Text style={{ ...Styles.textGrey1, ...Styles.mtCaptionGap }}>
          Already have an account?
        </Text>
      </View>
      <View>
        <Text style={{ ...Styles.textGrey1, ...Styles.mtCaptionGap }}>
          Already have an account?
        </Text>
      </View>
      <View>
        <Text style={{ ...Styles.textGrey1, ...Styles.mtCaptionGap }}>
          Already have an account?
        </Text>
      </View>
      <View>
        <Text style={{ ...Styles.textGrey1, ...Styles.mtCaptionGap }}>
          Already have an account?
        </Text>
      </View>
    </View>
  );
}
