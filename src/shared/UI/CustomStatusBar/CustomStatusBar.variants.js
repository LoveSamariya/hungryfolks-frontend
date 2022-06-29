const variants = {
  primary: theme => ({
    backgroundColor: theme.color.highlight1,
    barStyle: 'light-content',
  }),
  secondary: theme => ({
    backgroundColor: '#f5eedc',
    barStyle: 'dark-content',
  }),
  transparentLight: theme => ({
    backgroundColor: 'transparent',
    barStyle: 'light-content',
    translucent: true,
  }),
  pageBg: theme => ({
    backgroundColor: `${theme.color.pageBgColor}`,
    barStyle: 'dark-content',
  }),
};

export default variants;
