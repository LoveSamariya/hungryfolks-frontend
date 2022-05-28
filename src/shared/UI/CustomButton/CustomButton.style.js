import { StyleSheet } from 'react-native';

export const createStyles = theme => {
  const styles = StyleSheet.create({
    btnBase: {
      // common style of button
      maxWidth: '100%',
      paddingHorizontal: 24,
      paddingVertical: 15,
      textAlign: 'center',
      borderRadius: 24,
    },
    btnTextBase: {
      // common style of button
      textAlign: 'center',
    },
    //variants
    btnPrimary: {
      backgroundColor: theme.color.highlight1,
    },
    btnLabelPrimary: {
      color: 'white',
    },
    btnWhite: {
      backgroundColor: 'white',
    },
    btnLabelWhite: {
      color: theme.color.highlight1,
    },
    btnTextPrimary: {
      backgroundColor: 'transparent',
    },
    btnLabelTextPrimary: {
      color: theme.color.highlight1,
    },
  });
  return styles;
};
