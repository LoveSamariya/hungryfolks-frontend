import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import { createStyles } from './CustomButton.style';

export default function CustomButton({
  text,
  onPress,
  style = {},
  variant = 'Primary',
}) {
  const Styles = useThemeAwareObject(createStyles);
  const btnVariantStyle = Styles[`btn${variant}`] || Styles.btnPrimary;
  const btnVariantTextStyle =
    Styles[`btnText${variant}`] || Styles.btnTextPrimary;
  return (
    <TouchableHighlight
      underlayColor="transperent"
      onPress={() => {
        onPress && onPress();
      }}
      style={{ ...Styles.btnBase, ...btnVariantStyle, ...style }}>
      <Text style={{ ...Styles.btnTextBase, ...btnVariantTextStyle }}>
        {text}
      </Text>
    </TouchableHighlight>
  );
}
