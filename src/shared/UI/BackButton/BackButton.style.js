import { StyleSheet } from 'react-native';

export const createStyles = theme => {
  const styles = StyleSheet.create({
    backButtonContainer: {
      height: 36,
      width: 36,
    },
    backButtonIcon: {
      height: '100%',
      width: '100%',
      fill: theme.color.gray3,
    },
  });
  return styles;
};
