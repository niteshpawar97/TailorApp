import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from './src/views/SplashScreen';
import LoginView from './src/views/LoginView';
import DashboardView from './src/views/DashboardView';
import StatusScreen from './src/views/StatusScreen';
import StockScreen from './src/views/StockScreen';
import CustomerScreen from './src/views/CustomerScreen';
import NewOrderScreen from './src/views/NewOrderScreen';
import HistoryScreen from './src/views/HistoryScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(() => {
    Appearance.setColorScheme('light');
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('user');
      console.log('User data cleared from AsyncStorage.');

      // Navigate to the login or home screen
      navigation.navigate('Login'); // Replace 'Login' with your actual screen name
      console.log('Navigated to the Login screen.');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const DashboardNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={DashboardView}
        options={({navigation}) => ({
          headerTitle: 'Dashboard',
          headerRight: () => (
            <MaterialCommunityIcons.Button
              name="logout"
              backgroundColor="transparent"
              color="black"
              onPress={() => {
                // Implement your logout logic here
                try {
                  // Clear user data from AsyncStorage
                  AsyncStorage.removeItem('user');
                  console.log('User data cleared from AsyncStorage.');

                  // Navigate to the login or home screen
                  navigation.navigate('Login'); // Replace 'Login' with your actual screen name
                  console.log('Navigated to the Login screen.');
                } catch (error) {
                  console.error('Error logging out:', error);
                }
              }}
            />
          ),
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        })}
      />

      <Tab.Screen
        name="Status"
        component={StatusScreen}
        options={({navigation}) => ({
          headerTitle: 'Status',
          headerRight: () => (
            <MaterialCommunityIcons.Button
              name="logout"
              backgroundColor="transparent"
              color="black"
              onPress={() => {
                // Implement your logout logic here
                try {
                  // Clear user data from AsyncStorage
                  AsyncStorage.removeItem('user');
                  console.log('User data cleared from AsyncStorage.');

                  // Navigate to the login or home screen
                  navigation.navigate('Login'); // Replace 'Login' with your actual screen name
                  console.log('Navigated to the Login screen.');
                } catch (error) {
                  console.error('Error logging out:', error);
                }
              }}
            />
          ),
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="timetable"
              color={color}
              size={size}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Stock"
        component={StockScreen}
        options={({navigation}) => ({
          headerTitle: 'Stock',
          headerRight: () => (
            <MaterialCommunityIcons.Button
              name="logout"
              backgroundColor="transparent"
              color="black"
              onPress={() => {
                // Implement your logout logic here
                try {
                  // Clear user data from AsyncStorage
                  AsyncStorage.removeItem('user');
                  console.log('User data cleared from AsyncStorage.');

                  // Navigate to the login or home screen
                  navigation.navigate('Login'); // Replace 'Login' with your actual screen name
                  console.log('Navigated to the Login screen.');
                } catch (error) {
                  console.error('Error logging out:', error);
                }
              }}
            />
          ),
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="dolly" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Customers"
        component={CustomerScreen}
        options={({navigation}) => ({
          headerTitle: 'Customers',
          headerRight: () => (
            <MaterialCommunityIcons.Button
              name="logout"
              backgroundColor="transparent"
              color="black"
              onPress={() => {
                // Implement your logout logic here
                try {
                  // Clear user data from AsyncStorage
                  AsyncStorage.removeItem('user');
                  console.log('User data cleared from AsyncStorage.');

                  // Navigate to the login or home screen
                  navigation.navigate('Login'); // Replace 'Login' with your actual screen name
                  console.log('Navigated to the Login screen.');
                } catch (error) {
                  console.error('Error logging out:', error);
                }
              }}
            />
          ),
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          ),
        })}
      />

      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={({navigation}) => ({
          headerTitle: 'History',
          headerRight: () => (
            <MaterialCommunityIcons.Button
              name="logout"
              backgroundColor="transparent"
              color="black"
              onPress={() => {
                // Implement your logout logic here
                try {
                  // Clear user data from AsyncStorage
                  AsyncStorage.removeItem('user');
                  console.log('User data cleared from AsyncStorage.');

                  // Navigate to the login or home screen
                  navigation.navigate('Login'); // Replace 'Login' with your actual screen name
                  console.log('Navigated to the Login screen.');
                } catch (error) {
                  console.error('Error logging out:', error);
                }
              }}
            />
          ),
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        })}
      />

      <Tab.Screen
        name="New Order"
        component={NewOrderScreen}
        options={({navigation}) => ({
          headerTitle: 'New Order',
          headerRight: () => (
            <MaterialCommunityIcons.Button
              name="logout"
              backgroundColor="transparent"
              color="black"
              onPress={() => {
                // Implement your logout logic here
                try {
                  // Clear user data from AsyncStorage
                  AsyncStorage.removeItem('user');
                  console.log('User data cleared from AsyncStorage.');

                  // Navigate to the login or home screen
                  navigation.navigate('Login'); // Replace 'Login' with your actual screen name
                  console.log('Navigated to the Login screen.');
                } catch (error) {
                  console.error('Error logging out:', error);
                }
              }}
            />
          ),
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default App;
