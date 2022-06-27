import React from 'react';
import { View } from 'react-native';

export default function CustomOverlay({ opacity = 0.4, style }) {
  return (
    <View
      style={{
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity,
        ...style,
      }}></View>
  );
}
