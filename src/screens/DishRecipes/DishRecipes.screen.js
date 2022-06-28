import React, { useCallback, useEffect, useState } from 'react';
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
import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import CardInfo from '../../shared/UI/Card/CardInfo';
import Search from '../MainCategory/components/Search';
import { useGetDishRecipeQuery } from './DishRecipes.services';
import qs from 'qs';
import { filtersEnum } from '../../constants/enum';
import NoData from '../../shared/UI/NoData/NoData';
import LoaderLayout from '../../shared/UI/LoaderLayout/LoaderLayout';
import { BackButton, InfiniteScrollView, TopBar } from '../../shared';
import { PAGE_SIZE } from '../../constants/constants';

const createStyles = theme => {
  const styles = StyleSheet.create({
    containerDetailsListing: {
      padding: theme.spacing[4],
    },
    headerAsBreadCrums: {
      height: 124,
      backgroundColor: theme.color.highlight1,
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
      height: '100%',
      // backgroundColor: 'red',
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
    noBreadCrumbGap: {
      marginTop: 56,
    },
  });
  return styles;
};

function Chips({ Styles, title, onPress, isSelected, value }) {
  const { theme } = useTheme();

  return (
    <TouchableHighlight
      underlayColor="transperent"
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
    </TouchableHighlight>
  );
}

export default function DishRecipesScreen({ navigation, route }) {
  const Styles = useThemeAwareObject(createStyles);

  const {
    id,
    MainCategory,
    SubCategory,
    customTitle,
    ingredient,
    searchText = '',
  } = route.params || {};

  const [searchValue, setSearchValue] = useState('');
  const [selectedChips, setSelectedChips] = useState('');

  const [pageNumber, setPageNumber] = useState(1);

  const { data, isFetching, isLoading } = useGetDishRecipeQuery(
    qs.stringify({ pageNumber, pageSize: PAGE_SIZE, searchText }),
  );

  const [dishRecipes, setDishRecipes] = useState([]);

  React.useEffect(() => {
    console.log('TEST-');
    // const preArray = [...dishRecipes];
    if (!data?.dishRecipes?.length) return;
    // setDishRecipes([]);
    setDishRecipes(preArray => [...preArray, ...data?.dishRecipes]);
  }, [qs.stringify(data)]);

  useEffect(() => {
    setSearchValue(searchText);
  }, [searchText]);

  const onSearchValueChange = useCallback(val => {
    setSearchValue(val);
  }, []);

  // const { dishRecipes } = data || {};

  const onCardPressed = code => {
    navigation.navigate('DishRecipeDetails', {
      id,
      code,
      MainCategory,
      SubCategory,
    });
  };

  const onChipsPressed = useCallback(value => {
    setSelectedChips(value);
    setSearchValue('');
  }, []);

  return (
    <>
      <TopBar navigation={navigation}>
        {!!searchText && (
          <Text style={Styles.headerAsBreadCrumsTitle}>{searchText}</Text>
        )}
      </TopBar>
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
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View
            style={{
              ...Styles.filterChipsContainer,
              ...Styles.listingBg,
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
      </SafeAreaView>
      <SafeAreaView style={Styles.cardListing}>
        <LoaderLayout isLoading={isLoading}>
          <InfiniteScrollView
            isFetching={isFetching}
            totalRecords={data?.totalRecords}
            pageSize={PAGE_SIZE}
            pageNumber={pageNumber}
            onFetchNext={() => setPageNumber(pageNumber + 1)}>
            {dishRecipes?.map(({ name, image, rating, code }) => {
              return (
                <CardInfo
                  code={code}
                  key={code}
                  title={name}
                  rating={rating}
                  onCardPressed={() => onCardPressed(code)}>
                  <Image style={Styles.img} source={{ uri: image }} />
                </CardInfo>
              );
            })}
            {!dishRecipes?.length && !isLoading && <NoData />}
          </InfiniteScrollView>
        </LoaderLayout>
      </SafeAreaView>
    </>
  );
}
