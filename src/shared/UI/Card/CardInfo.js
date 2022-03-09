import React from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {THEME_TYPOGRAPHY} from '../../../constants/typography';
import {useThemeAwareObject} from '../../../hooks/themeAwareObject';
import {Rating, AirbnbRating} from 'react-native-ratings';

const createStyles = theme => {
  const styles = StyleSheet.create({
    card: {
      display: 'flex',
      flexDirection: 'row',
      borderRadius: 12,
      padding: theme.spacing[3],
      marginBottom: theme.spacing[8],
      backgroundColor: theme.color.surface,
      // ...theme.box.shadowProp,
    },
    cardImgContainer: {
      maxWidth: '50%',
      height: 126,
      borderRadius: 12,
      overflow: 'hidden',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#EAEFF2',
      marginTop: -20,
      marginBottom: -20,
      marginLeft: -8,
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
      marginBottom: theme.spacing[2],
    },
  });
  return styles;
};

export default function CardInfo({title, onCardPressed, children}) {
  const Styles = useThemeAwareObject(createStyles);

  return (
    <TouchableHighlight
      onPress={() => {
        onCardPressed();
      }}
      underlayColor="white">
      <View style={Styles.card}>
        <View style={Styles.cardImgContainer}>
          {children}
          {/* <Image
            style={Styles.img}
            source={require('../../../assets/images/categories/indian-categories.jpg')}
          /> */}
        </View>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={Styles.cardText}>{title}</Text>
          <View
            style={{display: 'flex', alignSelf: 'flex-start', paddingLeft: 16}}>
            <Rating
              ratingColor="#3498db"
              ratingBackgroundColor="#c8c7c8"
              count={5}
              defaultRating={5}
              imageSize={18}
              isDisabled
              readonly
              startingValue={4.5}
            />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}
