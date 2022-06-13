import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from '../../../context/thme.context';
import statusBarVariants from './CustomStatusBar.variants';

function CustomStatusBar({ variant = 'primary', ...props }) {
  const { theme } = useTheme();
  const createVariant =
    statusBarVariants[variant] || statusBarVariants['primary'];
  const variantProps = createVariant(theme);

  return <StatusBar {...variantProps} {...props} />;
}

export default CustomStatusBar;
