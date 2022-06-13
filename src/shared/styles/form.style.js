import { StyleSheet } from 'react-native';

export const createStylesForm = theme => {
  const styles = StyleSheet.create({
    input_wrapper: {
      marginBottom: 16,
    },
    input: {
      backgroundColor: theme.color.gray2,
      color: theme.color.onSurface,
      borderBottomWidth: 2,
      borderColor: theme.color.gray3,
      fontSize: 20,
    },
    input_label: {
      fontSize: 14,
      color: theme.color.onSurface,
      marginBottom: 4,
    },
    inputInvalid: {
      color: theme.color.danger,
      borderColor: theme.color.danger,
    },
    errorMessage: {
      color: theme.color.danger,
      marginTop: 4,
    },
  });
  return styles;
};
