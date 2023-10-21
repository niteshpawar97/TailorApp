import Config from '../api/Config';

const { LOGIN_API } = Config;

const LoginController = {
  
  login: async (username, password) => {
    console.log(LOGIN_API);
    try {
      const response = await fetch(LOGIN_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // Handle HTTP errors more explicitly
        const errorData = await response.json();
        if (errorData && errorData.message) {
          throw new Error('Login failed with HTTP status: ' + response.status + '. ' + errorData.message);
        } else {
          throw new Error('Login failed with HTTP status: ' + response.status);
        }
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      // console.log('Login successful');
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
};

export default LoginController;
