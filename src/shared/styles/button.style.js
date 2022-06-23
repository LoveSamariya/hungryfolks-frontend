import { StyleSheet } from 'react-native';
import { useThemeAwareObject } from '../../hooks/themeAwareObject';

export const createStylesForm = theme => {
  let styles = StyleSheet.create({
    spacing: {
      padding: 8,
    },
    text: {
      color: theme.color.gray3,
    },
  });

  return styles;
};

export default function useButtonStyle() {
  const Styles = useThemeAwareObject(createStylesForm);

  return Styles;
}
