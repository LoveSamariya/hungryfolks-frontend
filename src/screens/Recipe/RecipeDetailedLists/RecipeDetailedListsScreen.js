import React from 'react';
import {Text, View} from 'react-native';

export default function RecipeDetailedListsScreen({navigation, route}) {
  const {id, name} = route.params;

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'gray',
        }}>
        <Text style={{fontSize: 26}}>
          {name} | Id = {id}
        </Text>
      </View>
    </>
  );
}
