// Define our light theme colors
const DEFAULT_LIGHT_COLOR_THEME = {
  primary: '#FF7800',
  onPrimary: '#ffffff',
  secondary: '#FFBC97',
  onSecondary: '#ffffff',
  highlight: '#FFE300',
  onHighlight: '#ffffff',
  surface: '#ffffff',
  onSurface: '#303030',
  gray1: '#F7F7F7',
  gray2: '#E5DCC3',
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
    shadowOpacity: 1,
    elevation: 5,
    shadowColor: '#9A9483',
    shadowOpacity: 1,
    shadowRadius: 16,
    // shadowOffset: {width: -2, height: 4},
  },
};

export const DEFAULT_LIGHT_THEME_FONT_FAMILY = {
  primaryBlack: 'PlayfairDisplay-Black',
};

export const DEFAULT_LIGHT_THEME = {
  id: DEFAULT_LIGHT_THEME_ID,
  color: DEFAULT_LIGHT_COLOR_THEME,
  spacing: DEFAULT_LIGHT_SPACING_THEME,
  box: DEFAULT_LIGHT_THEME_BOX,
  fontFamily: DEFAULT_LIGHT_THEME_FONT_FAMILY,
};