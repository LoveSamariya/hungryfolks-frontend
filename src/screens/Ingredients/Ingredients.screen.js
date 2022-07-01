import React, { useEffect, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import Toast from 'react-native-simple-toast';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight, faClose } from '@fortawesome/free-solid-svg-icons';
import qs from 'qs';
import { SafeAreaView } from 'react-native-safe-area-context';

import { faListCheck, faSave } from '@fortawesome/free-solid-svg-icons';
import Search from '../MainCategory/components/Search';
import {
  useGetIngredientMainCategoryQuery,
  useGetIngredientSubCategoryQuery,
} from './Ingredients.services';
import { dFlex, flexRow, vhCenter, w50 } from '../../constants/common';
import NoData from '../../shared/UI/NoData/NoData';
import { AuthModal, CustomStatusBar, LoaderLayout } from '../../shared';
import { useCommonStyle } from '../../hooks/commonStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserInfoHook } from '../../hooks/userInfoHook';
import { setCallbackSession } from '../../services/auth/auth.slice';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

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
      paddingBottom: 130,
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
      bottom: 0,
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
      position: 'absolute',
      backgroundColor: `${theme.color.highlight1}ef`,
      flexDirection: 'row',
      padding: 16,
      left: 0,
      right: 0,
      top: 0,
      zIndex: 9,
    },
    helperText: {
      color: theme.color.onSurface,
      fontFamily: theme.fontFamily.primaryRegular,
      fontSize: 18,
      // opacity: 0.5,
      // marginBottom: 15,
      color: 'white',
    },
    goNext: {
      width: 64,
      height: 64,
      backgroundColor: theme.color.highlight1,
      borderRadius: 64 / 2,
      position: 'absolute',
      bottom: 142,
      zIndex: 2,
      right: 16,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.6,
      shadowRadius: 2,
      elevation: 5,
    },
    clearIngredientsContainer: {
      position: 'absolute',
      top: 53,
      zIndex: 9,
      left: 0,
      right: 0,
      backgroundColor: `#EEEDDEEF`,
    },
    clearIngredientsButton: {
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
    ...dFlex,
    ...flexRow,
  });

  return styles;
};

async function getObjectClientSide(handle) {
  const totalEntries = await AsyncStorage.getItem(`${handle}__TOTAL_RECORDS`);
  let multiGetPayLoad = [...new Array(+totalEntries)];
  multiGetPayLoad = multiGetPayLoad.map((_, index) => {
    const key = `${handle}__${index}`;
    return key;
  });
  const valuesAsEntries = await AsyncStorage.multiGet(multiGetPayLoad);
  const valuesAsObj = Object.fromEntries(valuesAsEntries);
  const storedData = Object.fromEntries(
    Object.values(valuesAsObj).map(x => JSON.parse(x)),
  );
  return storedData;
}

async function storeObjectClientSide(obj, handle) {
  try {
    const objectEntries = Object.entries(obj);
    const totalEntries = objectEntries.length;
    await AsyncStorage.setItem(`${handle}__TOTAL_RECORDS`, '' + totalEntries);
    if (!objectEntries.length) return;
    let multiSetPayload = [...new Array(totalEntries)];
    multiSetPayload = multiSetPayload.map((_, index) => {
      const key = `${handle}__${index}`;
      return [key, JSON.stringify(objectEntries[index])];
    });
    let d = new Date();
    await AsyncStorage.multiSet([...multiSetPayload]);
    d = new Date();
    const v = await getObjectClientSide(handle);
    d = new Date();
  } catch (e) {
    // console.log(e);
    //save error
  }
}

