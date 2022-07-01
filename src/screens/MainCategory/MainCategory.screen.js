import {
  faTableList,
  faBars,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useCallback, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableHighlight,
  Alert,
  Text,
  TouchableOpacity,
  AppState,
} from 'react-native';

import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import Card from '../../shared/UI/Card/Card';
import { Heading1 } from '../../shared/UI/TypoGraphy/Typography';
import Search from './components/Search';
import {
  useGetKeywordQuery,
  useGetMainCategoryQuery,
} from './recipes.services';
import qs from 'qs';
import NoData from '../../shared/UI/NoData/NoData';
import {
  CustomImage,
  CustomStatusBar,
  InfiniteScrollView,
  LoaderLayout,
} from '../../shared';
import { useTheme } from '../../context/thme.context';
import { PAGE_SIZE } from '../../constants/constants';
import { numberOfPages } from '../../shared/helperFunctions';
import { keywordExplain, keywordTypes } from '../../constants/enum';
import {
  alignItemsCenter,
  dFlex,
  flexRow,
  justifyContentCenter,
} from '../../constants/common';

const createStyles = theme => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.pageBgColor,
      color: theme.color.onSurface,
      paddingHorizontal: theme.spacing[5],
      fontFamily: 'RobotoCondensed-Bold',
    },
    stickyHeader: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      zIndex: 9,
      paddingHorizontal: theme.spacing[5],
      top: 0,
      paddingTop: theme.spacing[4],
      paddingBottom: theme.spacing[2],
      backgroundColor: `${theme.color.pageBgColor}ea`,
    },
    bottomGap: {
      marginBottom: 0,
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
    text: {
      color: theme.color.onPrimary,
      fontSize: 14,
    },
    headingGap: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing[7],
      marginBottom: theme.spacing[3],
    },
    img: {
      maxWidth: '100%',
      height: '100%',
    },
    onSurface: {
      color: theme.color.onSurface,
    },
    headingIcon: {
      marginRight: theme.spacing[2],
    },
    searchChipsTitle: {
      fontSize: 18,
    },
    searchChipsSubtitle: {
      color: theme.color.gray3,
    },
    ...dFlex,
    ...alignItemsCenter,
    ...justifyContentCenter,
    ...flexRow,
  });
  return styles;
};

