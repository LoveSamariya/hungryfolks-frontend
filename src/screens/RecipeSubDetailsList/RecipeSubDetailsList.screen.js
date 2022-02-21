import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useThemeAwareObject} from '../../hooks/themeAwareObject';

const createStyles = theme => {
  const styles = StyleSheet.create({
    container: {
      padding: theme.spacing[2],
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
    },
    cardOne: {
      height: 226,
      borderRadius: 12,
      overflow: 'hidden',
    },
    cardOneImgContainer: {
      position: 'relative',
      width: '100%',
      height: 226,
      resizeMode: 'cover',
    },
    cardOneImg: {
      width: '100%',
      height: '100%',
    },
    cardOneCaptionContainer: {
      backgroundColor: theme.color.highlight,
      left: 0,
      right: 0,
      bottom: 0,
      height: 46,
      position: 'absolute',
      opacity: 0.75,
      display: 'flex',
      justifyContent: 'center',
    },
    cardOneCaption: {
      fontSize: 24,
      paddingLeft: 16,
      color: theme.color.onHighlight,
      fontFamily: theme.fontFamily.secondaryBlack,
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

export default function RecipeSubDetailsListScreen() {
  const Styles = useThemeAwareObject(createStyles);

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'gray',
        }}>
        <Text>Recipe Details</Text>
      </View>
    </>
  );
}
