import React, { useEffect, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  // AsyncStorage,
} from 'react-native';
import { useState } from 'react';
import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import { vegetables, fruits } from './data.vegetables';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight, faClose } from '@fortawesome/free-solid-svg-icons';
import qs from 'qs';
import { SafeAreaView } from 'react-native-safe-area-context';

import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import Search from '../MainCategory/components/Search';
import {
  useGetIngredientMainCategoryQuery,
  useGetIngredientSubCategoryQuery,
} from './Ingredients.services';
import { vhCenter, w50 } from '../../constants/common';
import NoData from '../../shared/UI/NoData/NoData';

function SelectableIngredient({
  Styles,
  selectedTab,
  onIngPressed,
  name,
  setonIngPressed,
}) {
  let styleObj = {};
  let styleObjMarkeable = {};
  let styleSelectableItemTextContainer = {};
  let styleSelectableItemText = {};

  styleObj = { ...styleObj, ...Styles.selectebleChip };
  styleObjMarkeable = {
    ...styleObjMarkeable,
    ...Styles.selectableIteMarkable,
  };
  styleSelectableItemTextContainer = {
    ...styleSelectableItemTextContainer,
    ...Styles.selectableItemTextContainer,
  };
  styleSelectableItemText = {
    ...styleSelectableItemText,
    ...Styles.selectableItemText,
  };

  if (onIngPressed[selectedTab]?.[name]) {
    styleObj = {
      ...styleObj,
      ...Styles.selectebleChipActive,
    };
    styleObjMarkeable = {
      ...styleObjMarkeable,
      ...Styles.selectableIteMarkableActive,
    };
    styleSelectableItemTextContainer = {
      ...styleSelectableItemTextContainer,
      ...Styles.styleSelectableItemTextContainerActive,
    };
    styleSelectableItemText = {
      ...styleSelectableItemText,
      ...Styles.selectableItemTextActive,
    };
  }
  const onIngredientPressed = () => {
    let obj = {
      ...onIngPressed[selectedTab],
    };
    if (obj[name]) {
      delete obj[name];
    } else {
      obj = { ...obj, [name]: !!name };
    }
    setonIngPressed({
      ...onIngPressed,
      [selectedTab]: obj,
    });
  };

  return (
    <View style={Styles.w50} key={name}>
      <TouchableHighlight
        underlayColor="transperent"
        onPress={onIngredientPressed}>
        <View style={styleObj}>
          <>
            <View style={styleObjMarkeable}></View>
            <View style={styleSelectableItemTextContainer}>
              <Text style={styleSelectableItemText} numberOfLines={1}>
                {name}
              </Text>
            </View>
          </>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const SelectableTab = ({ name, Styles, setSelectedTab, isSelected }) => {
  const onSelectedTabPressed = () => {
    setSelectedTab(name);
  };
  return (
    <TouchableHighlight
      underlayColor="transperent"
      onPress={onSelectedTabPressed}>
      <View
        style={
          isSelected
            ? { ...Styles.tabItem, ...Styles.activeTab }
            : { ...Styles.tabItem }
        }>
        <Text style={Styles.tabItemText}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
};

const createStyles = theme => {
  const styles = StyleSheet.create({
    mainContainer: {
      height: '100%',
      backgroundColor: '#EEEDDE',
      paddingBottom: 180,
    },
    itemContainer: {
      // display: 'flex',
      // flexDirection: 'row',
      paddingHorizontal: theme.spacing[2],
      // flexWrap: 'wrap',
      // justifyContent: 'space-between',
      height: '100%',
      // backgroundColor: theme.color.gray1,
      marginHorizontal: 8,
    },
    stickyContainer: {
      backgroundColor: 'white',
      borderTopLeftRadius: 36,
      borderTopRightRadius: 36,
      paddingTop: 36,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      bottom: 56,
      left: 0,
      right: 0,
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
      elevation: 4,
    },
    tabItem: {
      marginRight: 8,
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: '#fff',
      borderRadius: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabItemText: {
      fontSize: 18,
      color: theme.color.onSurface,
      fontFamily: theme.fontFamily.primaryBold,
    },
    tabItems: {
      borderRadius: 12,
    },
    textBlack: {
      color: '#000',
    },
    flexRow: {
      flexDirection: 'row',
    },
    mt2: {
      marginTop: theme.spacing[2],
    },
    mtAuto: {
      marginTop: 'auto',
    },
    activeTab: {
      backgroundColor: theme.color.highlight,
    },
    selectebleChip: {
      justifyContent: 'center',
      borderRadius: 64 / 2,
      marginRight: 6,
      marginBottom: 8,
      backgroundColor: 'rgba(255,255,255,0.4)',
      borderRadius: 8,
      paddingLeft: 4,
    },
    selectebleChipActive: {
      backgroundColor: 'rgba(255,255,255,0.9)',
      color: theme.color.onSecondary,
      borderWidth: 0,
    },
    selectableItemTextContainer: {
      height: 46,
      paddingRight: 7,
      // display: 'flex',
      // alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 30,
      textAlign: 'start',
      borderWidth: 0,
    },
    styleSelectableItemTextContainerActive: {
      // paddingLeft: 8,
      // paddingRight: 42,
    },
    selectableItemText: {
      color: theme.color.onSurface,
      fontSize: 16,
      fontFamily: theme.fontFamily.primaryRegular,
    },
    selectableItemTextActive: {
      color: 'black',
      fontFamily: theme.fontFamily.primaryRegular,
    },
    selectableIteMarkable: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: '#f2f3f4',
      backgroundColor: theme.color.gray1,
      borderRadius: 64 / 2,
      position: 'absolute',
      left: 6,
      zIndex: 1,
    },

    selectableIteMarkableActive: {
      // display: 'none',
      // opacity: 0,
      backgroundColor: '#028000',
    },
    helperTextRow: {
      backgroundColor: theme.color.highlight1,
      flexDirection: 'row',
      padding: 16,
    },
    helperText: {
      color: theme.color.onSurface,
      fontFamily: theme.fontFamily.primaryRegular,
      fontSize: 18,
      // opacity: 0.5,
      // marginBottom: 15,
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    goNext: {
      width: 64,
      height: 64,
      backgroundColor: theme.color.highlight1,
      borderRadius: 64 / 2,
      position: 'absolute',
      bottom: 200,
      zIndex: 2,
      right: 16,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.6,
      shadowRadius: 2,
      elevation: 5,
    },
    clearIngredientsContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      marginLeft: 8,
    },
    clearIngredientsIconContainer: {
      backgroundColor: '#fff',
      borderRadius: 84 / 2,
      padding: 4,
      zIndex: 1,
    },
    clearIngredientsText: {
      marginLeft: 6,
      borderRadius: 12,
      color: theme.color.gray3,
    },
    ...w50,
    ...vhCenter,
  });

  return styles;
};

export default function IngredientsScreen({ navigation }) {
  const Styles = useThemeAwareObject(createStyles);
  const [onIngPressed, setonIngPressed] = useState({});
  const [selectedTab, setSelectedTab] = useState('');
  const [selectedTabName, setSelectedTabName] = useState('');
  const [searchVal, setSearchValue] = useState('');

  const { data: dataIngMainCategory } = useGetIngredientMainCategoryQuery('');

  const { data: dataSubCategory, isLoading } = useGetIngredientSubCategoryQuery(
    qs.stringify({
      IngredientMainCategory: selectedTab,
      searchText: searchVal,
    }),
  );

  const { ingredientMainCategories } = dataIngMainCategory || {};
  const { ingredientSubCategories } = dataSubCategory || {};

  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    if (!ingredientMainCategories?.length) return;
    setSelectedTabName(ingredientMainCategories[0]?.name);
    setSelectedTab(ingredientMainCategories[0]?.name);
  }, [ingredientMainCategories?.length]);
  // const localStorage = {
  //   async getItem(key) {
  //     try {
  //       const value = await AsyncStorage.getItem(key);
  //       if (value !== null) {
  //         // We have data!!
  //         return value;
  //       }
  //     } catch (error) {
  //       // Error retrieving data
  //     }
  //   },
  //   async setItem(key, value) {
  //     try {
  //       const data = await AsyncStorage.setItem(key, value);
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  // };
  useEffect(() => {
    setSearchValue('');
  }, [selectedTab]);
  // const saveIngredient = () => {
  //   console.log(onIngPressed, 'SAVED');
  //   localStorage.setItem('selectedIng', JSON.stringify(onIngPressed));
  // };
  // useEffect(() => {
  //   localStorage.getItem('selectedIng').then(val => {
  //     console.log(JSON.parse(val), 'LOADERD');
  //     if (val) setonIngPressed(JSON.parse(val));
  //   });
  //   return () => {};
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setSelectedTab(selectedTabName);
    });
  }, [selectedTabName]);

  const onSearchValueChange = useCallback(val => {
    setSearchValue(val);
  }, []);

  const onClosePressed = useCallback(() => {
    setSearchValue('');
  });

  const clearAllSelectedIngredients = useCallback(() => {
    setonIngPressed({});
  });

  const isIngredientSelected = Object.values(onIngPressed).find(
    obj => Object.keys(obj)?.length,
  );
  return (
    <>
      <View style={{ ...Styles.helperTextRow, ...vhCenter }}>
        <FontAwesomeIcon color="white" icon={faListCheck} size={24} />
        <Text style={Styles.helperText}>
          {' '}
          Select ingredients and get recipes
        </Text>
      </View>

      <View style={Styles.mainContainer}>
        {isIngredientSelected && (
          <TouchableHighlight
            style={Styles.clearIngredientsContainer}
            underlayColor="transperent"
            onPress={clearAllSelectedIngredients}>
            <>
              <View style={Styles.clearIngredientsIconContainer}>
                <FontAwesomeIcon icon={faClose} size={24} color={'#878787'} />
              </View>
              <Text style={Styles.clearIngredientsText}>
                Clear All Selected Ingredients
              </Text>
            </>
          </TouchableHighlight>
        )}
        <SafeAreaView>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={{ ...Styles.itemContainer }}>
              <View style={{ width: '100%' }}>
                {!ingredientSubCategories?.length && !isLoading && <NoData />}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 16,
                    marginBottom: 140,
                  }}>
                  {ingredientSubCategories &&
                    ingredientSubCategories?.map(({ name }) => {
                      return (
                        <SelectableIngredient
                          key={name}
                          Styles={Styles}
                          selectedTab={selectedTab}
                          onIngPressed={onIngPressed}
                          setonIngPressed={arg => {
                            setonIngPressed(arg);
                            // saveIngredient(arg);
                          }}
                          name={name}
                        />
                      );
                    })}
                </View>
              </View>

              {/* <View style={Styles.mtAuto}>
            <Text style={Styles.helperText}>
              Select ingredients and get recipes...
            </Text>
          </View> */}
            </View>
          </ScrollView>
        </SafeAreaView>
        {isIngredientSelected && (
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('DishRecipe', {
                customTitle: 'From your Ingredients',
                ingredient: {
                  MainCategory: Object.keys(onIngPressed).reduce(
                    (prev, current) => {
                      return [...prev, current];
                    },
                    [],
                  ),
                  SubCategory: Object.keys(onIngPressed).reduce(
                    (prev, current) => {
                      return [...prev, ...Object.keys(onIngPressed[current])];
                    },
                    [],
                  ),
                },
              });
            }}
            style={{ ...Styles.goNext }}>
            <View>
              <View
                style={{
                  ...Styles.vhCenter,
                  height: '100%',
                  borderRadius: 84 / 2,
                }}>
                <FontAwesomeIcon icon={faAngleRight} size={36} color={'#fff'} />
                {/* <FontAwesomeIcon icon={faCoffee} /> */}
              </View>
            </View>
          </TouchableHighlight>
        )}

        <SafeAreaView style={Styles.stickyContainer}>
          <View>
            <Search
              placeholder={`Search ${selectedTab}`}
              onSearchValueChange={onSearchValueChange}
              value={searchVal}
              onClosePressed={onClosePressed}
              controlledInput
            />
            <View
              style={{
                ...Styles.flexRow,
                ...Styles.mt2,
                marginHorizontal: -16,
              }}>
              <ScrollView
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <View
                  style={{
                    paddingHorizontal: 16,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  {ingredientMainCategories?.map(({ name }) => {
                    return (
                      <SelectableTab
                        name={name}
                        key={name}
                        selectedTab={selectedTabName}
                        Styles={Styles}
                        setSelectedTab={setSelectedTabName}
                        isSelected={name == selectedTabName}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
        <View>
          <View>
            <View style={Styles.tabItems}></View>
          </View>
        </View>
      </View>
    </>
  );
}
