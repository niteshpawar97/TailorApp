import Config from '../api/Config';
import {
  sendPostRequest,
  sendGetRequest,
  sendPutRequest,
  sendDeleteRequest,
} from '../helpers/apiRequestWithHeaders';

const { LOGIN_API } = Config;

const LoginController = {
  login: async (username, password) => {
    console.log(LOGIN_API);
    try {
      const LoginData = { username, password }; // Define LoginData object
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
};


export default LoginController;
