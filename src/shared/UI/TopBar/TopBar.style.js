import { StyleSheet } from 'react-native';

const createStyles = theme => {
  const styles = StyleSheet.create({
    stickyHeader: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      zIndex: 999,
      paddingTop: 4,
      paddingBottom: 8,
      backgroundColor: theme.color.highlight1,
    },
    backButton: {
      marginLeft: 12,
    },
  });

  return styles;
};

export default createStyles;
