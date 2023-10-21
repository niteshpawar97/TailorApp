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
        const errorData = await response.json();
        const errorMessage = errorData && errorData.message
          ? errorData.message
          : `Login failed with HTTP status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error);
    }
  },
};

export default LoginController;
