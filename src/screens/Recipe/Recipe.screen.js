import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useThemeAwareObject} from '../../hooks/themeAwareObject';
import Card from '../../shared/UI/Card';
import {Heading1} from '../../shared/UI/TypoGraphy/Typography';
import Search from './components/Search';

import IndianCategory from '../../assets/images/categories/indian-categories.jpg';

const createStyles = theme => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.color.surface,
      color: theme.color.onSurface,
      flex: 1,
      padding: theme.spacing[5],
      fontFamily: 'RobotoCondensed-Bold',
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
  });
  return styles;
};

export default function RecipeScreen() {
  const Styles = useThemeAwareObject(createStyles);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={Styles.container}>
          <SafeAreaView>
            <Search />
          </SafeAreaView>
          <View style={Styles.headingGap}>
            <Heading1>Main categories</Heading1>
          </View>
          <View style={Styles.row}>
            <View style={Styles.col}>
              <Card title="Indian" img={IndianCategory} />
            </View>
            <View style={Styles.col}>
              <Card title="Italian" img={IndianCategory} />
            </View>
            <View style={Styles.col}>
              <Card title="Italian" img={IndianCategory} />
            </View>
            <View style={Styles.col}>
              <Card title="Italian" img={IndianCategory} />
            </View>
            <View style={Styles.col}>
              <Card title="Italian" img={IndianCategory} />
            </View>
            <View style={Styles.col}>
              <Card title="Italian" img={IndianCategory} />
            </View>
          </View>
          <View style={Styles.headingGap}>
            <Heading1>Main categories</Heading1>
          </View>
          <View style={Styles.row}>
            <View style={Styles.col}>
              <Card title="Indian" img={IndianCategory} />
            </View>
            <View style={Styles.col}>
              <Card title="Italian" img={IndianCategory} />
            </View>
            <View style={Styles.col}>
              <Card title="Italian" img={IndianCategory} />
            </View>
            <View style={Styles.col}>
              <Card title="Italian" img={IndianCategory} />
            </View>
            <View style={Styles.col}>
              <Card title="Italian" img={IndianCategory} />
            </View>
            <View style={Styles.col}>
              <Card title="Italian" img={IndianCategory} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
