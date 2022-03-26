import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {useThemeAwareObject} from '../../../hooks/themeAwareObject';

const createStyles = theme => {
  const styles = StyleSheet.create({
    search: {
      padding: theme.spacing[3],
      backgroundColor: theme.color.surface,
      borderWidth: 1,
      borderColor: theme.color.gray1,
      borderRadius: 48,
      color: 'black',
      ...theme.box.shadowProp,
    },
  });
  return styles;
};

export default function Search({placeholder = 'Search...'}) {
  const [number, onChangeNumber] = React.useState('');

  const Styles = useThemeAwareObject(createStyles);

  return (
    <TextInput
      style={Styles.search}
      onChangeText={onChangeNumber}
      value={number}
      placeholderTextColor="rgba(0,0,0,0.5)"
      placeholder={placeholder}
    />
  );
}