export default function MainCategoryScreen({ navigation }) {
  const Styles = useThemeAwareObject(createStyles);
  const { theme } = useTheme();

  const [mainCategories, setMainCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [globalSearchText, setGlobalSearchText] = useState(undefined);
  const [isSearching, setIsSearching] = useState(false);
  const [mainCategorySearchText, setMainCategorySearchText] = useState(null);

  const { data, isLoading, isFetching, fulfilledTimeStamp, ...rest } =
    useGetMainCategoryQuery(
      qs.stringify({
        pageNumber,
        pageSize: PAGE_SIZE,
        searchText: mainCategorySearchText,
      }),
    );

  const {
    data: dataSearch,
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch,
  } = useGetKeywordQuery(
    qs.stringify({
      pageNumber,
      pageSize: PAGE_SIZE,
      searchText: globalSearchText,
    }),
    { skip: !globalSearchText },
  );

  // Push latest data in mainCategories array on fetch succeed
  const onMainCategoryDataFetch = () => {
    if (isFetching || isLoading) return;
    const preArray = [...mainCategories];
    if (!data?.mainCategories?.length) return;
    setMainCategories([...preArray, ...data?.mainCategories]);
  };

  React.useEffect(onMainCategoryDataFetch, [fulfilledTimeStamp]);

  const resetMainCategories = () => {
    setMainCategorySearchText('');
    setMainCategories([]);
    setPageNumber(1);
  };
  // Manage Searching ui state on global search changes
  const onGlobalSearchChange = () => {
    if (globalSearchText === undefined) return;
    if (globalSearchText) {
      setIsSearching(true); // show search chips
    } else {
      setIsSearching(false); // show main categories

      if (mainCategorySearchText) resetMainCategories(); // reset Main categories if user has selected main category
    }
  };

  React.useEffect(onGlobalSearchChange, [globalSearchText]);

  const onCardPressed = (id, name) => {
    navigation.navigate('SubCategory', {
      id,
      name,
    });
  };

  const onSearchValueChange = val => {
    setGlobalSearchText(val);
  };

  const onMainCategoryResultPress = searchResult => {
    setIsSearching(false);
    if (mainCategorySearchText == searchResult) return;
    setMainCategories([]);
    setPageNumber(1);
    setMainCategorySearchText(searchResult);
  };

  const onDishRecipeResultPress = searchResult => {
    navigation.navigate('DishRecipe', { searchText: searchResult });
  };

  const onSearchResultPress = ({ result, type }) => {
    switch (type) {
      case keywordTypes.mainCategory:
        return onMainCategoryResultPress(result);
      case keywordTypes.dishRecipe:
        return onDishRecipeResultPress(result);
      default:
        break;
    }
  };

  return (
    <>
      <CustomStatusBar variant="pageBg" />
      <SafeAreaView style={Styles.stickyHeader}>
        <View style={{ flex: 1 }}>
          <Search
            placeholder="Search for categories & recipes..."
            onSearchValueChange={onSearchValueChange}
          />
        </View>
        <View style={{ marginLeft: 8 }}>
          <TouchableHighlight
            underlayColor="transperent"
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <FontAwesomeIcon
              icon={faBars}
              fill={theme.color.highlight1}
              size={24}
            />
          </TouchableHighlight>
        </View>
      </SafeAreaView>

      <SafeAreaView style={Styles.container}>
        <View style={Styles.bottomGap}>
          {!isSearching && (
            <InfiniteScrollView
              disabled={globalSearchText}
              isFetching={isFetching}
              totalRecords={data?.totalRecords}
              pageSize={PAGE_SIZE}
              pageNumber={pageNumber}
              onFetchNext={() => setPageNumber(pageNumber + 1)}
              containerStyle={{ paddingBottom: 64, paddingTop: 64 }}>
              <>
                <>
                  <View style={Styles.headingGap}>
                    <FontAwesomeIcon
                      icon={faTableList}
                      size={24}
                      style={{ ...Styles.onSurface, ...Styles.headingIcon }}
                    />
                    <Heading1>Main categories</Heading1>
                  </View>
                  <View style={Styles.row}>
                    {mainCategories?.map(({ name, id, image }, index) => {
                      return (
                        <View style={Styles.col} key={`${id}${index}`}>
                          <Card
                            title={name}
                            onCardPressed={() => onCardPressed(id, name)}>
                            <CustomImage
                              style={Styles.img}
                              source={{ uri: image }}
                            />
                          </Card>
                        </View>
                      );
                    })}
                  </View>
                  {!data?.mainCategories?.length &&
                    !data?.totalRecords &&
                    !isFetching &&
                    !isLoading && (
                      <NoData
                        text={`We found nothing in the Main category / Dishes related to your search : ${globalSearchText}`}
                      />
                    )}
                </>
              </>
            </InfiniteScrollView>
          )}
          {isSearching && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <View style={{ marginTop: 84 }}>
                <LoaderLayout isLoading={isLoadingSearch || isFetchingSearch}>
                  {dataSearch?.map(({ result, type }, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => onSearchResultPress({ result, type })}
                        key={index}
                        style={{
                          borderColor: 'red',
                          marginBottom: 8,
                          backgroundColor: 'white',
                          paddingHorizontal: 24,
                          paddingVertical: 8,
                          borderRadius: 12,
                        }}>
                        <Text
                          style={{
                            ...Styles.text,
                            ...Styles.onSurface,
                            ...Styles.searchChipsTitle,
                          }}>
                          {result}
                        </Text>
                        <View
                          style={{
                            ...Styles.dFlex,
                            ...Styles.alignItemsCenter,
                            ...Styles.flexRow,
                          }}>
                          <Text
                            style={{
                              ...Styles.text,
                              ...Styles.searchChipsSubtitle,
                            }}>
                            {keywordExplain[type]}
                          </Text>
                          <FontAwesomeIcon
                            icon={faAngleRight}
                            size={12}
                            color={theme.color.gray3}
                            style={{ marginTop: 3, marginLeft: 4 }}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                  {!dataSearch?.length &&
                    !isFetchingSearch &&
                    !isLoadingSearch && (
                      <NoData
                        text={`We found nothing in the \n Main category / Dishes \n related to your search`}
                      />
                    )}
                </LoaderLayout>
              </View>
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
