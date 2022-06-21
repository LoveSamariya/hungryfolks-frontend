import { StyleSheet } from 'react-native';

export const dFlex = {
  dFlex: {
    display: 'flex',
  },
};

export const flexColumn = {
  flexColumn: {
    flexDirection: 'column',
  },
};

export const flexRow = {
  flexRow: {
    flexDirection: 'row',
  },
};

export const flexWrap = {
  flexWrap: {
    flexWrap: 'wrap',
  },
};

export const alignItemsCenter = {
  alignItemsCenter: {
    alignItems: 'center',
  },
};

export const justifyContentCenter = {
  justifyContentCenter: {
    justifyContent: 'center',
  },
};

export const vhCenter = {
  vhCenter: {
    ...dFlex.dFlex,
    ...alignItemsCenter.alignItemsCenter,
    ...justifyContentCenter.justifyContentCenter,
  },
};

export const w50 = {
  w50: {
    width: '50%',
  },
};

export const w100 = {
  w100: {
    width: '100%',
  },
};

export const textCenter = {
  textCenter: {
    textAlign: 'center',
  },
};

export const commonCreateStyle = theme => {
  const styles = StyleSheet.create({
    textDanger: {
      color: theme.color.danger,
    },
    textGray3: {
      color: theme.color.gray3,
    },
    textGray5: {
      color: theme.color.gray5,
    },
  });
  return styles;
};
