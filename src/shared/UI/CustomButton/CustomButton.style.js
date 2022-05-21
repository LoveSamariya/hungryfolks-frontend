import { StyleSheet } from 'react-native';

export const createStyles = theme => {
  const styles = StyleSheet.create({
    btnBase: {
      width: '100%',
      paddingHorizontal: 24,
      paddingVertical: 15,
      textAlign: 'center',
      borderRadius: 24,
    },
    btnTextBase: { textAlign: 'center' },
    btnPrimary: {
      backgroundColor: theme.color.highlight1,
    },
    btnTextPrimary: {
      color: 'white',
    },
  });
  return styles;
};
