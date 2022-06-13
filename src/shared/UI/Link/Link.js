import React from 'react';
import { Linking, Text, TouchableHighlight } from 'react-native';

function Link({ text, href, style, textStyle }) {
  return (
    <TouchableHighlight
      underlayColor="transperent"
      onPress={() => {
        Linking.openURL(href);
      }}
      style={{ ...style }}>
      <Text style={{ color: '#777777', ...textStyle }}>{text}</Text>
    </TouchableHighlight>
  );
}

export default Link;
