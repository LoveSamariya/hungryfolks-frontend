// Define our light theme colors
const DEFAULT_LIGHT_COLOR_THEME = {
  primary: '#FF7800',
  onPrimary: '#ffffff',
  secondary: '#fa004c',
  onSecondary: '#ffffff',
  highlight: '#FFE800',
  highlight1: '#EB4F16',
  highlight2: '#EB5924',
  lightHighlight1: '#f07f56',
  onHighlight: '#000000',
  surface: '#ffffff',
  pageBgColor: '#EEEEEE',
  onSurface: '#303030',
  gray1: '#EAEFF2',
  gray2: '#E5DCC3',
  gray3: '#878787',
  gray4: '#f5f5f5',
  gray5: '#AAA492',
  gray6: '#3e3e3e',
  gray7: '#eeeeee',
  danger: '#ff0000',
  black: '#000000',
};

const defaultSpacingFactor = 16;

const DEFAULT_LIGHT_SPACING_THEME = {
  1: defaultSpacingFactor * 0.25,
  2: defaultSpacingFactor * 0.5,
  3: defaultSpacingFactor * 0.75,
  4: defaultSpacingFactor,
  5: defaultSpacingFactor * 1.25,
  6: defaultSpacingFactor * 1.5,
  7: defaultSpacingFactor * 1.75,
  8: defaultSpacingFactor * 2,
  9: defaultSpacingFactor * 2.25,
  10: defaultSpacingFactor * 2.5,
  11: defaultSpacingFactor * 2.75,
  12: defaultSpacingFactor * 3,
};

export const DEFAULT_LIGHT_THEME_ID = 'default-light';

export const DEFAULT_LIGHT_THEME_BOX = {
  radius: 12,
  borderColor: '#dddddd',
  shadowProp: {
    shadowColor: DEFAULT_LIGHT_COLOR_THEME.gray3,
    backgroundColor: DEFAULT_LIGHT_COLOR_THEME.surface,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
};

export const DEFAULT_LIGHT_THEME_FONT_FAMILY = {
  primaryBold: 'RobotoCondensed-Bold',
  primaryRegular: 'RobotoCondensed-Regular',
  secondaryBlack: 'PlayfairDisplay-Black',
  secondaryBold: 'PlayfairDisplay-Bold',
  secondaryMedium: 'PlayfairDisplay-Medium',
};

export const DEFAULT_LIGHT_THEME = {
  id: DEFAULT_LIGHT_THEME_ID,
  color: DEFAULT_LIGHT_COLOR_THEME,
  spacing: DEFAULT_LIGHT_SPACING_THEME,
  box: DEFAULT_LIGHT_THEME_BOX,
  fontFamily: DEFAULT_LIGHT_THEME_FONT_FAMILY,
};
