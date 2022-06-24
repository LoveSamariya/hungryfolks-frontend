import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DEFAULT_LIGHT_THEME } from './src/constants/light.theme.js';

import { AuthProviderGoogle } from './src/context/auth.google.context';
import { ThemeProvider, useTheme } from './src/context/thme.context';

import {
  AppInitScreen,
  DishRecipeDetails,
  DishRecipesScreen,
  IngredientsScreen,
  MainCategoryScreen,
  SubCategoryScreen,
  WelcomeScreen,
  CreateAccountScreen,
  OtpScreen,
  LoginScreen,
  ProfileScreen,
  CreditsScreen,
  ResetPasswordScreen,
  ForgotPasswordEmailScreen,
  ForgotPasswordOtpPassword,
} from './src/screens';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBowlRice, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  const { theme } = useTheme();
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
    tabBarActiveTintColor: theme.color.highlight1,
    tabBarInactiveTintColor: theme.color.gray5,
  };

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
                color={focused ? theme.color.highlight1 : theme.color.gray5}
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
                color={focused ? theme.color.highlight1 : theme.color.gray5}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const initialRouteName = 'AppInit';
  return (
    <AuthProviderGoogle>
      <ThemeProvider initial={DEFAULT_LIGHT_THEME}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRouteName}>
            <>
              <Stack.Screen
                name="AppInit"
                component={AppInitScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CreateAccount"
                component={CreateAccountScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Otp"
                component={OtpScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgotPasswordEmail"
                component={ForgotPasswordEmailScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgotPasswordOtpPassword"
                component={ForgotPasswordOtpPassword}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Credits"
                component={CreditsScreen}
                options={{ headerShown: false }}
              />
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
    </AuthProviderGoogle>
  );
}
