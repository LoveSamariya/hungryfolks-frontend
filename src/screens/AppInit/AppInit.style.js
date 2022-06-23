import { StyleSheet } from 'react-native';

const createStyles = theme => {
  const styles = StyleSheet.create({
    page: {
      display: 'flex',
      flex: 1,
      backgroundColor: '#f5eedc',
      justifyContent: 'center',
      paddingHorizontal: 12,
    },
    logo: {
      maxWidth: '100%',
      display: 'flex',
      height: 500,
      resizeMode: 'contain',
      justifyContent: 'center',
    },
  });
  return styles;
};

export default createStyles;
