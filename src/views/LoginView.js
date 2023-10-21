import React, {useState} from 'react';
import {View, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import LoginController from '../controllers/LoginController';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    
    try {
      const user = await LoginController.login(username, password); // Call the login method from LoginController

      // Handle a successful login, for example, navigate to the dashboard or update the UI.
      console.log('Login successful:', user);

      try {
        // Save user details in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(user));
        console.log('User details saved successfully');
      } catch (error) {
        console.error('Error saving user details:', error);
      }

       // Navigate to the DashboardView
       navigation.navigate('Dashboard');


    } catch (error) {
      // Handle login errors, for example, display an error message to the user.
      console.error('Login error:', error.message);
    }
  };

  return (
    <View className="h-full w-full flex justify-center items-center">
      <Image
        source={require("../assets/login_bg.jpg")}
        resizeMode="cover"
        className="absolute w-full h-full z-0"
      />

      <View className="bg-yellow-50 rounded-lg shadow-lg p-8 w-4/5">
        <Text className="text-gray-600 text-2xl text-center font-semibold mt-0 mb-5">
          Welcome to Login
        </Text>
        <TextInput
         className="placeholder-gray-800 text-placeholder-gray-800 border border-gray-400 rounded-md px-4 py-2 mt-2 w-full"
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={username}
          autoCorrect={false}
          autoCompleteType={false}
        />

        <TextInput
          className="placeholder-gray-800 text-placeholder-gray-800 border border-gray-400 rounded-md px-4 py-2 mt-6 mb-5 w-full "
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-gray-800 font-bold py-2 px-4 rounded-full border border-blue-700"
        >
          <Text className="text-center text-yellow-200 font-semibold text-xl">LOGIN</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default LoginView;
