import Config from '../api/Config';
import {
  sendPostRequest,
  sendGetRequest,
  sendPutRequest,
  sendDeleteRequest,
} from '../helpers/apiRequestWithHeaders';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {LOGIN_API, LOGOUT_API, USER_CHECK_API} = Config;

const LoginController = {
  login: async (username, password) => {
    console.log(LOGIN_API);
    try {
      const LoginData = {username, password}; // Define LoginData object
      console.log(LoginData);

      const response = await sendPostRequest(LOGIN_API, LoginData); // Make the POST request

      console.log('POST Response:', response);

      if (response.error) {
        throw new Error(response.message);
      }

      return response.user;
    } catch (error) {
      throw new Error(error);
    }
  },

  checkLoginStatus: async () => {
    try {
      // Use the sendGetRequest method to make a GET request
      const response = await sendGetRequest(USER_CHECK_API);
  
      if (response.error) {
        // If error is true, return the original error message as it is
        return response;
      }
  
      return response.user;
    } catch (error) {
      throw new Error(error);
    }
  },
  

  logout: async () => {
    try {
      // Use the sendGetRequest method to make a GET request to the logout API
      const response = await sendGetRequest(LOGOUT_API);

      if (response.error) {
        throw new Error(response.message);
      }
      // If there is no error, it means the logout was successful
      // You can clear user data from AsyncStorage
      await AsyncStorage.removeItem('user');
      console.log('User data cleared from AsyncStorage.');

      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default LoginController;
