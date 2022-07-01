import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/thme.context';
import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import CardInfo from '../../shared/UI/Card/CardInfo';
import Search from '../MainCategory/components/Search';
import { useGetDishRecipeQuery } from './DishRecipes.services';
import qs from 'qs';
import { filtersEnum } from '../../constants/enum';
import NoData from '../../shared/UI/NoData/NoData';
import LoaderLayout from '../../shared/UI/LoaderLayout/LoaderLayout';
import {
  BackButton,
  CustomImage,
  CustomStatusBar,
  InfiniteScrollView,
  TopBar,
} from '../../shared';
import { PAGE_SIZE } from '../../constants/constants';
import { useRef } from 'react';

const createStyles = theme => {
  const styles = StyleSheet.create({
    containerDetailsListing: {
      padding: theme.spacing[4],
    },
    stickyTop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9,
    },
    headerAsBreadCrums: {
      height: 124,
      backgroundColor: `${theme.color.highlight1}ef`,
      display: 'flex',
      justifyContent: 'center',
    },
    headerAsBreadCrumsTitle: {
      fontSize: 24,
      fontFamily: theme.fontFamily.primaryBold,
      color: '#ffffff',
      textAlign: 'center',
      marginLeft: 8,
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
      marginTop: theme.spacing[9],
      paddingLeft: theme.spacing[3],
      paddingRight: theme.spacing[3],
    },
    listingBg: {
      backgroundColor: theme.color.pageBgColor,
    },
    cardListing: {
      display: 'flex',
      flex: 1,
      height: '100%',
      // backgroundColor: 'red',
      backgroundColor: theme.color.pageBgColor,
      paddingLeft: theme.spacing[3],
      paddingRight: theme.spacing[3],
      // paddingBottom: 200,
      // marginBottom: 200,
    },
    filterChipsContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: 16,
      backgroundColor: `${theme.color.pageBgColor}ef`,
      zIndex: 100,
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
    imgWrapper: {
      borderRadius: 12,
      overflow: 'hidden',
    },
    img: {
      width: '100%',
      height: '100%',
      minWidth: 124,
      // borderRadius: 12,
      resizeMode: 'cover',
    },
    noBreadCrumbGap: {
      marginTop: 46,
    },
  });
  return styles;
};

function Chips({ Styles, title, onPress, isSelected, value }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        onPress(value);
      }}
      style={{
        ...Styles.filterChips,
        backgroundColor: isSelected
          ? theme.color.highlight1
          : theme.color.surface,
      }}>
      <Text
        style={{
          color: isSelected ? theme.color.surface : theme.color.onSurface,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default function DishRecipesScreen({ navigation, route, ...props }) {
  const Styles = useThemeAwareObject(createStyles);

  const {
    id,
    MainCategory,
    SubCategory,
    customTitle,
    ingredient = [],
    searchText = '',
  } = route.params || {};

  const [searchValue, setSearchValue] = useState(searchText);
  const [selectedChips, setSelectedChips] = useState('');

  const [pageNumber, setPageNumber] = useState(1);

  const { data, isFetching, isLoading, fulfilledTimeStamp, ...rest } =
    useGetDishRecipeQuery(
      qs.stringify({
        mainCategory: MainCategory,
        subCategory: SubCategory,
        pageNumber,
        pageSize: PAGE_SIZE,
        searchText: searchValue,
        dishType: selectedChips,
        keywords: ingredient.SubCategory,
      }),
    );
  const [dishRecipes, setDishRecipes] = useState([]);

  React.useEffect(() => {
    if (isFetching || isLoading) return;
    if (!data?.dishRecipes?.length) return;
    setDishRecipes(prevArray => [...prevArray, ...data?.dishRecipes]);
  }, [fulfilledTimeStamp]);

  const onSearchValueChange = useCallback(val => {
    setDishRecipes([]);
    setSearchValue(val);
    setPageNumber(1);
  }, []);

  const onCardPressed = code => {
    navigation.navigate('DishRecipeDetails', {
      id,
      code,
      MainCategory,
      SubCategory,
    });
  };

  const onChipsPressed = useCallback(
    value => {
      if (value == selectedChips) return;
      setDishRecipes([]);
      setSearchValue('');
      setPageNumber(1);
      setSelectedChips(value);
    },
    [selectedChips],
  );

  const topBarCustomStyle = !searchText ? { backgroundColor: '#00000000' } : {};
  const recipesContainerSpacing = !searchText
    ? { paddingTop: 180 }
    : { paddingTop: 110 };

  return (
    <>
      <CustomStatusBar variant="primary1" />

      <TopBar navigation={navigation} style={topBarCustomStyle}>
        {!!searchText && (
          <Text numberOfLines={1} style={Styles.headerAsBreadCrumsTitle}>
            {searchText}
          </Text>
        )}
      </TopBar>
      <View style={Styles.stickyTop}>
        {!searchText && (
          <View style={Styles.headerAsBreadCrums}>
            <SafeAreaView style={Styles.searchWrapper}>
              <Search
                onSearchValueChange={onSearchValueChange}
                controlledInput
                value={searchValue}
                onClosePressed={() => setSearchValue('')}
              />
            </SafeAreaView>
          </View>
        )}
        <SafeAreaView>
          <View>
            <ScrollView
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <View
                style={{
                  ...Styles.filterChipsContainer,
                  ...(searchText ? Styles.noBreadCrumbGap : {}),
                }}>
                <Chips
                  Styles={Styles}
                  title={'All'}
                  value={''}
                  onPress={onChipsPressed}
                  isSelected={selectedChips == ''}
                />
                {Object.keys(filtersEnum).map(keyName => {
                  return (
                    <Chips
                      Styles={Styles}
                      title={filtersEnum[keyName]}
                      value={keyName}
                      key={keyName}
                      onPress={onChipsPressed}
                      isSelected={selectedChips == keyName}
                    />
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>

      <SafeAreaView
        style={{
          ...Styles.cardListing,
          ...(searchText ? Styles.noBreadCrumbGapCardListing : {}),
        }}>
        <InfiniteScrollView
          isFetching={isFetching || isLoading}
          totalRecords={data?.totalRecords}
          pageSize={PAGE_SIZE}
          pageNumber={pageNumber}
          containerStyle={{ paddingBottom: 120 }}
          onFetchNext={() => setPageNumber(pageNumber + 1)}>
          <View style={recipesContainerSpacing}>
            {dishRecipes?.map(({ name, image, rating, code }) => {
              return (
                <CardInfo
                  code={code}
                  key={code}
                  title={name}
                  rating={rating}
                  onCardPressed={() => onCardPressed(code)}>
                  <View style={Styles.imgWrapper}>
                    <CustomImage style={Styles.img} source={{ uri: image }} />
                  </View>
                </CardInfo>
              );
            })}
            {!data?.totalRecords && !isLoading && !isFetching && (
              <NoData text={'We have nothing to show here'} />
            )}
          </View>
        </InfiniteScrollView>
      </SafeAreaView>
    </>
  );
}
