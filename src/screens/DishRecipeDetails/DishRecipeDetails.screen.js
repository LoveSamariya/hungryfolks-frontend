import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useWindowDimensions } from 'react-native';

import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { Rating } from 'react-native-ratings';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  dFlex,
  flexColumn,
  flexRow,
  flexWrap,
  justifyContentCenter,
  textCenter,
  vhCenter,
  w100,
} from '../../constants/common';
import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import { useGetDishRecipeFromCodeQuery } from './dishRecipeDetails.services';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import LoaderLayout from '../../shared/UI/LoaderLayout/LoaderLayout';
// import {WebView} from 'react-native';

function TableListData({ styles: Styles, title, info, icon }) {
  return (
    <View style={Styles.infoTableItem}>
      <View
        style={{
          ...Styles.dFlex,
          ...justifyContentCenter.justifyContentCenter,
        }}>
        <View>
          <Text
            style={{
              ...Styles.tableHeadingInfo,
              ...Styles.onSurface,
              ...Styles.textCenter,
              ...Styles.greyText,
            }}>
            {title}
          </Text>
        </View>

        <View>
          <Text
            style={{
              ...Styles.tableHeading,
              ...Styles.onSurface,
              ...Styles.textCenter,
              ...Styles.w100,
            }}>
            {info}
          </Text>
        </View>
      </View>
    </View>
  );
}

const createStyles = theme => {
  const styles = StyleSheet.create({
    pageBgColor: {
      backgroundColor: theme.color.gray4,
    },
    box: {
      backgroundColor: theme.color.surface,
      padding: 16,
      borderRadius: 12,
      ...theme.box.shadowProp,
    },
    chips: {
      backgroundColor: theme.color.surface,
      paddingVertical: 4,
      paddingHorizontal: 24,
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      marginTop: 4,
      marginRight: 4,
    },
    selectebleChip: {
      justifyContent: 'center',
      borderRadius: 64 / 2,
      backgroundColor: 'rgb(255,255,255)',
    },
    keywordsText: {
      fontFamily: theme.fontFamily.primaryBold,
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
      fontFamily: theme.fontFamily.secondaryMedium,
      textAlign: 'center',
    },
    headerCaption: {
      fontSize: 14,
      fontFamily: theme.fontFamily.secondaryMedium,
      textAlign: 'center',
    },
    opacityText: {
      opacity: 0.9,
    },
    detailImageContainer: {
      maxWidth: '100%',
      height: 224,
      paddingBottom: 4,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 0,
      marginTop: -64,
    },
    detailedImage: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
    },
    onSurface: {
      color: theme.color.onSurface,
    },
    greyText: {
      color: theme.color.gray3,
    },
    container: {
      padding: 16,
      marginBottom: 46,
      height: '100%',
    },
    detailHeading: {
      fontFamily: theme.fontFamily.secondaryBold,
      fontSize: 36,
    },
    mtHeadingTiny: {
      marginTop: theme.spacing[3],
    },
    mbHeadingTiny: {
      marginBottom: theme.spacing[3],
    },
    mtDetail: {
      marginTop: theme.spacing[6],
    },
    mbDetail: {
      marginBottom: theme.spacing[6],
    },
    ratingGap: {
      marginTop: theme.spacing[12],
    },
    infoTable: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    infoTableColumn: {
      maxWidth: '50%',
      width: '100%',
      paddingLeft: 16,
      paddingRight: 16,
      border: 1,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    infoTableItem: {
      display: 'flex',
      flexDirection: 'row',
      padding: 16,
      // borderTopColor: 'red',
      // borderTopWidth: 2,
      // borderStyle: 'dashed',
      ...vhCenter.vhCenter,
    },
    textBlack: {
      color: theme.color.onSurface,
    },
    tableHeadingInfo: {
      fontSize: 14,
      fontFamily: theme.fontFamily.primaryRegular,
    },
    tableHeading: {
      width: '100%',
      fontSize: 18,
      // textTransform: 'uppercase',
      display: 'flex',
      flex: 1,
      fontFamily: theme.fontFamily.primaryRegular,
    },
    detailsListHeading: {
      marginTop: 48,
      marginBottom: 16,
      fontSize: 24,
      fontFamily: theme.fontFamily.primaryBold,
    },
    divider: {
      height: 1,
      backgroundColor: theme.color.gray4,
    },
    mxN3: {
      marginLeft: -16,
      marginRight: -16,
    },
    halfColumn: {
      width: '50%',
    },
    py2: {
      paddingTop: theme.spacing[2],
      paddingBottom: theme.spacing[2],
    },
    infoTextFontFamily: {
      fontFamily: theme.fontFamily.primaryRegular,
    },
    ...dFlex,
    ...flexColumn,
    ...flexWrap,
    ...flexRow,
    ...textCenter,
    ...w100,
  });
  return styles;
};
const systemFonts = [...defaultSystemFonts, 'serif'];