export default function IngredientsScreen({ navigation }) {
  const dispatch = useDispatch();
  const Styles = useThemeAwareObject(createStyles);
  const commonStyle = useCommonStyle();
  const user = useUserInfoHook();
  const isLoggedIn = !!Object.keys(user).length;
  const [onIngPressed, setonIngPressed] = useState({});
  const [selectedTab, setSelectedTab] = useState('');
  const [selectedTabName, setSelectedTabName] = useState('');
  const [searchVal, setSearchValue] = useState('');
  const [isSavedSelection, setIsSavedSelection] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: dataIngMainCategory,
    isFetching: isFetchingMainCategory,
    isLoading: isLoadingMainCategory,
  } = useGetIngredientMainCategoryQuery('');

  const {
    data: dataSubCategory,
    isFetching: isFetchingSubCategory,
    isLoading: isLoadingSubCategory,
  } = useGetIngredientSubCategoryQuery(
    qs.stringify({
      IngredientMainCategory: selectedTab,
      searchText: searchVal,
    }),
    {
      skip: !selectedTab,
    },
  );
  const { ingredientMainCategories } = dataIngMainCategory || {};
  const { ingredientSubCategories } = dataSubCategory || {};

  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    if (!ingredientMainCategories?.length) return;
    setSelectedTabName(ingredientMainCategories[0]?.name);
    setSelectedTab(ingredientMainCategories[0]?.name);
  }, [ingredientMainCategories?.length]);

  useEffect(() => {
    setSearchValue('');
  }, [selectedTab]);

  useEffect(() => {
    const getAsyncIngredientData = async () => {
      try {
        let d = new Date();
        const v = await getObjectClientSide('INGREDIENT');
        setonIngPressed(v);
      } catch (e) {
        // console.log(e);
      }
    };
    getAsyncIngredientData();
  }, []);

  useEffect(() => {
    if (!selectedTabName) return;
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
    setIsSavedSelection(false);
  });

  const handleSaveSelection = () => {
    if (!isLoggedIn) {
      setModalVisible(true);
      return;
    }
    storeObjectClientSide(onIngPressed, 'INGREDIENT').then(() => {
      Toast.show('Your selection has been saved!', Toast.SHORT);
      setIsSavedSelection(true);
    });
  };

  const isIngredientSelected = Object.values(onIngPressed).find(
    obj => Object.keys(obj)?.length,
  );
  return (
    <>
      <CustomStatusBar variant="primary1" />
      <View style={{ ...Styles.helperTextRow }}>
        <FontAwesomeIcon color="white" icon={faListCheck} size={24} />
        <Text style={Styles.helperText}> Select ingredients</Text>
        {isIngredientSelected && !isSavedSelection && (
          <TouchableOpacity
            onPress={handleSaveSelection}
            activeOpacity={0.8}
            style={{
              ...commonStyle.mlAuto,
              ...vhCenter.vhCenter,
              ...Styles.flexRow,
            }}>
            <>
              <FontAwesomeIcon color="white" icon={faSave} size={24} />
              <Text
                style={{
                  ...Styles.helperText,
                  ...vhCenter.vhCenter,
                  ...commonStyle.ml1,
                }}>
                Save selection
              </Text>
            </>
          </TouchableOpacity>
        )}
      </View>

      <View style={Styles.mainContainer}>
        {isIngredientSelected &&
          !!ingredientSubCategories?.length &&
          !isFetchingSubCategory &&
          !!selectedTab && (
            <View style={Styles.clearIngredientsContainer}>
              <TouchableOpacity
                underlayColor="transperent"
                onPress={clearAllSelectedIngredients}
                style={Styles.clearIngredientsButton}>
                <>
                  <View style={Styles.clearIngredientsIconContainer}>
                    <FontAwesomeIcon
                      icon={faClose}
                      size={24}
                      color={'#878787'}
                    />
                  </View>
                  <Text style={Styles.clearIngredientsText}>Clear All</Text>
                </>
              </TouchableOpacity>
            </View>
          )}
        <SafeAreaView>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={{ ...Styles.itemContainer }}>
              <View style={{ width: '100%' }}>
                <LoaderLayout
                  isLoading={isFetchingSubCategory || selectedTab == null}>
                  {!ingredientSubCategories?.length &&
                    !isFetchingSubCategory &&
                    !!selectedTab && (
                      <NoData
                        style={{ marginTop: 36 }}
                        text={`Oops! It's something that's not available. \n \n  Try something different`}
                      />
                    )}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginTop: 105,
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
                              setIsSavedSelection(false);
                              setonIngPressed(arg);
                              // saveIngredient(arg);
                            }}
                            name={name}
                          />
                        );
                      })}
                  </View>
                </LoaderLayout>
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
        <AuthModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
        />
        <View>
          <View>
            <View style={Styles.tabItems}></View>
          </View>
        </View>
      </View>
    </>
  );
}
