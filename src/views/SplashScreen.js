// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      // Navigate to the login view after 3 seconds
      navigation.navigate('Login');
    }, 3000); // 2000 milliseconds = 2 seconds
  }, []);

  return (
    <View className="h-full w-full bg-yellow-200 flex justify-center items-center"> 
    {/* <Image
      source={require('../assets/tailor_bg.jpg')}
      resizeMode="cover"
      className="absolute w-full h-full z-0"
    /> */}

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

export default SplashScreen;
