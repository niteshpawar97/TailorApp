import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../views/Splash';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import Status from '../views/Status';
import Stock from '../views/Stock';
import Customer from '../views/Customer';
import NewOrder from '../views/NewOrder';
import History from '../views/History';
import { KeyboardAvoidingView, Platform } from 'react-native'; // Import KeyboardAvoidingView
const Tab = createBottomTabNavigator();

const AppNavigator = {
  DashboardNavigator: () => {
    return (
      
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Dashboard}
          options={({navigation}) => ({
            headerTitle: 'TailorApp',
            headerRight: () => (
                <MaterialCommunityIcons.Button
                  name="logout"
                  backgroundColor="transparent"
                  color="black"
                  onPress={async () => {
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
          name="New Order"
          component={NewOrder}
          options={({navigation}) => ({
            headerTitle: 'New Order',
            headerLeft: () => (
              <MaterialCommunityIcons.Button
                name="arrow-left"
                backgroundColor="transparent"
                color="black"
                onPress={() => {
                  // Implement your back button logic here
                  navigation.goBack();
                }}
              />
            ),
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
                name="plus-box"
                color={color}
                size={size}
              />
            ),
          })}
        />

        <Tab.Screen
          name="Status"
          component={Status}
          options={({navigation}) => ({
            headerTitle: 'Status',
            headerLeft: () => (
              <MaterialCommunityIcons.Button
                name="arrow-left"
                backgroundColor="transparent"
                color="black"
                onPress={() => {
                  // Implement your back button logic here
                  navigation.goBack();
                }}
              />
            ),
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
          component={Stock}
          options={({navigation}) => ({
            headerTitle: 'Stock',
            headerLeft: () => (
              <MaterialCommunityIcons.Button
                name="arrow-left"
                backgroundColor="transparent"
                color="black"
                onPress={() => {
                  // Implement your back button logic here
                  navigation.goBack();
                }}
              />
            ),
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
          component={Customer}
          options={({navigation}) => ({
            headerTitle: 'Customers',
            headerLeft: () => (
              <MaterialCommunityIcons.Button
                name="arrow-left"
                backgroundColor="transparent"
                color="black"
                onPress={() => {
                  // Implement your back button logic here
                  navigation.goBack();
                }}
              />
            ),
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
          component={History}
          options={({navigation}) => ({
            headerTitle: 'History',
            headerLeft: () => (
              <MaterialCommunityIcons.Button
                name="arrow-left"
                backgroundColor="transparent"
                color="black"
                onPress={() => {
                  // Implement your back button logic here
                  navigation.goBack();
                }}
              />
            ),
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
                name="history"
                color={color}
                size={size}
              />
            ),
          })}
        />
      </Tab.Navigator>
    );
  },
  // Define your other screens here
  Splash: Splash,
  Login: Login,
  Dashboard: Dashboard,
  NewOrder: NewOrder,
  History: History,
};

export default AppNavigator;
