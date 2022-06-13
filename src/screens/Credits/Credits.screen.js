import React from 'react';
import { View } from 'react-native';
import { BackButton, CustomStatusBar, Link } from '../../shared';
import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import createStyles from './Credits.style';
import CreditsData from './credits.data';

function CreditsScreen({ navigation }) {
  const Styles = useThemeAwareObject(createStyles);
  return (
    <View style={Styles.page}>
      <CustomStatusBar variant="primary" />

      <BackButton navigation={navigation} style={{ marginTop: 8 }} />
      {CreditsData.map(({ link, title }, index) => {
        return (
          <Link
            key={index}
            text={title}
            href={link}
            style={{ marginTop: 15 }}
          />
        );
      })}
    </View>
  );
}

export default CreditsScreen;
