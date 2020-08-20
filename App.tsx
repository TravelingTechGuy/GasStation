import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

export default () => 
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}} >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
    <StatusBar style="light" />
  </NavigationContainer>;
