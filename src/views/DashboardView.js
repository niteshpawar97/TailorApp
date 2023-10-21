import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from './CustomHeader'; // Import the CustomHeader component


function DashboardView() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Function to fetch the user details from AsyncStorage
    const fetchUserDetails = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData !== null) {
          // User details found in AsyncStorage; parse the JSON data
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          console.log(parsedUser.username, ': login success');
        }
      } catch (error) {
        console.error('Error retrieving user details:', error);
      }
    };

    // Call the function to fetch user details when the component mounts
    fetchUserDetails();
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
    <View className="flex-1 flex-col">
    
      <View className="flex-1 flex justify-between">
        <View className="flex-1 bg-white p-4">
          {user && (
            <>
              <Text className="text-2xl text-yellow-600 font-semibold">User: {user.username}</Text>
              <Text className="text-2xl text-yellow-600 font-semibold">Password: {user.password_hash}</Text>
              <Text className="text-2xl text-yellow-600 font-semibold">Subscription type: {user.subscription_type}</Text>
            </>
          )}
          <Text className="mt-4 text-xl font-extrabold text-gray-800">Welcome to the TailorApp!</Text>
        </View>

        <View className="flex-1 flex flex-col">
          <View className="flex-1 bg-gray-300 p-4">
            <Text className="text-lg font-semibold">Footer</Text>
            
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardView;
