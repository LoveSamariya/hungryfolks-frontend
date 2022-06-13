import React from 'react';
import { ActivityIndicator } from 'react-native';

export default function Loader({
  size = 'large',
  color = '#fa004c',
  ...props
}) {
  return <ActivityIndicator size={size} color={color} {...props} />;
}
