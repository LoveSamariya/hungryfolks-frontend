import { StyleSheet } from 'react-native';

const createStyles = theme => {
  const styles = StyleSheet.create({
    modalContentContainer: {
      flex: 1,
      marginTop: 250,
      position: 'absolute',
      display: 'flex',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      paddingHorizontal: 14,
      zIndex: 9999999,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 100,
      },
      shadowOpacity: 1,
      shadowRadius: 100,
      overflow: 'hidden',
      elevation: 24,
    },
    modalCloseButton: {
      height: 24,
      width: 24,
      position: 'absolute',
      right: 24,
      top: 24,
      zIndex: 1,
    },
    backDrop: {
      flex: 1,
      height: '100%',
      display: 'flex',
      backgroundColor: '#00000090',
    },
  });
  return styles;
};

export default createStyles;
