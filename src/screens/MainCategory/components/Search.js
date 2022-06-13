import React, { useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons';

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

function Search({
  placeholder = 'Search...',
  onSearchValueChange,
  value,
  controlledInput,
  onClosePressed,
  style,
}) {
  const [inputValue, onInputValueChange] = React.useState('');

  const Styles = useThemeAwareObject(createStyles);

  useEffect(() => {
    if (onSearchValueChange) {
      onSearchValueChange(inputValue);
    }
  }, [inputValue]);

  return (
    <View style={{ position: 'relative', ...style }}>
      <FontAwesomeIcon
        icon={faSearch}
        size={24}
        color={'gray'}
        style={{ position: 'absolute', zIndex: 1, top: 14, left: 16 }}
      />
      <TextInput
        style={Styles.search}
        onChangeText={onInputValueChange}
        value={controlledInput ? value : inputValue}
        placeholderTextColor="rgba(0,0,0,0.5)"
        placeholder={placeholder}
      />
      {(!!value || !!inputValue) && (
        <FontAwesomeIcon
          icon={faClose}
          size={24}
          color={'gray'}
          style={{ position: 'absolute', zIndex: 1, top: 14, right: 16 }}
          onPress={() => {
            if (onClosePressed) {
              onClosePressed();
            }
            onInputValueChange('');
          }}
        />
      )}
    </View>
  );
}

function isEqual(prevProps, nextProps) {
  return prevProps.value == nextProps.value;
}

export default React.memo(Search, isEqual);
