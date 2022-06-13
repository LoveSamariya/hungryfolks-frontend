import { StyleSheet } from 'react-native';
const createStyles = theme => {
  const styles = StyleSheet.create({
    pageBgColor: { backgroundColor: '#f5eedc' },
    logoContainer: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    logo: {
      maxWidth: '100%',
      height: 250,
      display: 'flex',
    },
    authArea: {
      display: 'flex',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 24,
    },
  });
  return styles;
};

export default createStyles;
