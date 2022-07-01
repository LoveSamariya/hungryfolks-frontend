import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import { Heading1 } from '../TypoGraphy/Typography';

const createStyles = theme => {
  const styles = StyleSheet.create({
    noDataFoundText: {},
  });
  return styles;
};

function NoData({ text, style }) {
  const Styles = useThemeAwareObject(createStyles);

  return (
    <View style={style}>
      <View>
        <Image
          source={require('../../../assets/images/no-data.png')}
          style={{
            display: 'flex',
            width: '100%',
            height: 324,
            resizeMode: 'contain',
            opacity: 0.1,
          }}
        />
      </View>
      <Heading1
        style={{
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.8,
          textAlign: 'center',
        }}>
        {text || 'No Data Found!'}
      </Heading1>
    </View>
  );
}

export default React.memo(NoData);
