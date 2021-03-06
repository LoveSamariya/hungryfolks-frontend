import { StyleSheet } from 'react-native';

const createStyles = theme => {
  const styles = StyleSheet.create({
    userAvatar: {
      borderRadius: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    userAvatarText: {
      textTransform: 'uppercase',
    },
  });

  return styles;
};

export default createStyles;
