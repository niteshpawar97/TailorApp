import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Appearance, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './navigation/AppNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    Appearance.setColorScheme('light');
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
    </KeyboardAvoidingView>
  );
};

export default App;
