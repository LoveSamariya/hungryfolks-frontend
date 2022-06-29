import React from 'react';
import { Text, View, SafeAreaView, ScrollView, Image } from 'react-native';

import { useThemeAwareObject } from '../../hooks/themeAwareObject';

import { useCommonStyle } from '../../hooks/commonStyle';
import createStyles from './ResetPassword.style';
import { CustomStatusBar, BackButton, ResetPasswordForm } from '../../shared';

function ResetPasswordScreen({ navigation }) {
  const Styles = useThemeAwareObject(createStyles);
  const CommonStyles = useCommonStyle();
  const onResetPassWordSubmit = formData => {
    // console.log(formData);
  };
  return (
    <View style={Styles.page}>
      <CustomStatusBar variant="secondary" />
      <View style={{ ...Styles.backButtonAlignment }}>
        <BackButton navigation={navigation} />
      </View>
      <SafeAreaView style={{ flex: 1, height: '100%', display: 'flex' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ marginBottom: 12 }}>
            <Image
              style={Styles.logo}
              source={require('../../assets/images/logo/logo.png')}
            />
            <Text style={Styles.screenHeading} underlayColor>
              Reset Password
            </Text>
            <ResetPasswordForm onResetPassWordSubmit={onResetPassWordSubmit} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default ResetPasswordScreen;
