import Config from '../api/Config';
import {
  sendPostRequest,
  sendGetRequest,
} from '../helpers/apiRequestWithHeaders';

const OrderController = {

 updateOrderStatus: async (orderID, dStatus) => {
    try {
      let orderUrl = '';

      if (dStatus === 'Ready') {
        // orderdetails?oid=1111111163&dstatus=Ready
        orderUrl = `${Config.ORDER_DETAILS_API}?oid=${orderID}&dstatus=Ready`;
      } else if (dStatus === 'Delivered') {
        // orderdetails?oid=1111111163&dstatus=Delivered
        orderUrl = `${Config.ORDER_DETAILS_API}?oid=${orderID}&dstatus=Delivered`;
      }
      const response = await sendGetRequest(orderUrl);

      if (response.error) {
        // If error is true, return the original error message as it is
        return response;
      }

      return response;
    } catch (error) {
      throw new Error(error);
    }
  },

  payOrderAmount: async (orderID, paidAmt, paidMode) => {
    try {
      
        // /orderdetails?oid=1111111163&paidamt=100&paidmode=Cash
        payOrderUrl = `${Config.ORDER_DETAILS_API}?oid=${orderID}&paidamt=${paidAmt}&paidmode=${paidMode}`;

      const response = await sendGetRequest(payOrderUrl);

      if (response.error) {
        // If error is true, return the original error message as it is
        return response;
      }

      return response;
      // LOG  payOrderData : {"data": 1, "error": false, "message": "Payment Update Successfully."}
    } catch (error) {
      throw new Error(error);
    }
  },

};

export default OrderController;
