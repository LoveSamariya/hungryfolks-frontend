import { StyleSheet } from 'react-native';

export const createStyles = theme => {
  const styles = StyleSheet.create({
    lineDividerContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    },
    lineDividerLine: {
      flex: 1,
    },
    lineDividerText: {
      paddingHorizontal: 14,
      marginTop: -4,
    },
  });
  return styles;
};
