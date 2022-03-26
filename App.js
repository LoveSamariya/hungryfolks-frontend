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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleRight,
  faBowlFood,
  faBowlRice,
  faPuzzlePiece,
} from '@fortawesome/free-solid-svg-icons';

const TAB_ONE = require('./src/assets/images/cooking.png');
const TAB_TWO = require('./src/assets/images/ing.png');

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: '#efefef',
    borderWidth: 0,
    color: 'red',
    // borderColor: 'red',
    // borderWidth: 1,/
    // marginTop: 4,
    // width: '80%',
    // marginLeft: '50%',
    // marginRight: '50%',
  },
  tabBarItemStyle: {
    borderRadius: 10,
    color: 'red',
  },
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
};

function MyTabs() {
  return (
    <Tab.Navigator {...{screenOptions}}>
      <Tab.Screen
        name="Recipes"
        component={RecipeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <FontAwesomeIcon
                icon={faBowlRice}
                size={24}
                color={focused ? 'red' : 'gray'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Ingredients"
        component={IngredientsScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <FontAwesomeIcon
                icon={faPuzzlePiece}
                size={24}
                color={focused ? 'red' : 'gray'}
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
