import { StyleSheet } from 'react-native';

export const createStyles = theme => {
  const styles = StyleSheet.create({
    passWordVisibilityIconContainer: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      top: 0,
      display: 'flex',
      justifyContent: 'center',
      paddingRight: 14,
    },
  });
  return styles;
};
