import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useThemeAwareObject} from '../../../hooks/themeAwareObject';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSearch
} from '@fortawesome/free-solid-svg-icons';



const createStyles = theme => {
  const styles = StyleSheet.create({
    search: {
      padding: theme.spacing[3],
      paddingLeft: 48,
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
    <View style={{position:'relative'}}>
       <FontAwesomeIcon
                icon={faSearch}
                size={24}
                color={'gray'}
                style={{position:'absolute', zIndex:1, top:14, left:16}}
              /> 
    <TextInput
      style={Styles.search}
      onChangeText={onChangeNumber}
      value={number}
      placeholderTextColor="rgba(0,0,0,0.5)"
      placeholder={placeholder}
    />
    </View>
  );
}
