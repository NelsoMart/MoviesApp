/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

  import 'react-native-gesture-handler'; 

  import React, {useEffect, useState } from 'react';
  
  
  import { View, Text, BackHandler, ToastAndroid, AsyncStorage,
           TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
  
  import {navigationRef} from './Navigators/RootNavigation'; 
  
  import { NavigationContainer } from '@react-navigation/native';

  
  import { createSwitchNavigator } from '@react-navigation/compat';
  
  import MyStack from './Componentes/stack/MyStack';
  import LoginScreen from './Componentes/LoginScreen';
  import Welcome from './Componentes/Welcome';

  import { SafeAreaProvider } from 'react-native-safe-area-context';


  import { enableScreens } from 'react-native-screens';
  enableScreens();

   export default function App () {
        return (
          <SafeAreaProvider>
            <WrapedNavigation />
          </SafeAreaProvider>
        );
   }
  
    function WrapedNavigation () { 
      return(
        <NavigationContainer ref={navigationRef} >
            <SwitchNavigator/>
        </NavigationContainer>
      );
    }
  
    const SwitchNavigator = createSwitchNavigator(
      {
        Welcome: Welcome, 
        LoginScreen: LoginScreen, 
        Home: MyStack,
      },
      {
        initialRouteName:'Welcome'
      }
    );
  