import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../views/Splash';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import Profile from '../views/Profile';
import AgentDash from '../views/AgentStock';
import {KeyboardAvoidingView, Platform} from 'react-native'; // Import KeyboardAvoidingView
import LottieView from 'lottie-react-native';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const AgentNavigator = {
  AgentDashNavigator: ({route}) => {
    // Ensure that route is defined before accessing its properties
    const activeScreen = route ? getFocusedRouteNameFromRoute(route) : null;

    const {state} = useNavigation();

    const getTabIcon = (name, color, size) => {
      const animationSource = {
        Dashboard: require('../assets/lottie/home.json'),
        'New Order': require('../assets/lottie/order.json'),
        History: require('../assets/lottie/history.json'),
        PayHistory: require('../assets/lottie/pay.json'),
        AgentDash: require('../assets/lottie/stock.json'),
        Customers: require('../assets/lottie/customer.json'),
      };

      const isFocused = useIsFocused();

      return (
        <LottieView
          source={animationSource[name]}
          autoPlay={isFocused} // Auto play only for the focused screen
        />
      );
    };

    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Dashboard}
          options={({navigation}) => ({
            headerTitle: 'TailorApp : Agent',
            headerTintColor: '#FFFFFF', // Set the text color
            headerStyle: {backgroundColor: '#495373'},
            headerRight: () => (
              <MaterialCommunityIcons.Button
                name="logout"
                backgroundColor="transparent"
                color="white"
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

            tabBarIcon: ({color, size}) => getTabIcon('Dashboard', color, size),
          })}
        />

        <Tab.Screen
          name="AgentDash"
          component={AgentDash}
          options={({navigation}) => ({
            headerTitle: 'AgentDash',
            headerTintColor: '#FFFFFF', // Set the text color
            headerStyle: {backgroundColor: '#495373'},
            headerLeft: () => (
              <MaterialCommunityIcons.Button
                name="arrow-left"
                backgroundColor="transparent"
                color="white"
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
                color="white"
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

            tabBarIcon: ({color, size}) => getTabIcon('Customers', color, size),
          })}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={({navigation}) => ({
            headerTitle: 'Profile',
            headerTintColor: '#FFFFFF', // Set the text color
            headerStyle: {backgroundColor: '#495373'},
            headerLeft: () => (
              <MaterialCommunityIcons.Button
                name="arrow-left"
                backgroundColor="transparent"
                color="white"
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
                color="white"
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

            tabBarIcon: ({color, size}) => getTabIcon('Customers', color, size),
          })}
        />
      </Tab.Navigator>
    );
  },
  // Define your other screens here
  Splash: Splash,
  Login: Login,
  Dashboard: Dashboard,
};

export default AgentNavigator;
