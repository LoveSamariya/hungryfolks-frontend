import React from 'react';
import { Text, View } from 'react-native';
import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import { createStyles } from './LineDivider.style';

export default function LineDivider({
  text,
  borderWidth = 2,
  borderColor = '#cccccc',
  style: { fontSize, color, ...style } = {},
}) {
  const Styles = useThemeAwareObject(createStyles);
  return (
    <View style={{ ...Styles.lineDividerContainer, ...style }}>
      <View
        style={{
          ...Styles.lineDividerLine,
          height: borderWidth,
          backgroundColor: borderColor,
        }}
      />
      {text && (
        <Text
          style={{
            ...Styles.lineDividerText,
            fontSize: fontSize || 18,
            color: color || '#cccccc',
          }}>
          {text}
        </Text>
      )}

      <View
        style={{
          ...Styles.lineDividerLine,
          height: borderWidth,
          backgroundColor: borderColor,
        }}
      />
    </View>
  );
}
