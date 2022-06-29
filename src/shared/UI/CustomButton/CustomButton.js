import React, { useMemo } from 'react';
import { TouchableHighlight, Text, View, TouchableOpacity } from 'react-native';
import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import { createStyles } from './CustomButton.style';
import { Loader } from '../../../shared';

function CustomButton({
  text,
  onPress,
  style = {},
  variant = 'Primary',
  isDisabled = false,
  isLoading = false,
  btnBlock,
  children,
  ...props
}) {
  const Styles = useThemeAwareObject(createStyles);
  let isTextVariant = useMemo(() => variant.indexOf('Text') == 0, [variant]);
  const defaultVariantStyle = useMemo(
    () => (!isTextVariant ? Styles.btnPrimary : {}),
    [Styles, isTextVariant],
  );

  const { btnVariantStyle, btnVariantLabelStyle, loaderVariantStyle } =
    useMemo(() => {
      const btnVariantStyleMemo =
        Styles[`btn${variant}`] || defaultVariantStyle;
      const btnVariantLabelStyleMemo =
        Styles[`btnLabel${variant}`] || Styles.btnTextPrimary;
      const loaderVariantStyleMemo =
        Styles[`loader${variant}`] || Styles.loaderPrimary;
      return {
        btnVariantStyle: btnVariantStyleMemo,
        btnVariantLabelStyle: btnVariantLabelStyleMemo,
        loaderVariantStyle: loaderVariantStyleMemo,
      };
    }, [variant, Styles, defaultVariantStyle]);

  const { btnVariantDisabledStateStyle, btnVariantDisabledLabelStateStyle } =
    useMemo(() => {
      const btnVariantDisabledStateStyleMemo =
        isDisabled || isLoading ? Styles[`btn${variant}Disabled`] : {};
      const btnVariantDisabledLabelStateStyleMemo =
        isDisabled || isLoading ? Styles[`btnLabel${variant}Disabled`] : {};

      return {
        btnVariantDisabledStateStyle: btnVariantDisabledStateStyleMemo,
        btnVariantDisabledLabelStateStyle:
          btnVariantDisabledLabelStateStyleMemo,
      };
    }, [isDisabled, isLoading, Styles, variant]);

  const blockStateStyle = useMemo(
    () => (btnBlock ? { width: '100%' } : {}),
    [btnBlock],
  );

  if (isTextVariant)
    return (
      <TouchableOpacity
        underlayColor="transperent"
        activeOpacity={0.7}
        onPress={(...arg) => {
          onPress && !isLoading && onPress(...arg);
        }}
        style={{
          ...btnVariantStyle,
          ...btnVariantDisabledStateStyle,
          ...blockStateStyle,
          ...style,
        }}
        {...props}>
        <Text
          style={{
            ...Styles.btnLabelBase,
            ...btnVariantLabelStyle,
            ...btnVariantDisabledLabelStateStyle,
          }}>
          {text}
        </Text>
      </TouchableOpacity>
    );

  return (
    <TouchableOpacity
      underlayColor="transperent"
      activeOpacity={isLoading ? 1 : 0.7}
      onPress={(...arg) => {
        onPress && !isLoading && onPress(...arg);
      }}
      style={{
        ...Styles.btnBase,
        ...btnVariantStyle,
        ...btnVariantDisabledStateStyle,
        ...blockStateStyle,
        ...style,
      }}
      {...props}>
      <View style={{ ...Styles.btnContent }}>
        {children}
        <Text
          style={{
            ...Styles.btnLabelBase,
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

export default CustomButton;
