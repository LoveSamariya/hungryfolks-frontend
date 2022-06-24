import React from 'react';
import { View, Text } from 'react-native';

import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import createStyles from './UserAvatar.style';

const getAvatarCharacters = name => {
  return name
    .split(' ')
    .slice(0, 2)
    .map(x => x[0])
    .join('');
};

function UserAvatar({
  name = '',
  height = 150,
  fill = 'black',
  fontSize = 48,
  color = 'white',
  width = 150,
  style,
}) {
  const Styles = useThemeAwareObject(createStyles);
  return (
    <View
      style={{
        ...Styles.userAvatar,
        backgroundColor: fill,
        height,
        width,
        ...style,
      }}>
      <Text style={{ ...Styles.userAvatarText, fontSize, color }}>
        {getAvatarCharacters(name)}
      </Text>
    </View>
  );
}

export default UserAvatar;
