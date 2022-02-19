// Theme.context.tsx
import React from 'react';

import {
  DEFAULT_DARK_THEME,
  DEFAULT_DARK_THEME_ID,
} from '../constants/dark.theme';

import {
  DEFAULT_LIGHT_THEME,
  DEFAULT_LIGHT_THEME_ID,
} from '../constants/light.theme';

// Creating our context
// Important: the defined object here is only received by the
// consumer components when there is no rendered context provider
// in the view hierarchy, so basically it will provide
// a fallback object
export const Context = React.createContext({
  theme: DEFAULT_LIGHT_THEME,
  toggleTheme: () => {
    console.log('ThemeProvider is not rendered!');
  },
});

// Creating our stateful context provider
// We are using React.memo for optimization
export const ThemeProvider = ({initial, children}) => {
  // Store the actual theme as an internal state of the provider
  const [theme, setTheme] = React.useState(initial);

  React.useEffect(() => {
    setTheme(initial);
  }, [theme]);
  // Implement a method for toggling the Theme
  // We're using the React.useCallback hook for optimization
  const ToggleThemeCallback = React.useCallback(() => {
    setTheme(currentTheme => {
      if (currentTheme.id === DEFAULT_LIGHT_THEME_ID) {
        return DEFAULT_DARK_THEME;
      }
      if (currentTheme.id === DEFAULT_DARK_THEME_ID) {
        return DEFAULT_LIGHT_THEME;
      }
      return currentTheme;
    });
  }, [theme]);
  // Building up the provided object
  // We're using the React.useMemo hook for optimization
  const MemoizedValue = React.useMemo(() => {
    const value = {
      theme,
      toggleTheme: ToggleThemeCallback,
    };
    return value;
  }, [theme?.id, ToggleThemeCallback]);
  // Render our context provider by passing it the value to provide
  return <Context.Provider value={MemoizedValue}>{children}</Context.Provider>;
};
// Creating a custom context consumer hook for function components
export const useTheme = () => React.useContext(Context);
