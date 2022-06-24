import React from 'react';
import { TouchableHighlight, Text, View, TouchableOpacity } from 'react-native';
import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import { createStyles } from './CustomButton.style';
import { Loader } from '../../../shared';

export default function CustomButton({
  text,
  onPress,
  style = {},
  variant = 'Primary',
  isDisabled = false,
  isLoading = false,
}) {
  const Styles = useThemeAwareObject(createStyles);
  const btnVariantStyle = Styles[`btn${variant}`] || Styles.btnPrimary;
  const btnVariantLabelStyle =
    Styles[`btnLabel${variant}`] || Styles.btnTextPrimary;
  const btnVariantDisabledStateStyle =
    isDisabled || isLoading ? Styles[`btn${variant}Disabled`] : {};
  const btnVariantDisabledLabelStateStyle =
    isDisabled || isLoading ? Styles[`btnLabel${variant}Disabled`] : {};
  const loaderVariantStyle = Styles[`loader${variant}`] || Styles.loaderPrimary;
  // for manage Text Variant
  let textButtonStyle = {};
  if (variant.search('Text') > -1) {
    textButtonStyle = {
      paddingHorizontal: 12,
    };
  }
  return (
    <TouchableOpacity
      underlayColor="transperent"
      activeOpacity={isLoading ? 1 : 0.7}
      onPress={() => {
        onPress && !isLoading && onPress();
      }}
      style={{
        ...Styles.btnBase,
        ...textButtonStyle,
        ...btnVariantStyle,
        ...btnVariantDisabledStateStyle,
        ...style,
      }}>
      <View style={{ ...Styles.btnContent }}>
        <Text
          style={{
            ...Styles.btnTextBase,
            ...btnVariantLabelStyle,
            ...btnVariantDisabledLabelStateStyle,
          }}>
          {text}
        </Text>
        {!!isLoading && (
          <Loader
            size="small"
            style={{
              ...Styles.loaderBase,
              ...loaderVariantStyle,
            }}
            color={loaderVariantStyle.color}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
