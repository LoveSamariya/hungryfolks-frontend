import { StyleSheet } from 'react-native';
import {
  alignItemsCenter,
  dFlex,
  flexRow,
  vhCenter,
} from '../../constants/common';

const createStyles = theme => {
  const styles = StyleSheet.create({
    logoutButton: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 14,
      marginLeft: 'auto',
    },
    logoutText: {
      color: 'white',
      fontSize: 18,
    },
    profilePageContent: {
      paddingHorizontal: 14,
      marginTop: -75,
      flex: 1,
    },
    heading: {
      fontSize: 32,
      color: 'black',
      fontFamily: theme.fontFamily.primaryBold,
    },
    userAvatar: {},
    headerAsBreadCrums: {
      height: 124,
      backgroundColor: theme.color.highlight1,
      display: 'flex',
      // alignItems: 'center',
    },
    footerText: {
      display: 'flex',
    },
    authMethodsContainer: {
      height: '100%',
      flex: 1,
      justifyContent: 'center',
      paddingVertical: 14,
    },
    textUnderline: {
      textDecorationLine: 'underline',
    },
    textBlack: {
      color: theme.color.gray3,
    },
    ...dFlex,
    ...vhCenter,
    ...flexRow,
    ...alignItemsCenter,
  });
  return styles;
};

export default createStyles;
