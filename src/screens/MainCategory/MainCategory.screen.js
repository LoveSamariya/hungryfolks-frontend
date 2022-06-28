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
      padding: theme.spacing[5],
      fontFamily: 'RobotoCondensed-Bold',
    },
    bottomGap: {
      marginBottom: 42,
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
  const [isGlobalSearchActive, setIsGlobalSearchActive] = useState(false);
  const [mainCategorySearchText, setMainCategorySearchText] = useState(null);

  const { data, isLoading, isFetching } = useGetMainCategoryQuery(
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

  React.useEffect(() => {
    const preArray = [...mainCategories];
    if (!data?.mainCategories?.length) return;
    setMainCategories([]);
    setMainCategories([...preArray, ...data?.mainCategories]);
  }, [qs.stringify(data)]);

  React.useEffect(() => {
    if (globalSearchText && !isGlobalSearchActive) {
      setIsGlobalSearchActive(true);
      setMainCategories([]);
    } else if (!globalSearchText && isGlobalSearchActive) {
      setIsGlobalSearchActive(false);
    }
    // else if (!isGlobalSearchActive) {
    //   console.log('Global search------------------------------');
    //   setMainCategories([]);
    //   setMainCategorySearchText('');
    // }
  }, [globalSearchText, isGlobalSearchActive]);

  const onCardPressed = (id, name) => {
    navigation.navigate('SubCategory', {
      id,
      name,
    });
  };

  const onSearchValueChange = val => {
    console.log('////', val);
    if (val) {
      setGlobalSearchText(val);
    } else {
      setMainCategorySearchText('');
      setGlobalSearchText('');
    }
  };

  const handleMainCategorySearchPress = searchResult => {
    setMainCategorySearchText(searchResult);
    setGlobalSearchText('');
    setIsGlobalSearchActive(false);
  };

  const handleDishRecipeSearchPress = useCallback(searchResult => {
    navigation.navigate('DishRecipe', { searchText: searchResult });
  }, []);

  const searchResultPressHandlers = React.useMemo(
    () => ({
      [keywordTypes.mainCategory]: handleMainCategorySearchPress,
      [keywordTypes.dishRecipe]: handleDishRecipeSearchPress,
    }),
    [],
  );

  const handleSearchResultPress = ({ result, type }) => {
    const searchResultPressHandler = searchResultPressHandlers[type];
    searchResultPressHandler && searchResultPressHandler(result);
  };

  return (
    <>
      <CustomStatusBar variant="primary" />

      <SafeAreaView style={Styles.container}>
        <View style={Styles.bottomGap}>
          <View style={{ paddingBottom: 8 }}>
            <SafeAreaView
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{ flex: 1 }}>
                <Search
                  placeholder="Search categories"
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
          </View>
          <InfiniteScrollView
            disabled={!!dataSearch?.length}
            isFetching={isFetching}
            totalRecords={data?.totalRecords}
            pageSize={PAGE_SIZE}
            pageNumber={pageNumber}
            onFetchNext={() => setPageNumber(pageNumber + 1)}>
            <View style={{ paddingBottom: 64 }}>
              <LoaderLayout isLoading={isLoading}>
                {!isGlobalSearchActive && (
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
                              <Image
                                style={Styles.img}
                                source={{ uri: image }}
                              />
                            </Card>
                          </View>
                        );
                      })}
                    </View>
                    {!mainCategories?.length && !isFetching && <NoData />}
                  </>
                )}
                {isGlobalSearchActive &&
                  dataSearch?.map(({ result, type }, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          handleSearchResultPress({ result, type })
                        }
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
              </LoaderLayout>
            </View>
          </InfiniteScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
