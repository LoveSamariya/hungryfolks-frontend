import React from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {THEME_TYPOGRAPHY} from '../../../constants/typography';
import {useThemeAwareObject} from '../../../hooks/themeAwareObject';

const createStyles = theme => {
  const styles = StyleSheet.create({
    card: {
      display: 'flex',
      flexDirection: 'row',
      borderRadius: 12,
      //   borderWidth: 1,
      //   borderColor: theme.color.highlight,
      backgroundColor: theme.color.surface,
      padding: theme.spacing[3],
      marginBottom: theme.spacing[2],
    },
    cardImgContainer: {
      maxWidth: '50%',
      height: 120,
      borderRadius: 12,
      overflow: 'hidden',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#EAEFF2',
    },
    img: {
      maxWidth: '100%',
      height: '100%',
      borderRadius: 12,
    },
    cardText: {
      fontSize: THEME_TYPOGRAPHY.size4,
      paddingLeft: theme.spacing[4],
      color: theme.color.onSurface,
      fontFamily: theme.fontFamily.secondaryMedium,
    },
  });
  return styles;
};

export default function CardInfo({onCardPressed}) {
  const Styles = useThemeAwareObject(createStyles);

  return (
    <TouchableHighlight
      onPress={() => {
        onCardPressed();
      }}
      underlayColor="white">
      <View style={Styles.card}>
        <View style={Styles.cardImgContainer}>
          <Image
            style={Styles.img}
            source={require('../../../assets/images/categories/indian-categories.jpg')}
          />
        </View>
        <Text style={Styles.cardText}>Pav Bhaji</Text>
      </View>
    </TouchableHighlight>
  );
}
