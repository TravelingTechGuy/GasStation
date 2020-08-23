import React from 'react';
import { YellowBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {SettingsProvider} from './context/SettingsContext';
import {defaultSettings} from './config/constants';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';

//ignore warnings about setting a long timer
YellowBox.ignoreWarnings(['Setting a timer']);
console.ignoredYellowBox = ['Setting a timer'];

const Stack = createStackNavigator();
export default () => { 
  return(
    <SettingsProvider settings={defaultSettings}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}} >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </SettingsProvider>
  );
}
