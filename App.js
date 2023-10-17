/**
 * @format
 */


import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/views/SplashScreen';
import LoginView from './src/views/LoginView';
import DashboardView from './src/views/DashboardView';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginView} options={{headerShown: false}} />
        <Stack.Screen name="Dashboard" component={DashboardView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
