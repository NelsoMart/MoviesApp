
import React from 'react';

import SplashScreen from 'react-native-splash-screen';

import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

SplashScreen.hide();

function MyStack() {

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Best Movies"
        component={HomeScreen}
        options={{headerStyle: {height: 85}}}
      />
      <Stack.Screen
        name="Movie Detail"
        component={DetailScreen}
      />
      
    </Stack.Navigator>
  );
}

export default MyStack;
