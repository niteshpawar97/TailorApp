// OrderDetailsModal.js
import React, {useEffect, useState} from 'react';
import {View, Modal, Text, FlatList, TouchableOpacity} from 'react-native';
import InvoicePrint from '../components/InvoicePrint';
import Share from 'react-native-share';

const OrderDetailsModal = ({isVisible, orderDetails, onClose}) => {
  const products = JSON.parse(orderDetails.products_details);

  const [isLoading, setIsLoading] = useState(false);
  const [isInvoicePrintVisible, setIsInvoicePrintVisible] = useState(false);

  // Parse details
  const customer = JSON.parse(orderDetails.customer_details);
  const billing = JSON.parse(orderDetails.billing_details);
  const selectedItems = JSON.parse(orderDetails.products_details);

  // Extracting order details
  const orderId = orderDetails.order_id;
  const orderDate = new Date(orderDetails.order_date).toLocaleDateString();
  const deliveryDate = new Date(
    orderDetails.delivery_date,
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

  const handlePrintBill = async () => {
    try {
      // Set isLoading to true to show the loading message
      setIsLoading(true);
      // Set isInvoicePrintVisible to true to render the InvoicePrint component
      setIsInvoicePrintVisible(true);
    } catch (error) {
      console.error('Error printing bill:', error);
    } finally {
      // Set isLoading to false after the operation is complete
      setIsLoading(false);
    }
  };

  // Create a function to handle sharing order details
  const handleShareOrder = () => {
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

  const renderItem = ({item, index}) => (
    <View className="flex flex-row justify-between items-center bg-gray-100 border border-gray-400 py-1 px-3 mt-1">
      <Text className="w-4 text-gray-950  text-lg font-medium">
        {index + 1}
      </Text>
      <Text className="w-1/12 text-gray-950 text-lg font-bold">
        {item.dress_name}
      </Text>
      <Text className="w-1/12 text-gray-950  text-lg font-medium">
        {item.dress_type}
      </Text>
      <Text className="w-1/8 text-gray-950  text-lg font-medium">
        {item.size}
      </Text>
      <Text className="w-1/8 text-gray-950  text-lg font-medium">
        {item.quantity}
      </Text>
      <Text className="w-1/8 text-gray-950  text-lg font-medium">
        {item.unit}
      </Text>
      <Text className="w-1/8 text-gray-950  text-lg font-medium">
        {item.price}
      </Text>
      <Text className="w-1/8 text-gray-950  text-lg font-medium">
        {item.total}
      </Text>
    </View>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center">
        <View className="bg-white p-4 rounded w-5/6  shadow-xl shadow-gray-950">
          <Text className="text-2xl text-green-500 font-light mb-2">
            Order Details. #{orderDetails.order_id}
          </Text>
          
          <View className="flex flex-row">
          <View className="flex-1 flex-cal mb-4">
            {/* Customer Details */}
            <Text className="text-2xl text-gray-800 font-light mt-2">
              Customer Details
            </Text>
            <Text className="text-xl text-gray-800 font-bold mt-2">
              Name: {customer.name}
            </Text>
            <Text className="text-xl text-gray-800 font-bold mt-2">
              Phone: {customer.mobile}
            </Text>
            <Text className="text-xl text-gray-800 font-bold mt-2">
            Whatsapp: {customer.whatsapp}
            </Text>
          </View>

          <View className="flex-1 flex-cal mb-4">
            {/* Billing Details */}
            <Text className="text-2xl text-gray-800 font-light mt-2">
              Billing Details
            </Text>
            <Text className="text-xl text-gray-950 font-bold mt-2">
            Total: {billing.total}
            </Text>
            <Text className="text-xl text-gray-500 font-bold mt-2">
            Discount: {billing.discount}
            </Text>
            <Text className="text-xl text-yellow-500 font-bold mt-2">
            Paytotal: {billing.paytotal}
            </Text>
          </View>

          <View className="flex-1 flex-cal mb-4">
            {/* Billing Details */}
            <Text className="text-xl text-gray-800 font-bold mt-2">
              
            </Text>
            <Text className="text-xl text-green-600 font-bold mt-2">
            Paid: {billing.paid}
            </Text>
            <Text className="text-xl text-red-500 font-bold mt-2">
            Balance: {billing.balance}
            </Text>
            <Text className="text-xl text-indigo-600 font-bold mt-2">
            Paidmode: {billing.paidmode}
            </Text>
          </View>

          </View>

          <View className="flex flex-row justify-between bg-gray-300 mt-1  py-2 px-3">
            <Text className="w-4 text-gray-950 font-extrabold">#</Text>
            <Text className="w-1/12 text-gray-950 font-extrabold">Name</Text>
            <Text className="w-1/12 text-gray-950 font-extrabold">Type</Text>
            <Text className="w-1/8 text-gray-950 font-extrabold">Size</Text>
            <Text className="w-1/8 text-gray-950 font-extrabold">Quantity</Text>
            <Text className="w-1/8  text-gray-950 font-extrabold">Unit</Text>
            <Text className="w-1/8  text-gray-950 font-extrabold">Price</Text>
            <Text className="w-1/8  text-gray-950 font-extrabold">Total</Text>
          </View>

          {/* Use FlatList to render the list of products */}
          <FlatList
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            style="mt-4"
          />
          <View className="flex flex-row gap-4 justify-end">
            <TouchableOpacity className="w-1/8" onPress={onClose}>
              <Text className="bg-gray-300 text-lg p-2 text-gray-900 mt-4 rounded-md">
                Close
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-1/8"
              onPress={() => handlePrintBill()}>
              <Text className="bg-green-500 text-lg p-2 text-white mt-4 rounded-md">
                Print bill
              </Text>
            </TouchableOpacity>
            {/* Render InvoicePrint component based on visibility */}
            {isLoading && <Text>Loading, please wait...</Text>}
            {isInvoicePrintVisible && (
              <InvoicePrint invoiceDetails={orderDetails} />
            )}

            <TouchableOpacity className="w-1/8" onPress={handleShareOrder}>
              <Text className="bg-green-500 text-lg p-2 text-white mt-4 rounded-md">
                Share Order Details
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-1/8"
              // onPress={onClose}
            >
              <Text className="bg-green-500 text-lg p-2 text-white mt-4 rounded-md">
                Pay
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-1/8"
              // onPress={onClose}
            >
              <Text className="bg-green-500 text-lg p-2 text-white mt-4 rounded-md">
                Ready{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OrderDetailsModal;
