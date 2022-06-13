import { StyleSheet } from 'react-native';

export const createStyles = theme => {
  const styles = StyleSheet.create({
    customGoogleSigninButtonBase: {
      // common style of button
      maxWidth: '100%',
      paddingHorizontal: 24,
      paddingVertical: 15,
      textAlign: 'center',
      borderRadius: 12,
      backgroundColor: 'white',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      height: 56,
    },
    customGoogleSigninButtonText: {
      color: theme.color.gray3,
    },
  });
  return styles;
};
