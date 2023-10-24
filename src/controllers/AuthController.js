import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthController = {
  logout: async (navigation) => {
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
  },
};

export default AuthController;
