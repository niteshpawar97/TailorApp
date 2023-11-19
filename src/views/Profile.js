// History.js
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {TextInput} from 'react-native-paper';
import Config from '../api/Config';
import {
  sendGetRequest,
  sendPostRequest,
} from '../helpers/apiRequestWithHeaders';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
import {getDataFromAsyncStorage} from '../helpers/DataToAsyncStorage';
import LottieView from 'lottie-react-native';
import LoginController from '../controllers/LoginController';
import MassagePopup from '../components/MassagePopup';

const StockScreen = ({navigation}) => {
  // State to manage the date range and search term

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Use useFocusEffect to fetch order history data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchUserDetails();
    }, []), // The empty dependency array ensures this effect runs only once when the component mounts
  );

  // Function to fetch the user details from AsyncStorage
  const fetchUserDetails = async () => {
    try {
      const userData = await getDataFromAsyncStorage('user');
      if (userData.uname) {
        // User details found in AsyncStorage; parse the JSON data
        setUserData(userData);
        // console.log(userData, ': userData');
        // console.log(userData.role);
      }
    } catch (error) {
      console.error('Error retrieving user details:', error);
    }
  };

  // Function to handle the change password request
  const handleChangePassword = async () => {
    // Validate input fields
    if (!currentPassword || !newPassword) {
      setError('Please enter both Current and New Password.');
      setPopupVisible(true); // Show the error popup
      return;
    }
    try {
      // Send the POST request
      const response = await LoginController.pwdChange(
        currentPassword,
        newPassword,
      );
      // Check the API response
      if (response.error) {
        // Handle the error case
        setError(response.message);
        setPopupVisible(true); // Show the error popup
      } else if (!response.error) {
        // Handle the success case
        setSuccess(response.message);
        setPopupVisible(true); // Show the success popup
      }
    } catch (error) {
      console.error('Error ChangePassword:', response);
      setError('An error occurred. Please try again.'); // Generic error message
      setPopupVisible(true); // Show the error popup
    }
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setPopupVisible(false);
    setCurrentPassword('');
    setNewPassword('');
    setError(''); // Clear the error message
    setSuccess(''); // Clear the success message
    navigation.navigate('Home');
  };

  return (
    <View className="py-2 px-4">
      <View className="flex flex-row py-2 px-4">
        <View className="flex-2 w-48 bg-gray-100 pl-10">
          <View className="flex-1 flex-cal items-center w-36">
            <LottieView
              className="w-40"
              source={require('../assets/lottie/user.json')}
              autoPlay
            />
            <Text className="text-gray-950 font-semibold text-2xl">
              {userData.uname}
            </Text>
            <Text className="text-xl font-light text-gray-600 mt-4">
              {userData.role}
            </Text>
          </View>
        </View>

        <View className="flex-none justify items bg-gray-100 pl-20 py-6">
          <Text className="text-3xl text-gray-950 mb-10">Change Password </Text>

          {/* Input fields for changing password */}
          <TextInput
            mode="outlined"
            label="Current Password"
            className="rounded-md mt-2 w-full"
            onChangeText={text => setCurrentPassword(text)}
            value={currentPassword}
            placeholder="Current Password"
          />
          <TextInput
            mode="outlined"
            label="New Password"
            className="rounded-md mt-2 w-full"
            onChangeText={text => setNewPassword(text)}
            value={newPassword}
            placeholder="New Password"
          />
          <View className="flex flex-row gap-3 mt-4">
            {/* Button to trigger password change */}
            <TouchableOpacity
              className="bg-gray-800 py-3 px-4 rounded-md"
              onPress={handleChangePassword}>
              <Text className="text-white font-bold text-base">
                {' '}
                Change Password
              </Text>
            </TouchableOpacity>
            {/* Button to navigate to a different screen (e.g., Home) */}
            <TouchableOpacity
              className="bg-gray-400 text-white font-bold py-3 px-4 rounded-md"
              onPress={() => navigation.navigate('Home')}>
              <Text className="text-white font-bold text-base"> Go Back </Text>
            </TouchableOpacity>

            {/* Success and error popups */}
            <MassagePopup
              isVisible={isPopupVisible}
              errorMessage={error}
              successMessage={success}
              onClose={handleClosePopup}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default StockScreen;
