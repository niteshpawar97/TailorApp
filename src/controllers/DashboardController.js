// src/controllers/DashboardController.js
import UserModel from '../models/UserModel'; // Import the UserModel

const DashboardController = {
  fetchUserData: async () => {
    try {
      // Simulate fetching user data (replace with your actual data source)
      const userData = {
        user_id: 2,
        role: 'superadmin',
        username: 'nitesh',
        password_hash: '1234',
        subscription_type: 'Basic',
        session_id: '2495060146',
        session_date: '2023-05-15T19:33:03.000Z',
      };

      // Parse the user data using UserModel
      const userModel = UserModel.fromJSON(userData);
      return userModel;
    } catch (error) {
      throw error; // Rethrow the error for handling in your component
    }
  },
};

export default DashboardController;
