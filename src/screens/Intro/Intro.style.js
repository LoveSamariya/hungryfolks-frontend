import { StyleSheet } from 'react-native';
import { vhCenter } from '../../constants/common';
import { useThemeAwareObject } from '../../hooks/themeAwareObject';

export const createStyles = theme => {
  const styles = StyleSheet.create({
    page: {
      display: 'flex',
      flex: 1,
      backgroundColor: '#f5eedc',
    },
    logo: {
      maxWidth: '100%',
      height: 200,
      display: 'flex',
      resizeMode: 'contain',
    },
    stickyContainer: {
      backgroundColor: 'white',
      borderTopLeftRadius: 36,
      borderTopRightRadius: 36,
      paddingTop: 36,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      bottom: 0,
      left: 0,
      right: 0,
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
      elevation: 4,
      height: 360,
    },
    sliderContainerCustomStyle: { marginHorizontal: -18 },
    carouselItem: { paddingHorizontal: 18 },
    slideTitle: {
      color: theme.color.highlight1,
      fontSize: 40,
      fontFamily: theme.fontFamily.primaryBold,
      marginBottom: 14,
    },
    slideDescription: {
      //   fontFamily: theme.fontFamily.primaryBold,
      color: '#838383',
      fontSize: 18,
      lineHeight: 24,
    },
    imageSliderContainer: {
      flex: 1,
    },
    imageSliderImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    goNext: {
      width: 64,
      height: 64,
      backgroundColor: theme.color.highlight1,
      borderRadius: 64 / 2,
      position: 'absolute',
      bottom: 360 - 32,
      zIndex: 2,
      right: 16,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.6,
      shadowRadius: 2,
      elevation: 5,
    },
    skipButton: {
      position: 'absolute',
      top: -28,
      left: 24,
    },
    skipText: {
      color: 'white',
      textDecorationLine: 'underline',
    },
    ...vhCenter,
  });
  return styles;
};

export default function useIntroStyle() {
  return useThemeAwareObject(createStyles);
}
