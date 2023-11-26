import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../views/Splash';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import PayHistory from '../views/PayHistory';
import Stock from '../views/Stock';
import Customer from '../views/Customer';
import NewOrder from '../views/NewOrder';
import Orders from '../views/Orders';
import Profile from '../views/Profile';
import {KeyboardAvoidingView, Platform} from 'react-native'; // Import KeyboardAvoidingView
import LottieView from 'lottie-react-native';
import {
  getFocusedRouteNameFromRoute,
  useNavigation, useIsFocused 
} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const AppNavigator = {
  DashboardNavigator: ({route}) => {
    // Ensure that route is defined before accessing its properties
    const activeScreen = route ? getFocusedRouteNameFromRoute(route) : null;

    const {state} = useNavigation();

    const getTabIcon = (name, color, size) => {
      const animationSource = {
        Dashboard: require('../assets/lottie/home.json'),
        'New Order': require('../assets/lottie/order.json'),
        Orders: require('../assets/lottie/history.json'),
        PayHistory: require('../assets/lottie/pay.json'),
        Stock: require('../assets/lottie/stock.json'),
        Customers: require('../assets/lottie/customer.json'),
      };

      // const isFocused =
      // state && state.index === state.routes.findIndex(r => r.name === name);
      //const isFocused = route.name === name;
      const isFocused = useIsFocused();
      // console.log(`Tab: ${name}, isFocused: ${isFocused}`);
      // console.log('Route:', route); // Log the entire route object

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
            headerTitle: 'TailorApp',
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
            // tabBarIcon: ({color, size}) => (

            //    <MaterialCommunityIcons name="home" color={color} size={size} />
            //   // <LottieView
            //   //   source={require('../assets/lottie/home.json')}
            //   //   autoPlay
            //   // />
            // ),
            tabBarIcon: ({color, size}) => getTabIcon('Dashboard', color, size),
          })}
        />

        <Tab.Screen
          name="New Order"
          component={NewOrder}
          options={({navigation}) => ({
            headerTitle: 'New Order',
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
            
            tabBarIcon: ({color, size}) => getTabIcon('New Order', color, size),
          })}
        />

        <Tab.Screen
          name="Orders "
          component={Orders}
          options={({navigation}) => ({
            headerTitle: 'Orders',
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
            
            tabBarIcon: ({color, size}) => getTabIcon('Orders', color, size),
          })}
        />

        <Tab.Screen
          name="PayHistory"
          component={PayHistory}
          options={({navigation}) => ({
            headerTitle: 'PayHistory',
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
            tabBarIcon: ({color, size}) =>
              getTabIcon('PayHistory', color, size),
          })}
        />

        <Tab.Screen
          name="Stock"
          component={Stock}
          options={({navigation}) => ({
            headerTitle: 'Stock',
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
            tabBarIcon: ({color, size}) => getTabIcon('Stock', color, size),
          })}
        />
        <Tab.Screen
          name="Customers"
          component={Customer}
          options={({navigation}) => ({
            headerTitle: 'Customers',
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
  NewOrder: NewOrder,
  Orders: Orders,
};

export default AppNavigator;
