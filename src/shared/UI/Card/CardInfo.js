import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { THEME_TYPOGRAPHY } from '../../../constants/typography';
import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { CustomImage } from '../CustomImage';

const createStyles = theme => {
  const styles = StyleSheet.create({
    card: {
      display: 'flex',
      flexDirection: 'row',
      borderRadius: 12,
      padding: theme.spacing[3],
      marginBottom: theme.spacing[4],
      marginTop: theme.spacing[4],
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

export default function CardInfo({
  title,
  onCardPressed,
  rating,
  children,
  image,
}) {
  const Styles = useThemeAwareObject(createStyles);

  return (
    <TouchableHighlight
      onPress={() => {
        onCardPressed();
      }}
      underlayColor="transperent">
      <View style={Styles.card}>
        <View style={Styles.cardImgContainer}>
          {children}
          <CustomImage style={Styles.img} source={{ uri: image }} />
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Text style={Styles.cardText} numberOfLines={2}>
            {title}
          </Text>
          <View
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              paddingLeft: 16,
            }}>
            <Rating
              ratingColor="#3498db"
              ratingBackgroundColor="#c8c7c8"
              count={5}
              defaultRating={5}
              imageSize={18}
              isDisabled
              readonly
              startingValue={rating}
            />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}
