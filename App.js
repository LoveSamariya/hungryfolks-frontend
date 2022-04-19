import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Image, StatusBar } from 'react-native';
import { DEFAULT_LIGHT_THEME } from './src/constants/light.theme.js';
import { ThemeProvider, useTheme } from './src/context/thme.context.js';
import {
  DishRecipeDetails,
  DishRecipesScreen,
  IngredientsScreen,
  MainCategoryScreen,
  SubCategoryScreen,
} from './src/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBowlRice, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    borderTopWidth: 0,
    elevation: 0,
    color: 'red',
  },
  tabBarItemStyle: {
    borderRadius: 10,
    color: 'red',
  },
  tabBarActiveTintColor: '#fa004c',
  tabBarInactiveTintColor: '#AAA492',
};

function MyTabs() {
  return (
    <Tab.Navigator {...{ screenOptions }}>
      <Tab.Screen
        name="Recipes"
        component={MainCategoryScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <FontAwesomeIcon
                icon={faBowlRice}
                size={24}
                color={focused ? '#fa004c' : '#AAA492'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Ingredients"
        component={IngredientsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <FontAwesomeIcon
                icon={faPuzzlePiece}
                size={24}
                color={focused ? '#fa004c' : '#AAA492'}
              />
            );
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
        <StatusBar barStyle="light-content" backgroundColor="#fa004c" />

        <Stack.Navigator initialRouteName="Home">
          <>
            <Stack.Screen
              name="Home"
              component={MyTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Recipe" component={MainCategoryScreen} />
            <Stack.Screen
              options={{ headerShown: false }}
              name="SubCategory"
              component={SubCategoryScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="DishRecipe"
              component={DishRecipesScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="DishRecipeDetails"
              component={DishRecipeDetails}
            />
            <Stack.Screen name="Ingredients" component={IngredientsScreen} />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
