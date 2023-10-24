// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashView = ({ navigation }) => {
  useEffect(() => {
    const checkUserData = async () => {
      try {
        // Simulate a 2-second delay
        setTimeout(async () => {
        const userData = await AsyncStorage.getItem('user');
        console.log(userData);
        if (userData !== null) {
          // User data exists, navigate to DashboardView
          navigation.replace('Dashboard'); // Replace 'Dashboard' with your screen name
          console.log('Login Success : user data if exits');
        } else {
          // User data doesn't exist, navigate to LoginView
          navigation.replace('Login'); // Replace 'Login' with your screen name
        console.log('Login Show : user not exits');
      }
    }, 2000); // 2000 milliseconds = 2 seconds
      } catch (error) {
        console.error('Error checking user data:', error);
        // In case of an error, navigate to the LoginView as a fallback
        navigation.replace('Login');
      }
    };

    // Check for user data and navigate accordingly
    checkUserData();
  }, [navigation]);

  return (
    <View className="h-full w-full bg-yellow-200 flex justify-center items-center"> 

    <Image
      source={require('../assets/app_logo.png')}
      resizeMode="contain"
      className="w-56 h-56 mx-auto"
    />

    <Text className="text-pink-950 text-3xl font-light pt-1 mt-36">Loading...
    </Text>

  </View>
  );
};

export default SplashView;
