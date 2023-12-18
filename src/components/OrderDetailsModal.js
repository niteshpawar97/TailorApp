// OrderDetailsModal.js
import React, {useEffect, useState} from 'react';
import {View, Modal, Text, FlatList, TouchableOpacity} from 'react-native';
import InvoicePrint from '../components/InvoicePrint';
import Share from 'react-native-share';
import {useFocusEffect} from '@react-navigation/native';
import {TextInput, RadioButton} from 'react-native-paper';
import OrderController from '../controllers/OrderController';
import ConfirmModal from './ConfirmModal';

const OrderDetailsModal = ({isVisible, orderDetails, onClose}) => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setPaid('');
      setPaidmode('');
      setIsAmountValid(false);
      setConfirmModalVisible(false);
    }, []),
  );
  const [customMessage, setCustomMessage] = useState('');
  const [paid, setPaid] = useState('');
  const [paidMode, setPaidmode] = useState('');
  const [isAmountValid, setIsAmountValid] = useState(false);
  const products = JSON.parse(orderDetails.products_details);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleAmountChange = amount => {
    // Trim leading zeros and check if the entered amount is a valid positive number
    const trimmedAmount = amount.replace(/^0+/, '');
    const isValid = /^[1-9]\d*(\.\d{1,2})?$/.test(trimmedAmount);
    setIsAmountValid(isValid);
    setPaid(amount);
  };
  
  const handlePay = () => {
    // Call any other functions or perform actions as needed
    setCustomMessage("Are You Sure to Confirm PAY For Order ?");
    setConfirmModalVisible(true);
  };
  const handleConfirmPay = async () => {

    try {
      // Call the payOrderAmount function to handle payment
      const payOrderData = await OrderController.payOrderAmount(orderId, paid, paidMode);
      console.log('payOrderData :', payOrderData);
      setConfirmModalVisible(false);
    } catch (error) {
      // Handle errors, log, or show an error message to the user
      console.error('Payment error:', error);
      setConfirmModalVisible(false);
    }

    // Close both modals
    setConfirmModalVisible(false);
    setCustomMessage("");
    onClose();
  };

  const handleReady = () => {
    setCustomMessage("Are You Sure to Confirm Ready Order ?");
    setConfirmModalVisible(true);
  };
  const handleConfirmReady = () => {
    // Close both modals
    setConfirmModalVisible(false);
    setCustomMessage("");
    onClose();
  };

  const handleDelivered = () => {
      setCustomMessage("Are You Sure to Confirm Delivered Order ?");
      setConfirmModalVisible(true);
    };
    const handleConfirmDelivered = () => {

      // Close both modals
      setConfirmModalVisible(false);
      setCustomMessage("");
      onClose();
  };

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
    TagID  : *item.tag*
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
      // setIsLoading(true);
      // Set isInvoicePrintVisible to true to render the InvoicePrint component
      setIsInvoicePrintVisible(true);
    } catch (error) {
      console.error('Error printing bill:', error);
    } finally {
      // Set isLoading to false after the operation is complete
      // setIsLoading(false);
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
      <Text className="w-4 text-gray-950 text-center text-lg font-medium">
        {index + 1}
      </Text>
      <Text className="w-1/12 text-gray-950 text-center text-lg font-bold">
        {item.dress_name}
      </Text>
      <Text className="w-1/12 text-gray-950 text-center text-lg font-medium">
        {item.dress_type}
      </Text>
      <Text className="w-1/8 text-gray-950 text-center text-lg font-medium">
        {item.size}
      </Text>
      <Text className="w-1/8 text-gray-950 text-center text-lg font-medium">
        {item.quantity}
      </Text>
      <Text className="w-1/8 text-gray-950 text-center text-lg font-medium">
        {item.unit}
      </Text>
      <Text className="w-1/8 text-gray-950 text-center text-lg font-medium">
        {item.price}
      </Text>
      <Text className="w-1/8 text-gray-950 text-center text-lg font-medium">
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
          <View className="flex flex-row justify-end">
            <TouchableOpacity className="w-1/12" onPress={onClose}>
              <Text className="bg-gray-300 text-lg p-3 text-center text-red-600 rounded-md  -mt-4 -mr-4">
                Close
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-2xl text-green-500 font-light -mt-10">
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
          </View>

          <View className="flex flex-row justify-between bg-gray-300 mt-1  py-2 px-3">
            <Text className="w-4 text-gray-950 font-extrabold  text-center ">
              #
            </Text>
            <Text className="w-1/12 text-gray-950 font-extrabold  text-center">
              Name
            </Text>
            <Text className="w-1/12 text-gray-950 font-extrabold  text-center">
              Type
            </Text>
            <Text className="w-1/8 text-gray-950 font-extrabold  text-center">
              Size
            </Text>
            <Text className="w-1/8 text-gray-950 font-extrabold  text-center">
              Quantity
            </Text>
            <Text className="w-1/8  text-gray-950 font-extrabold  text-center">
              Unit
            </Text>
            <Text className="w-1/8  text-gray-950 font-extrabold  text-center">
              Price
            </Text>
            <Text className="w-1/8  text-gray-950 font-extrabold  text-center">
              Total
            </Text>
          </View>

          {/* Use FlatList to render the list of products */}
          <FlatList
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            style="mt-4"
          />

          <Text className="text-2xl text-gray-800 font-light mt-4">
            Payment Details
          </Text>
          <View className="flex flex-row justify-between mt-1  py-2 px-3">
            <Text className="w-1/8 text-gray-950 font-extrabold  text-center">
              Total
            </Text>
            <Text className="w-1/8 text-yellow-500 font-extrabold text-center">
              Discount
            </Text>
            <Text className="w-1/8 text-gray-950 font-extrabold text-center">
              Pay Total
            </Text>
            <Text className="w-1/8 text-gray-950 font-extrabold text-center">
              Paid Amount
            </Text>
            <Text className="w-1/12  text-gray-950 font-extrabold text-center">
              Paid Mode
            </Text>
            <Text className="w-1/8 text-red-500 font-extrabold text-center">
              Due Amount
            </Text>
          </View>

          <View className="flex flex-row justify-between bg-gray-100 border border-gray-400 py-1 px-3 mt-1">
            <Text className="w-1/8 text-gray-950 text-center text-lg">
              {billing.total}
            </Text>
            <Text className="w-1/8 text-yellow-500 text-center text-lg">
              {billing.discount}
            </Text>
            <Text className="w-1/8 text-gray-950 text-center text-lg">
              {billing.paytotal}
            </Text>
            <Text className="w-1/8 text-gray-950 text-center text-lg">
              {billing.paid}
            </Text>
            <Text className="w-1/12 text-gray-950 text-center text-lg">
              {billing.paidmode}
            </Text>
            <Text className="w-1/8 text-red-500  text-center text-xl">
              {billing.balance}
            </Text>
          </View>

          <View className="flex flex-row justify-between">
            <View className="flex flex-row gap-4 items-center justify-start">
              <TextInput
                mode="outlined"
                label="Enter Amount to Pay"
                value={paid}
                onChangeText={handleAmountChange}
                className="rounded-md w-40 text-green-600"
                keyboardType="numeric"
              />

              <RadioButton.Group
                onValueChange={value => setPaidmode(value)}
                value={paidMode}>
                <View className="flex-row mt-4">
                  <RadioButton.Item
                    position="leading"
                    label="Card"
                    value="card"
                    disabled={!isAmountValid}
                  />
                  <RadioButton.Item
                    position="leading"
                    label="Cash"
                    value="cash"
                    disabled={!isAmountValid}
                  />
                </View>
              </RadioButton.Group>

              <TouchableOpacity
                className="w-1/8"
                onPress={handlePay}
                disabled={!isAmountValid || !paidMode}>
                <Text
                  className={
                    isAmountValid && paidMode
                      ? 'bg-green-500 text-lg py-2 px-4 text-white mt-4 rounded-md'
                      : 'bg-gray-500 text-lg py-2 px-4 text-white mt-4 rounded-md'
                  }>
                  PAY {''}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex flex-row gap-4 justify-end">
              <TouchableOpacity
                className="w-1/8"
                onPress={() => handlePrintBill()}>
                <Text className="bg-green-500 text-lg p-2 text-white mt-4 rounded-md">
                  Print bill
                </Text>
              </TouchableOpacity>
              {/* Render InvoicePrint component based on visibility */}

              {isInvoicePrintVisible && (
                <InvoicePrint invoiceDetails={orderDetails} />
              )}

              <TouchableOpacity className="w-1/8" onPress={handleShareOrder}>
                <Text className="bg-green-500 text-lg p-2 text-white mt-4 rounded-md">
                  Share Order Details
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="w-1/8" onPress={handleReady}>
                <Text className="bg-green-500 text-lg p-2 text-white mt-4 rounded-md">
                  Ready{' '}
                </Text>
              </TouchableOpacity>

              {/* ConfirmModal */}
              <ConfirmModal
                isVisible={confirmModalVisible}
                onClose={() => setConfirmModalVisible(false)}
                onConfirm={handleConfirmPay}
                customMessage={customMessage}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OrderDetailsModal;
