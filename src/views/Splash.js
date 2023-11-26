// SplashScreen.js
import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import {getDataFromAsyncStorage} from '../helpers/DataToAsyncStorage';

const SplashView = ({navigation}) => {
  useEffect(() => {
    const checkUserData = async () => {
      try {
        // Simulate a 2-second delay
        setTimeout(async () => {
          const userData = await getDataFromAsyncStorage('user');
          console.log(userData);
          if (userData !== null) {
            // User data exists, navigate to DashboardView
            // navigation.replace('Dashboard'); // Replace 'Dashboard' with your screen name
            // console.log('Login Success : user data if exits');

            if (userData.role === 'CLIENT') {
              // User is a CLIENT, navigate to Dashboard
              navigation.replace('Dashboard'); // Replace 'Dashboard' with your screen name
              console.log('Login Success: user data if exists');
            } else if (userData.role === 'MANAGER') {
              // User is a MANAGER, navigate to AgentDashboard
              navigation.replace('AgentDashboard'); // Replace 'AgentDashboard' with your screen name
              console.log('Agent Login Success: user data if exists', userData);
            } else {
              // Handle other roles if needed
              navigation.replace('Login'); // Replace 'Login' with your screen name
              console.log(
                'Unknown role. Unable to determine navigation.',
                userData.role,
              );
            }
          } else {
            // User data doesn't exist, navigate to LoginView
            navigation.replace('Login'); // Replace 'Login' with your screen name
            console.log('Login Show : user not exits');
          }
        }, 3000); // 2000 milliseconds = 2 seconds
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
    <View className="h-full w-full bg-gray-300 flex justify-center items-center">
      <Image
        source={require('../assets/app_logo.png')}
        resizeMode="contain"
        className="w-56 h-56 mx-auto"
      />

      <Text className="text-gray-800 text-3xl font-light pt-1 mt-36">
        Loading...
      </Text>
    </View>
  );
};

export default SplashView;
