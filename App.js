import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {Image, StatusBar} from 'react-native';
import {DEFAULT_LIGHT_THEME} from './src/constants/light.theme.js';
import {ThemeProvider, useTheme} from './src/context/thme.context.js';
import {
  IngredientsScreen,
  RecipeScreen,
  RecipeDetailedListsScreen,
  RecipeSubDetailsListScreen,
  RecipeDetails,
} from './src/screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const TAB_ONE = require('./src/assets/images/cooking.png');
const TAB_TWO = require('./src/assets/images/ing.png');

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
    <ThemeProvider initial={DEFAULT_LIGHT_THEME}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#FFBC97" />

        <Stack.Navigator initialRouteName="Home">
          <>
            <Stack.Screen
              name="Home"
              component={MyTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Recipe" component={RecipeScreen} />
            <Stack.Screen name="Ingredients" component={IngredientsScreen} />
            <Stack.Screen
              options={{headerShown: false}}
              name="RecipeDetailedList"
              component={RecipeDetailedListsScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="RecipeSubDetailsList"
              component={RecipeSubDetailsListScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="RecipeDetails"
              component={RecipeDetails}
            />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
