import { StyleSheet } from 'react-native';

const createStyles = theme => {
  const styles = StyleSheet.create({
    page: {
      display: 'flex',
      flex: 1,
      backgroundColor: '#f5eedc',
      justifyContent: 'center',
      paddingHorizontal: 12,
      position: 'relative',
    },
    logo: {
      maxWidth: '100%',
      height: 200,
      display: 'flex',
      resizeMode: 'contain',
    },
    screenHeading: {
      fontFamily: theme.fontFamily.primaryBold,
      marginBottom: 14,
      fontSize: 32,
      color: 'black',
    },
    backButtonAlignment: {
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 99,
      backgroundColor: '#f5eedc',
      borderRadius: 100,
    },
  });
  return styles;
};

export default createStyles;
