export const dFlex = {
  dFlex: {
    display: 'flex',
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

