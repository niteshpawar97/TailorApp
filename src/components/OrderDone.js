//src/components/OrderSuccessPopup.js
import React from 'react';
import {View, Modal} from 'react-native';
import InvoicePrint from './InvoicePrint';
import {Button, Text} from 'react-native-paper';
import Share from 'react-native-share';

const OrderSuccessPopup = ({
  isVisible,
  isInvoicePrintVisible,
  isLoading,
  orderDetails,
  onClose,
  onInvoicePrint,
  invoiceDetails,
}) => {

  // Create a function to handle sharing order details
  const handleShareOrder = () => {
      // Parse details
  const customer = JSON.parse(invoiceDetails.customer_details);
  const billing = JSON.parse(invoiceDetails.billing_details);
  const selectedItems = JSON.parse(invoiceDetails.products_details);

  // Extracting order details
  const orderId = invoiceDetails.order_id;
  const orderDate = new Date(invoiceDetails.order_date).toLocaleDateString();
  const deliveryDate = new Date(
    invoiceDetails.delivery_date,
  ).toLocaleDateString();

  // Create a function to format order details
  const formatOrderDetails = () => {
    let formattedDetails = `
--------------Order Details--------------
Name: ${customer.name}
Phone: ${customer.mobile}
orderId: ${orderId}
orderDate: ${orderDate}
DeliveredDate: ${deliveryDate}
----------------------------------------`;

    // Loop through selected items and add details to the formatted string
    selectedItems.forEach((item, index) => {
      formattedDetails += `
    Dress Type  : ${item.dress_type}
    Dress Name  : ${item.dress_name}
    Size        : ${item.size || '-'}
    Quantity    : ${item.quantity}
    Unit        : ${item.unit || '-'}
    MP Name     : ${item.new_mp_name}
    Measurement : ${item.measurement || '-'}
---------------------------------------------------------`;
    });

    return formattedDetails;
  };
    const orderDetailsString = formatOrderDetails();

    const shareOptions = {
      title: 'Share Order Details',
      message: orderDetailsString,
      url: undefined,
      subject: 'Order Details',
    };

    Share.open(shareOptions)
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View className="flex-1 justify-center items-center ">
        <View className="bg-green-500 backdrop-blur-3xl p-16 rounded-lg  shadow-xl shadow-gray-950">
          <Text className="text-white font-bold text-2xl mb-5">
            Order Placed Successfully!
          </Text>

          {/* Display order details */}
          <Text className="text-white text-xl mb-2">
            Order ID: {orderDetails.order_id}
          </Text>
          <Text className="text-white text-xl mb-5">
            Message: {orderDetails.message}
          </Text>
          <View className="flex flex-row gap-6 mt-2">
            <Button
              className="bg-white text-green-500 font-bold rounded mb-4 px-6 py-3"
              onPress={onInvoicePrint}>
              <Text className="text-green-500 font-bold text-xl">
                Invoice Print
              </Text>
            </Button>

            {/* Render InvoicePrint component based on visibility */}
            {isLoading && <Text>Loading, please wait...</Text>}
            {isInvoicePrintVisible && (
              <InvoicePrint invoiceDetails={invoiceDetails} />
            )}

            <Button
              className="bg-white text-green-500 font-bold rounded mb-4 px-6 py-3"
              onPress={handleShareOrder}>
              <Text className="text-green-500 font-bold text-xl">
                Share Order Details
              </Text>
            </Button>

            <Button
              className="bg-white text-green-500 font-bold rounded mb-4 px-6 py-3"
              onPress={onClose}>
              <Text className="text-green-500 font-bold text-xl">
                New Order/Close
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OrderSuccessPopup;
