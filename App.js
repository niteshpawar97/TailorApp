import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Appearance } from 'react-native';
import { Image } from 'native-base'; // Import Image component from NativeBase
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './src/views/SplashScreen';
import LoginView from './src/views/LoginView';
import DashboardView from './src/views/DashboardView';
import StatusScreen from './src/views/StatusScreen';
import StockScreen from './src/views/StockScreen';
import CustomerScreen from './src/views/CustomerScreen';
import NewOrderScreen from './src/views/NewOrderScreen';
import HistoryScreen from './src/views/HistoryScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(() => {
    Appearance.setColorScheme('light');
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginView} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardNavigator}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const DashboardNavigator = () => {
  return (
    <Tab.Navigator
    tabBarOption={{
      showLabel: false,
      style: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#FF00FF',
        borderRadius: 15,
        height: 90,
      }
    }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardView} 
        options={{ headerShown: false,
          
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}

      />

      <Tab.Screen
        name="Status"
        component={StatusScreen}
        options={{
          tabBarLabel: 'Status',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="timetable" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Stock"
        component={StockScreen}
        options={{
          tabBarLabel: 'Stock',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dolly" color={color} size={size} />
          ),
        }}
      />
<Tab.Screen
        name="Customers"
        component={CustomerScreen}
        options={{
          tabBarLabel: 'Customers',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="New Order"
        component={NewOrderScreen}
        options={{
          tabBarLabel: 'New Order',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
