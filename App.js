import * as React from 'react';
import {Image, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {RecipeScreen, IngredientsScreen} from './src/screens';
import CookingSvgIcon from './src/icons/CookingSvg';

const TAB_ONE = require('./src/assets/images/cooking.png');
const TAB_TWO = require('./src/assets/images/ing.png');

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Image source={TAB_ONE} style={{width: 32, height: 32}} />;
          },
        }}
      />
      <Tab.Screen
        name="Ingredients"
        component={IngredientsScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Image source={TAB_TWO} style={{width: 24, height: 24}} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <MyTabs />
    </NavigationContainer>
  );
}
