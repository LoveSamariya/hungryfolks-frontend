import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/thme.context';
import dummyRecipeData from '../../data/dummyRecipe.data';
import recipeList from '../../data/recipeList';
import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import CardInfo from '../../shared/UI/Card/CardInfo';
import Search from '../MainCategory/components/Search';
import { useGetDishRecipeQuery } from './DishRecipes.services';
import qs from 'qs';

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
      color: '#ffffff',
      textAlign: 'center',
    },
    cardOne: {
      height: 226,
      borderRadius: 12,
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
    listingBg: {
      backgroundColor: theme.color.pageBgColor,
    },
    cardListing: {
      paddingTop: theme.spacing[7],
      backgroundColor: theme.color.pageBgColor,
      paddingLeft: theme.spacing[3],
      paddingRight: theme.spacing[3],
      paddingBottom: 200,
    },
    filterChipsContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: 16,
    },
    onSurface: {
      color: theme.color.onSurface,
    },
    filterChips: {
      shadowColor: '#000',
      backgroundColor: '#fff',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      height: 32,
      width: 'auto',
      alignSelf: 'flex-start',
      minWidth: 56,
      paddingLeft: 16,
      paddingRight: 16,
      marginRight: 8,
    },
    img: {
      maxWidth: '100%',
      height: '100%',
      minWidth: 124,
      borderRadius: 12,
    },
  });
  return styles;
};

function Chips({ Styles, title }) {
  const { theme } = useTheme();

  const [isSelected, setIsSelected] = useState(false);

  return (
    <TouchableHighlight
      onPress={() => {
        // alert('ts');
        setIsSelected(!isSelected);
      }}
      style={{
        ...Styles.filterChips,
        backgroundColor: isSelected
          ? theme.color.highlight
          : theme.color.surface,
      }}>
      <Text
        style={{
          color: isSelected ? theme.color.onHighlight : theme.color.onSurface,
        }}>
        {title}
      </Text>
    </TouchableHighlight>
  );
}

export default function DishRecipesScreen({ navigation, route }) {
  const Styles = useThemeAwareObject(createStyles);

  const { id, MainCategory, SubCategory, customTitle, ingredient } =
    route.params || {};

  const { data, error, isLoading } = useGetDishRecipeQuery(
    qs.stringify(
      ingredient?.SubCategory
        ? { keywords: ingredient?.SubCategory }
        : { MainCategory, SubCategory },
      { indices: false },
    ),
  );

  const { dishRecipes } = data || {};

  const onCardPressed = code => {
    navigation.navigate('DishRecipeDetails', {
      id,
      code,
      MainCategory,
      SubCategory,
    });
  };

  return (
    <>
      <View style={Styles.headerAsBreadCrums}>
        <Text style={Styles.headerAsBreadCrumsTitle}>
          {/* {customTitle ? customTitle : `${name} / ${subtitle}`} */}
        </Text>
        <SafeAreaView style={Styles.searchWrapper}>
          <Search />
        </SafeAreaView>
      </View>
      <SafeAreaView>
        <View style={{ ...Styles.filterChipsContainer, ...Styles.listingBg }}>
          <Chips Styles={Styles} title={'Veg'} />
          <Chips Styles={Styles} title={'Non veg'} />
        </View>
      </SafeAreaView>
      <SafeAreaView>
        <ScrollView>
          <View style={Styles.cardListing}>
            {dishRecipes?.map(({ name, img, rating, code }) => {
              return (
                <CardInfo
                  code={code}
                  key={name}
                  title={name}
                  rating={rating}
                  onCardPressed={() => onCardPressed(code)}>
                  <Image style={Styles.img} source={img} />
                </CardInfo>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
