import { StyleSheet } from 'react-native';

export const createStyles = theme => {
  const styles = StyleSheet.create({
    heading: {
      fontSize: 30,
      color: theme.color.onSurface,
      fontFamily: theme.fontFamily.secondaryBold,
      marginBottom: 24,
    },
    formBox: {
      flex: 1,
      padding: theme.spacing[5],
    },
    textGrey1: {
      color: theme.color.gray3,
    },
    mtCaptionGap: {
      marginTop: 24,
    },
  });
  return styles;
};
