import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeAwareObject} from '../../hooks/themeAwareObject';
import CardInfo from '../../shared/UI/Card/CardInfo';
import Search from '../Recipe/components/Search';

const createStyles = theme => {
  const styles = StyleSheet.create({
    containerDetailsListing: {
      padding: theme.spacing[4],
    },
    headerAsBreadCrums: {
      height: 124,
      backgroundColor: theme.color.secondary,
      display: 'flex',
      // alignItems: 'center',
      justifyContent: 'center',
    },
    headerAsBreadCrumsTitle: {
      fontSize: 24,
      fontFamily: theme.fontFamily.primaryBold,
      textAlign: 'center',
    },
    cardOne: {
      height: 226,
      borderRadius: 12,
      overflow: 'hidden',
    },
    cardOneImgContainer: {
      position: 'relative',
      width: '100%',
      height: 226,
      resizeMode: 'cover',
    },
    cardOneImg: {
      width: '100%',
      height: '100%',
    },
    cardOneCaptionContainer: {
      backgroundColor: theme.color.highlight,
      left: 0,
      right: 0,
      bottom: 0,
      height: 46,
      position: 'absolute',
      opacity: 0.75,
      display: 'flex',
      justifyContent: 'center',
    },
    cardOneCaption: {
      fontSize: 24,
      paddingLeft: 16,
      color: theme.color.onHighlight,
      fontFamily: theme.fontFamily.secondaryBlack,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      marginLeft: -4,
      marginRight: -4,
      flexWrap: 'wrap',
    },
    col: {
      width: '50%',
      paddingLeft: theme.spacing[1],
      paddingRight: theme.spacing[1],
    },
    searchWrapper: {
      marginTop: theme.spacing[1],
      paddingLeft: theme.spacing[3],
      paddingRight: theme.spacing[3],
    },
    cardListing: {
      paddingTop: theme.spacing[7],
      backgroundColor: '#EAEFF2',
      paddingLeft: theme.spacing[3],
      paddingRight: theme.spacing[3],
      paddingBottom: 200,
    },
    // cardContainer: {
    //   backgroundColor: '#EAEFF2',
    //   padding: theme.spacing[2],
    // },
  });
  return styles;
};

export default function RecipeSubDetailsListScreen({navigation, route}) {
  const Styles = useThemeAwareObject(createStyles);

  const {id, name, subtitle} = route.params;

  const onCardPressed = subtitle => {
    navigation.navigate('RecipeDetails', {
      id,
      name,
      subtitle,
    });
  };

  return (
    <>
      <View style={Styles.headerAsBreadCrums}>
        <Text style={Styles.headerAsBreadCrumsTitle}>
          {' '}
          {name} / {subtitle}
        </Text>
        <SafeAreaView style={Styles.searchWrapper}>
          <Search />
        </SafeAreaView>
      </View>
      <SafeAreaView>
        <ScrollView>
          <View style={Styles.cardListing}>
            <CardInfo onCardPressed={() => onCardPressed()} />
            <CardInfo />
            <CardInfo />
            <CardInfo />
            <CardInfo />
            <CardInfo />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
