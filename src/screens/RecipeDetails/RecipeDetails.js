import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {Rating} from 'react-native-ratings';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeAwareObject} from '../../hooks/themeAwareObject';
// import {WebView} from 'react-native';

const createStyles = theme => {
  const styles = StyleSheet.create({
    pageBgColor: {
      backgroundColor: theme.color.gray4,
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
      fontFamily: theme.fontFamily.primaryBold,
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
    container: {
      padding: 16,
      marginBottom: 46,
      height: '100%',
    },
    detailHeading: {
      fontFamily: theme.fontFamily.secondaryBold,
      fontSize: 36,
    },
    mtDetail: {
      marginTop: theme.spacing[6],
    },
    ratingGap: {
      marginTop: theme.spacing[12],
    },
  });
  return styles;
};

export default function RecipeDetails({route}) {
  const {id, name, subtitle, itemName} = route.params;
  const Styles = useThemeAwareObject(createStyles);

  return (
    <>
      <SafeAreaView style={Styles.pageBgColor}>
        <ScrollView>
          <View style={Styles.headerAsBreadCrums}></View>
          <View>
            <View style={Styles.detailImageContainer}>
              <Image
                style={Styles.detailedImage}
                source={require('../../assets/images/categories/indian-categories.jpg')}
              />
            </View>
            <View style={Styles.container}>
              <Text style={{...Styles.onSurface, ...Styles.detailHeading}}>
                {itemName}
              </Text>
              <Text style={Styles.onSurface}>
                {name} / {subtitle}
              </Text>
              <Text style={{...Styles.onSurface, ...Styles.mtDetail}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                nibh sapien, eleifend sed volutpat quis, accumsan vitae arcu.
                Sed condimentum eros cursus ligula interdum euismod. Nulla sem
                lacus, blandit non enim nec, sollicitudin cursus felis. Sed
                interdum, diam sit amet aliquam molestie, tortor orci ultrices
                purus, in gravida dolor odio vel ligula. Donec vitae volutpat
                libero. Pellentesque dui.
              </Text>
              <Text style={{...Styles.onSurface, ...Styles.mtDetail}}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Aliquam tincidunt mauris eu risus. Vestibulum auctor dapibus
                neque. Nunc dignissim risus id metus. Cras ornare tristique
                elit. Vivamus vestibulum ntulla nec ante. Praesent placerat
                risus quis eros.
              </Text>
              <Text style={{...Styles.onSurface, ...Styles.mtDetail}}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Aliquam tincidunt mauris eu risus. Vestibulum auctor dapibus
                neque. Nunc dignissim risus id metus. Cras ornare tristique
                elit. Vivamus vestibulum ntulla nec ante. Praesent placerat
                risus quis eros.
              </Text>
              <Text style={{...Styles.onSurface, ...Styles.mtDetail}}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Aliquam tincidunt mauris eu risus. Vestibulum auctor dapibus
                neque. Nunc dignissim risus id metus. Cras ornare tristique
                elit. Vivamus vestibulum ntulla nec ante. Praesent placerat
                risus quis eros.
              </Text>
              <Text style={{...Styles.onSurface, ...Styles.mtDetail}}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Aliquam tincidunt mauris eu risus. Vestibulum auctor dapibus
                neque. Nunc dignissim risus id metus. Cras ornare tristique
                elit. Vivamus vestibulum ntulla nec ante. Praesent placerat
                risus quis eros.
              </Text>
              <Text style={{...Styles.onSurface, ...Styles.mtDetail}}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Aliquam tincidunt mauris eu risus. Vestibulum auctor dapibus
                neque. Nunc dignissim risus id metus. Cras ornare tristique
                elit. Vivamus vestibulum ntulla nec ante. Praesent placerat
                risus quis eros.
              </Text>

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
                  starContainerStyle={{backgroundColor: 'red'}}
                  ratingContainerStyle={{backgroundColor: 'red'}}
                  tintColor={'#f5f5f5'}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