export default function DishRecipeDetails({ route }) {
  const { code } = route.params;

  const { data, error, isLoading } = useGetDishRecipeFromCodeQuery(code);
  const { width } = useWindowDimensions();

  const {
    name,
    description,
    mainCategory,
    subCategory,
    calories,
    cookingTime,
    instructions,
    carbohydrates,
    fat,
    protein,
    sugar,
    dishType,
    restingTime,
    image,
    ingredients,
    notes,
    keywords,
  } = data || {};

  const Styles = useThemeAwareObject(createStyles);
  const renderHtmlElementStyle = {
    color: '#000000',
    marginBottom: 24,
    paddingLeft: 16,
    fontFamily: "'Roboto Condensed', sans-serif",
    fontSize: 16,
    fontWeight: '500',
  };
  const renderHtmlStyle = {
    li: renderHtmlElementStyle,
    p: renderHtmlElementStyle,
    h1: renderHtmlElementStyle,
    h2: renderHtmlElementStyle,
    h3: renderHtmlElementStyle,
    h4: renderHtmlElementStyle,
    h5: renderHtmlElementStyle,
    h6: renderHtmlElementStyle,
    span: renderHtmlElementStyle,
    div: renderHtmlElementStyle,
  };
  return (
    <>
      <SafeAreaView style={Styles.pageBgColor}>
        <ScrollView style={{ height: '100%' }}>
          <View style={Styles.headerAsBreadCrums}></View>
          <View>
            <LoaderLayout isLoading={isLoading}>
              <View>
                <View style={Styles.detailImageContainer}>
                  <Image style={Styles.detailedImage} source={{ uri: image }} />
                </View>
                <View style={Styles.container}>
                  <Text
                    style={{ ...Styles.onSurface, ...Styles.detailHeading }}>
                    {name}
                  </Text>
                  {/* <Text style={Styles.onSurface}>
                {mainCategory} / {subCategory}
              </Text> */}
                  <Text
                    style={{
                      ...Styles.onSurface,
                      ...Styles.mbDetail,
                      ...Styles.infoTextFontFamily,
                    }}>
                    {description}
                  </Text>

                  {keywords?.length > 0 && (
                    <View
                      style={{
                        ...Styles.dFlex,
                        ...Styles.flexRow,
                        ...Styles.flexWrap,
                      }}>
                      {keywords.map(nameOfKeywords => {
                        return (
                          <View
                            key={nameOfKeywords}
                            style={{
                              ...Styles.chips,
                            }}>
                            <View style={Styles.selectebleChip}>
                              <Text
                                style={{
                                  ...Styles.onSurface,
                                  ...Styles.keywordsText,
                                }}>
                                {nameOfKeywords}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  )}

                  <View style={{ ...Styles.box, ...Styles.mtHeadingTiny }}>
                    <View style={Styles.infoTable}>
                      {subCategory && (
                        <View style={Styles.infoTableColumn}>
                          <TableListData
                            styles={Styles}
                            title={'Course'}
                            info={subCategory}
                          />
                        </View>
                      )}
                      {mainCategory && (
                        <View style={Styles.infoTableColumn}>
                          <TableListData
                            styles={Styles}
                            title={'Cuisine'}
                            info={mainCategory}
                          />
                        </View>
                      )}

                      {subCategory && mainCategory && (
                        <View
                          style={{
                            ...Styles.w100,
                          }}>
                          <View
                            style={{
                              ...Styles.divider,
                              ...Styles.mxN3,
                            }}></View>
                        </View>
                      )}

                      {dishType && (
                        <View style={Styles.infoTableColumn}>
                          <TableListData
                            styles={Styles}
                            title={'Dish type'}
                            info={dishType}
                          />
                        </View>
                      )}

                      {calories && (
                        <View style={Styles.infoTableColumn}>
                          <TableListData
                            styles={Styles}
                            title={'Calories'}
                            info={calories}
                          />
                        </View>
                      )}

                      {calories && dishType && (
                        <View
                          style={{
                            ...Styles.w100,
                          }}>
                          <View
                            style={{
                              ...Styles.divider,
                              ...Styles.mxN3,
                            }}></View>
                        </View>
                      )}

                      {cookingTime && (
                        <View style={Styles.infoTableColumn}>
                          <TableListData
                            styles={Styles}
                            title={'Cooking time'}
                            info={cookingTime}
                          />
                        </View>
                      )}

                      {restingTime && (
                        <View style={Styles.infoTableColumn}>
                          <TableListData
                            styles={Styles}
                            title={'Resting time'}
                            info={restingTime}
                          />
                        </View>
                      )}
                    </View>
                  </View>

                  {ingredients && (
                    <>
                      <Text
                        style={{
                          ...Styles.onSurface,
                          ...Styles.detailsListHeading,
                        }}>
                        Ingredients
                      </Text>
                      {console.log(ingredients)}
                      <View style={Styles.box}>
                        <RenderHtml
                          contentWidth={width}
                          systemFonts={systemFonts}
                          source={{ html: ingredients }}
                          tagsStyles={renderHtmlStyle}
                        />
                      </View>
                    </>
                  )}

                  {instructions && (
                    <>
                      <Text
                        style={{
                          ...Styles.onSurface,
                          ...Styles.detailsListHeading,
                        }}>
                        Instructions
                      </Text>
                      <View style={Styles.box}>
                        <RenderHtml
                          contentWidth={width}
                          systemFonts={systemFonts}
                          tagsStyles={renderHtmlStyle}
                          source={{ html: instructions }}
                        />
                      </View>
                    </>
                  )}

                  {notes && (
                    <>
                      <Text
                        style={{
                          ...Styles.onSurface,
                          ...Styles.detailsListHeading,
                        }}>
                        Notes
                      </Text>
                      <View style={Styles.box}>
                        <RenderHtml
                          contentWidth={width}
                          systemFonts={systemFonts}
                          tagsStyles={renderHtmlStyle}
                          source={{ html: notes }}
                        />
                      </View>
                    </>
                  )}
                  {(carbohydrates || fat || protein || sugar) && (
                    <>
                      <Text
                        style={{
                          ...Styles.onSurface,
                          ...Styles.detailsListHeading,
                        }}>
                        Nutrition
                      </Text>

                      <View
                        style={{
                          ...Styles.box,
                          ...Styles.dFlex,
                          ...Styles.flexRow,
                          ...Styles.flexWrap,
                        }}>
                        <View style={{ ...Styles.halfColumn, ...Styles.py2 }}>
                          {carbohydrates && (
                            <Text style={Styles.onSurface}>
                              <Text style={Styles.greyText}>
                                {' '}
                                Carbohydrates
                              </Text>{' '}
                              - {carbohydrates}
                            </Text>
                          )}
                        </View>
                        <View style={{ ...Styles.halfColumn, ...Styles.py2 }}>
                          {fat && (
                            <Text style={Styles.onSurface}>
                              <Text style={Styles.greyText}> fat</Text> - {fat}
                            </Text>
                          )}
                        </View>
                        <View style={{ ...Styles.halfColumn, ...Styles.py2 }}>
                          {protein && (
                            <Text style={Styles.onSurface}>
                              <Text style={Styles.greyText}> protein</Text> -{' '}
                              {protein}
                            </Text>
                          )}
                        </View>
                        <View style={{ ...Styles.halfColumn, ...Styles.py2 }}>
                          {sugar && (
                            <Text style={Styles.onSurface}>
                              <Text style={Styles.greyText}> sugar</Text> -{' '}
                              {sugar}
                            </Text>
                          )}
                        </View>
                      </View>
                    </>
                  )}

                  <Text
                    style={{
                      ...Styles.headerAsBreadCrumsTitle,
                      ...Styles.onSurface,
                      ...Styles.ratingGap,
                    }}>
                    Rate Recipe
                  </Text>
                  <View>
                    <Rating
                      type="custom"
                      defaultRating={1}
                      ratingCount={5}
                      startingValue={0}
                      starContainerStyle={{ backgroundColor: 'red' }}
                      ratingContainerStyle={{ backgroundColor: 'red' }}
                      tintColor={'#f5f5f5'}
                    />
                  </View>
                </View>
              </View>
            </LoaderLayout>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
