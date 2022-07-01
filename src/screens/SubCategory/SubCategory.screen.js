import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useThemeAwareObject } from '../../hooks/themeAwareObject';
import Card from '../../shared/UI/Card/Card';
import {
  CustomStatusBar,
  TopBar,
  LoaderLayout,
  CustomImage,
} from '../../shared';

import { useGetSubCategoryQuery } from './subCategory.services';
import qs from 'qs';
import { useGetMainCategoryQuery } from '../MainCategory/recipes.services';

const createStyles = theme => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.color.pageBgColor,
      height: '100%',
      color: theme.color.onSurface,
      flex: 1,
      padding: theme.spacing[5],
      fontFamily: 'RobotoCondensed-Bold',
    },
    headerAsBreadCrums: {
      height: 124,
      backgroundColor: theme.color.highlight2,
    },
    headerAsBreadCrumsTitle: {
      fontSize: 24,
      fontFamily: theme.fontFamily.primaryBold,
      color: '#ffffff',
      textAlign: 'center',
      marginTop: 'auto',
      marginBottom: 32,
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
  });
  return styles;
};

export default function SubCategoryScreen({ navigation, route }) {
  const { id, name } = route.params;

  const { data, error, isLoading } = useGetSubCategoryQuery(
    qs.stringify({ MainCategory: name }),
  );

  const { subCategories } = data || {};

  const Styles = useThemeAwareObject(createStyles);

  const onCardPressed = subCategory => {
    navigation.navigate('DishRecipe', {
      id,
      MainCategory: name,
      SubCategory: subCategory,
    });
  };

  return (
    <>
      <CustomStatusBar variant="primary1" />
      <TopBar navigation={navigation} />

      <SafeAreaView
        style={{
          flex: 1,
          height: '100%',
          display: 'flex',
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{ display: 'flex' }}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={Styles.headerAsBreadCrums}>
            <Text style={Styles.headerAsBreadCrumsTitle}>{name}</Text>
          </View>
          <View
            style={{
              ...Styles.container,
              flex: 1,
              height: '100%',
            }}>
            {/* <View style={Styles.cardOne}>
          <View style={Styles.cardOneImgContainer}>
            <Image
              style={Styles.cardOneImg}
              source={require('../../../assets/images/categories/indian-categories.jpg')}
            />
            <View style={Styles.cardOneCaptionContainer}>
              <Text style={Styles.cardOneCaption}>Pav Bhaji</Text>
            </View>
          </View>
        </View> */}
            <LoaderLayout isLoading={isLoading}>
              <View style={{ ...Styles.row }}>
                {subCategories?.map(({ name, image }) => {
                  return (
                    <View style={{ ...Styles.col }} key={name}>
                      <Card
                        key={name}
                        title={name}
                        onCardPressed={() => onCardPressed(name)}>
                        <CustomImage
                          source={{ uri: image }}
                          style={{ height: '100%', width: '100%' }}
                        />
                      </Card>
                    </View>
                  );
                })}
              </View>
            </LoaderLayout>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
