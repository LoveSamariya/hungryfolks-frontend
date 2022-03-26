import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import {useState} from 'react';
import {useThemeAwareObject} from '../../hooks/themeAwareObject';
import Search from '../Recipe/components/Search';
import {vegetables, fruits} from './data.vegetables';
import {dFlex, vhCenter, w50} from '../../constants/common';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

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
      paddingVertical: theme.spacing[3],
      paddingHorizontal: theme.spacing[2],
      // flexWrap: 'wrap',
      // justifyContent: 'space-between',
      height: '100%',
      // backgroundColor: theme.color.gray1,
      marginVertical: 16,
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
      shadowOffset: {width: 0, height: 1},
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
      // display: 'flex',
      // alignItems: 'center',
      justifyContent: 'center',
      // flexDirection: 'row',
      // alignSelf: 'flex-start',
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
      paddingHorizontal: 16,
      // display: 'flex',
      // alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 46,
      textAlign: 'start',
      borderWidth: 0,
    },
    styleSelectableItemTextContainerActive: {
      // paddingLeft: 8,
      paddingRight: 42,
    },
    selectableItemText: {
      color: theme.color.onSurface,
      fontSize: 16,
      fontFamily: theme.fontFamily.secondaryMedium,
      whiteSpace: 'nowrap',
    },
    selectableItemTextActive: {
      // fontSize: 18,
      color: 'black',
      fontFamily: theme.fontFamily.secondaryBold,
    },
    selectableIteMarkable: {
      width: 36,
      height: 36,
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
    helperText: {
      color: theme.color.onSurface,
      fontFamily: theme.fontFamily.primaryRegular,
      fontSize: 18,
      // opacity: 0.5,
      // marginBottom: 15,
      backgroundColor: '#FFBC97',
      color: 'white',
      padding: 16,
    },
    goNext: {
      width: 64,
      height: 64,
      backgroundColor: '#F9B208',
      borderRadius: 64 / 2,
      position: 'absolute',
      bottom: 200,
      zIndex: 2,
      right: 16,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.6,
      shadowRadius: 2,
      elevation: 5,
    },
    ...w50,
    ...vhCenter,
  });

  return styles;
};

export default function IngredientsScreen({navigation}) {
  const Styles = useThemeAwareObject(createStyles);
  const [onIngPressed, setonIngPressed] = useState({
    vegetables: {},
    fruits: {},
  });
  const [selectedTab, setSelectedTab] = useState('Vegetables');

  const SelectableTab = ({name}) => {
    const [styleTab, setStyleTab] = useState(Styles.tabItem);

    useEffect(() => {
      if (name == selectedTab) {
        const styleObjTab = {...Styles.tabItem, ...Styles.activeTab};
        setStyleTab(styleObjTab);
      } else {
        const styleObjTab = {...Styles.tabItem};
        setStyleTab(styleObjTab);
      }
    }, [name]);

    return (
      <View style={styleTab}>
        <TouchableHighlight
          underlayColor="transperent"
          onPress={() => {
            setSelectedTab(name);
          }}>
          <Text style={Styles.tabItemText}>{name}</Text>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <>
      <Text style={Styles.helperText}>Select ingredients and get recipes</Text>
      <View style={Styles.mainContainer}>
        <View style={{...Styles.itemContainer}}>
          <View style={{width: '100%'}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                // flexDirection: 'column',
                // backgroundColor: 'blue',
              }}>
              {selectedTab == 'Vegetables' &&
                vegetables.map(item => {
                  let styleObj = {};
                  let styleObjMarkeable = {};
                  let styleSelectableItemTextContainer = {};
                  let styleSelectableItemText = {};

                  styleObj = {...styleObj, ...Styles.selectebleChip};
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

                  if (onIngPressed.vegetables[item]) {
                    styleObj = {...styleObj, ...Styles.selectebleChipActive};
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

                  return (
                    <View style={Styles.w50} key={item}>
                      <TouchableHighlight
                        underlayColor="transperent"
                        onPress={() => {
                          let obj = {
                            ...onIngPressed.vegetables,
                          };
                          if (obj[item]) {
                            delete obj[item];
                          } else {
                            obj = {...obj, [item]: !!item};
                          }
                          setonIngPressed({...onIngPressed, vegetables: obj});
                        }}>
                        <View style={styleObj}>
                          <>
                            <View style={styleObjMarkeable}></View>
                            <View style={styleSelectableItemTextContainer}>
                              <Text style={styleSelectableItemText}>
                                {item}
                              </Text>
                            </View>
                          </>
                        </View>
                      </TouchableHighlight>
                    </View>
                  );
                })}
              {selectedTab == 'Fruits' &&
                fruits.map(item => {
                  let styleObj = {};
                  let styleObjMarkeable = {};
                  let styleSelectableItemTextContainer = {};
                  let styleSelectableItemText = {};

                  styleObj = {...styleObj, ...Styles.selectebleChip};
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

                  if (onIngPressed.fruits[item]) {
                    styleObj = {...styleObj, ...Styles.selectebleChipActive};
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

                  return (
                    <View style={Styles.w50} key={item}>
                      <TouchableHighlight
                        underlayColor="transperent"
                        onPress={() => {
                          let obj = {
                            ...onIngPressed.fruits,
                          };
                          if (obj[item]) {
                            delete obj[item];
                          } else {
                            obj = {...obj, [item]: !!item};
                          }
                          setonIngPressed({...onIngPressed, fruits: obj});
                        }}>
                        <View style={styleObj}>
                          <>
                            <View style={styleObjMarkeable}></View>
                            <View style={styleSelectableItemTextContainer}>
                              <Text style={styleSelectableItemText}>
                                {item}
                              </Text>
                            </View>
                          </>
                        </View>
                      </TouchableHighlight>
                    </View>
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
        {onIngPressed.vegetables &&
          onIngPressed.fruits &&
          (Object.keys(onIngPressed.vegetables).length > 0 ||
            Object.keys(onIngPressed.fruits).length > 0) && (
            <TouchableHighlight
              underlayColor="transperent"
              onPress={() => {
                navigation.navigate('RecipeSubDetailsList', {
                  customTitle: 'From your Ingredients',
                });
              }}
              style={{...Styles.goNext}}>
              <View>
                <View
                  style={{
                    ...Styles.vhCenter,
                    height: '100%',
                    borderRadius: 84 / 2,
                  }}>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    size={36}
                    color={'#fff'}
                  />
                  {/* <FontAwesomeIcon icon={faCoffee} /> */}
                </View>
              </View>
            </TouchableHighlight>
          )}

        <View style={Styles.stickyContainer}>
          <Search placeholder={`Search ${selectedTab}`} />
          <View style={{...Styles.flexRow, ...Styles.mt2}}>
            <SelectableTab name="Vegetables" />
            <SelectableTab name="Fruits" />
          </View>
        </View>
        <View>
          <View>
            <View style={Styles.tabItems}></View>
          </View>
        </View>
      </View>
    </>
  );
}
