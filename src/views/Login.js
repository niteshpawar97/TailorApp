import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LoginController from '../controllers/LoginController';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import ErrorPopup from '../components/ErrorPopup';

const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to track errors
  const navigation = useNavigation();

  const handleCloseError = () => {
    setError(null); // Clear the error message
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password.');
      return; // Don't proceed with login if fields are empty
    }
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
      //navigation.navigate('Dashboard');

      if (user.role === 'CLIENT') {
        // User is a CLIENT, navigate to Dashboard
        navigation.replace('Dashboard'); // Replace 'Dashboard' with your screen name
        console.log('Login Success: user data if exists');
      } else if (user.role === 'MANAGER') {
        // User is a MANAGER, navigate to AgentDashboard
        navigation.replace('AgentDashboard'); // Replace 'AgentDashboard' with your screen name
        console.log('Agent Login Success: user data if exists');
      } else {
        // Handle other roles if needed
        console.log('Unknown role. Unable to determine navigation.');
      }


    } catch (error) {
      setError(error.message); // Set the error message in state
    }
  };

  return (
    <View className="h-full w-full flex-1 flex justify-center items-center">
      <Image
        source={require('../assets/login_bg.jpg')}
        resizeMode="cover"
        className="absolute w-full h-full z-0"
      />

      <View className="flex py-6 px-12 w-96 bg-gray-200 rounded-lg shadow-lg">
        <View className="flex w-72 flex-col gap-6 mb-4">
          <Text className="text-gray-800 text-2xl text-center font-semibold mt-0 mb-2">
            Welcome to Login
          </Text>
          <TextInput
            mode="outlined"
            label="Username"
            className="rounded-md mt-2 w-full"
            placeholder="Username"
            onChangeText={text => setUsername(text)}
            value={username}
            autoCorrect={false}
            autoCompleteType="off" // Disable auto-completion
            autoCapitalize="none" // Turn off auto-capitalization
          />

          <TextInput
            mode="outlined"
            label="Password"
            className="rounded-md mt-2 w-full"
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-gray-800  w-72 font-bold py-2 px-4 rounded-xl -mb-2">
            <Text className="text-center text-white font-semibold text-xl">
              Login
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            // onPress={handleLogin}
            className="bg-gray-400  w-72 font-bold py-2 px-4 rounded-xl">
            <Text className="text-center text-gray-700 font-semibold text-xl">
              Reset Password
            </Text>
          </TouchableOpacity> */}

          <ErrorPopup
            isVisible={error !== null}
            errorMessage={error}
            onClose={handleCloseError}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginView;
