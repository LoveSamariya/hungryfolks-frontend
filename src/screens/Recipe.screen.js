import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

export default function RecipeScreen() {
  const [number, onChangeNumber] = React.useState(null);

  return (
    <View style={{padding: 16}}>
      <SafeAreaView>
        <TextInput
          style={{
            margin: 16,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#dddddd',
            borderRadius: 24,
            paddingLeft: 16,
            color: '#000',
            shadowColor: 'red',
            shadowOffset: {width: -16, height: 4},
            shadowOpacity: 1,
            shadowRadius: 3,
          }}
          onChangeText={onChangeNumber}
          value={number}
          placeholderTextColor="black"
          placeholder="Search..."
        />
      </SafeAreaView>
      <Text style={{color: '#000', fontSize: 24}}>Main categories</Text>
    </View>
  );
}
