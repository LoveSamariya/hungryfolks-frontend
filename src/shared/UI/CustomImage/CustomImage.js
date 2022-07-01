import React from 'react';
import { Image } from 'react-native';
import { defaultImage } from './CustomImage.data';

export default function CustomImage({ defaultSource, source, ...props }) {
  return (
    <Image
      ImageSource
      defaultSource={defaultSource || defaultImage}
      source={source?.uri ? source : defaultImage}
      {...props}
    />
  );
}
