import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import dummyTimeTypeData from '../../data/timeType';
import {useThemeAwareObject} from '../../hooks/themeAwareObject';
import Card from '../../shared/UI/Card/Card';

const createStyles = theme => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.color.pageBgColor,
      color: theme.color.onSurface,
      flex: 1,
      padding: theme.spacing[5],
      fontFamily: 'RobotoCondensed-Bold',
    },
    headerAsBreadCrums: {
      height: 124,
      backgroundColor: theme.color.secondary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerAsBreadCrumsTitle: {
      fontSize: 24,
      fontFamily: theme.fontFamily.primaryBold,
      color:'#ffffff'
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

export default function RecipeDetailedListsScreen({navigation, route}) {
  const {id, name} = route.params;

  const Styles = useThemeAwareObject(createStyles);

  const onCardPressed = subtitle => {
    navigation.navigate('RecipeSubDetailsList', {
      id,
      name,
      subtitle,
    });
  };

  return (
    <>
      <View style={Styles.headerAsBreadCrums}>
        <Text style={Styles.headerAsBreadCrumsTitle}> {name}</Text>
      </View>
      <View style={Styles.container}>
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
        <View style={Styles.row}>
          {dummyTimeTypeData.map(({name, img}) => {
            return (
              <View style={Styles.col} key={name}>
                <Card
                  key={name}
                  title={name}
                  onCardPressed={() => onCardPressed(name)}>
                  <Image source={img} style={{height: '100%', width: '100%'}} />
                </Card>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
}
