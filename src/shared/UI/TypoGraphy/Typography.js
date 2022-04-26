import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useThemeAwareObject } from '../../../hooks/themeAwareObject';

const createStyles = theme => {
  const styles = StyleSheet.create({
    heading1: {
      fontSize: 24,
      color: theme.color.onSurface,
      fontFamily: 'RobotoCondensed-Bold',
    },
  });
  return styles;
};

export function Heading1({ children, style = {} }) {
  const Styles = useThemeAwareObject(createStyles);

  return <Text style={{ ...Styles.heading1, ...style }}>{children}</Text>;
}
