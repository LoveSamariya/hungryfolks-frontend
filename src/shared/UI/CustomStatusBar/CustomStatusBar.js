import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from '../../../context/thme.context';
import statusBarVariants from './CustomStatusBar.variants';

function CustomStatusBar({ variant = 'primary', ...props }) {
  const { theme } = useTheme();
  const isFocused = useIsFocused();

  const createVariant =
    statusBarVariants[variant] || statusBarVariants['primary'];
  const variantProps = createVariant(theme);

  if (!isFocused) return null; // clear Effect of statusBar after screen leaved

  return <StatusBar {...variantProps} {...props} />;
}

export default CustomStatusBar;
