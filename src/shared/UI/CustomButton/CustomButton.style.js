import { StyleSheet } from 'react-native';

export const createStyles = theme => {
  const styles = StyleSheet.create({
    btnBase: {
      // common style of button
      maxWidth: '100%',
      paddingHorizontal: 24,
      paddingVertical: 18,
      height: 56,
      textAlign: 'center',
      borderRadius: 12,
    },
    btnContent: {
      display: 'flex',
      flexDirection: 'row',
      marginHorizontal: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    btnTextBase: {
      // common style of button
      textAlign: 'center',
    },
    loaderBase: {
      // common style of loader
      marginLeft: 8,
    },
    //variants
    btnPrimary: {
      backgroundColor: theme.color.highlight1,
    },
    btnLabelPrimary: {
      color: 'white',
    },
    btnPrimaryDisabled: {
      backgroundColor: theme.color.lightHighlight1,
    },
    loaderPrimary: {
      color: 'white',
    },
    btnWhite: {
      backgroundColor: 'white',
    },
    btnLabelWhite: {
      color: theme.color.highlight1,
    },
    btnSecondaryLight: {
      backgroundColor: 'white',
    },
    btnLabelSecondaryLight: {
      color: theme.color.gray3,
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
