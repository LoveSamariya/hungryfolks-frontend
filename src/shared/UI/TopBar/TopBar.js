import React from 'react';
import { View } from 'react-native';
import { BackButton } from '../../../shared';
import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import createStyles from './TopBar.style';
function TopBar({ style, children, navigation }) {
  const Styles = useThemeAwareObject(createStyles);
  return (
    <View style={{ ...Styles.stickyHeader, ...style }}>
      <BackButton
        navigation={navigation}
        fill="white"
        style={Styles.backButton}
      />
      {children}
    </View>
  );
}

export default TopBar;
