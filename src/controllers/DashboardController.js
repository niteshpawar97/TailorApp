import Config from '../api/Config';
import {
  sendPostRequest,
  sendGetRequest,
} from '../helpers/apiRequestWithHeaders';

const DashboardController = {
  checkDashboardData: async () => {
    try {
      // Use the sendGetRequest method to make a GET request
      const response = await sendGetRequest(Config.DASHBOARD_API);
  
      if (response.error) {
        // If error is true, return the original error message as it is
        return response;
      }
  
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  
};

export default DashboardController;
