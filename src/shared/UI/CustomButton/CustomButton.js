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
  const btnVariantLabelStyle =
    Styles[`btnLabel${variant}`] || Styles.btnTextPrimary;

  // for manage Text Variant
  let textButtonStyle = {};
  if (variant.search('Text') > -1) {
    textButtonStyle = {
      paddingHorizontal: 12,
    };
  }
  return (
    <TouchableHighlight
      underlayColor="transperent"
      onPress={() => {
        onPress && onPress();
      }}
      style={{
        ...Styles.btnBase,
        ...textButtonStyle,
        ...btnVariantStyle,
        ...style,
      }}>
      <Text style={{ ...Styles.btnTextBase, ...btnVariantLabelStyle }}>
        {text}
      </Text>
    </TouchableHighlight>
  );
}
