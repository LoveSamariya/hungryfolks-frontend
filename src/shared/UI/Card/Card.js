import React from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {useTheme} from '../../../context/thme.context';
import {useThemeAwareObject} from '../../../hooks/themeAwareObject';

const createStyles = theme => {
  const styles = StyleSheet.create({
    card: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.color.gray1,
      padding: theme.spacing[3],
      marginTop: theme.spacing[3],
      shadowColor: theme.color.gray3,
      backgroundColor: theme.color.surface,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.6,
      shadowRadius: 2,
      elevation: 5,
    },
    cardText: {
      paddingTop: theme.spacing[3],
      color: theme.color.onSurface,
      fontFamily: theme.fontFamily.secondaryBlack,
    },
    img: {
      maxWidth: '100%',
      height: '100%',
    },
    imgContainer: {
      height: 124,
      borderTopEndRadius: 12,
      borderTopLeftRadius: 12,
      overflow: 'hidden',
      marginLeft: theme.spacing[3] * -1,
      marginRight: theme.spacing[3] * -1,
      marginTop: theme.spacing[3] * -1,
    },
  });
  return styles;
};

export default function Card({
  img: ImgComponent,
  title,
  onCardPressed,
  children,
}) {
  const {theme} = useTheme();
  const Styles = useThemeAwareObject(createStyles);

  return (
    <TouchableHighlight
      onPress={() => {
        onCardPressed();
      }}
      underlayColor="white">
      <View style={Styles.card}>
        <View style={Styles.imgContainer}>
          {children}
          {/* <Image
            style={Styles.img}
            source={require('../../../assets/images/categories/indian-categories.jpg')}
          /> */}
        </View>
        <Text style={Styles.cardText}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}
