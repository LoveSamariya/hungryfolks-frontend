import { commonCreateStyle } from '../constants/common';
import { useThemeAwareObject } from './themeAwareObject';

const useCommonStyle = () => {
  const CommonStyle = useThemeAwareObject(commonCreateStyle);
  return CommonStyle;
};

export { useCommonStyle };
