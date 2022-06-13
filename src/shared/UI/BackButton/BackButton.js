import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import { createStyles } from './BackButton.style';
import GoBackIcon from '../../../icons/GoBackIcon';

function BackButton({ style = {}, navigation, fill = 'black' }) {
  const Styles = useThemeAwareObject(createStyles);
  return (
    <TouchableHighlight
      underlayColor="transperent"
      onPress={() => {
        navigation.goBack();
      }}
      style={{ ...Styles.backButtonContainer, ...style }}>
      <View>
        <GoBackIcon style={{ ...Styles.backButtonIcon, fill }} />
      </View>
    </TouchableHighlight>
  );
}

export default BackButton;
