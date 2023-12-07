import Config from '../api/Config';
import {
  sendPostRequest,
  sendGetRequest,
} from '../helpers/apiRequestWithHeaders';

const StockController = {

  updateStock: async (stockData) => {
    try {
      // Use the sendGetRequest method to make a GET request
      const response = await sendPostRequest(Config.STOCK_UPDATE_API, stockData);
      if (response.error) {
        // If error is true, return the original error message as it is
        return response;
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  
};

export default StockController;
