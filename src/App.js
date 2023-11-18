import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Appearance, KeyboardAvoidingView, Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './navigation/AppNavigator';
import NetInfo from '@react-native-community/netinfo';
import InternetStatus from './components/InternetStatus'; // Adjust the path change

const Stack = createNativeStackNavigator();

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    Appearance.setColorScheme('light');

    const unsubscribe = NetInfo.addEventListener(state => {
      const { isConnected: newIsConnected } = state;

      // Log messages for debugging
      if (newIsConnected) {
        console.log('Connected to the Internet');
      } else {
        console.log('No Internet Connection');
      }

      setIsConnected(newIsConnected);
    });

    return () => {
      unsubscribe();
    };

  }, []);

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : null}
  >

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={AppNavigator.Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={AppNavigator.Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={AppNavigator.DashboardNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

    {/* Internet connection status with custom styles */}
    <InternetStatus isConnected={isConnected} />

    </KeyboardAvoidingView>
  );
};

export default App;
