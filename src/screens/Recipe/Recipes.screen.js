import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {useThemeAwareObject} from '../../hooks/themeAwareObject';
import Card from '../../shared/UI/Card/Card';
import {Heading1} from '../../shared/UI/TypoGraphy/Typography';
import Search from './components/Search';

import IndianCategory from '../../assets/images/categories/indian-categories.jpg';
import dummyRecipeData from '../../data/dummyRecipe.data';

const createStyles = theme => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.surface,
      color: theme.color.onSurface,
      padding: theme.spacing[5],
      fontFamily: 'RobotoCondensed-Bold',
    },
    bottomGap: {
      marginBottom: theme.spacing[5],
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
      marginTop: theme.spacing[7],
      marginBottom: theme.spacing[3],
    },
    img: {
      maxWidth: '100%',
      height: '100%',
    },
  });
  return styles;
};

export default function RecipeScreen({navigation}) {
  const Styles = useThemeAwareObject(createStyles);

  const onCardPressed = (id, name) => {
    navigation.navigate('RecipeDetailedList', {
      id,
      name,
    });
  };

  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView>
        <View style={Styles.bottomGap}>
          <SafeAreaView>
            <Search />
          </SafeAreaView>
          <View style={Styles.headingGap}>
            <Heading1>Main categories</Heading1>
          </View>
          <View style={Styles.row}>
            {dummyRecipeData.map(({name, id, img}) => {
              // const imgSrc = `../../${img}`;
              return (
                <View style={Styles.col} key={name}>
                  <Card
                    title={name}
                    onCardPressed={() => onCardPressed(id, name)}>
                    <Image style={Styles.img} source={img} />
                  </Card>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
