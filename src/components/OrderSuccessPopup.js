//src/components/OrderSuccessPopup.js
import React from 'react';
import {View, Modal,} from 'react-native';
import InvoicePrint from '../components/InvoicePrint'; 
import OrderPrint from '../components/OrderPrint'; 
import { Button, Text } from 'react-native-paper';

const OrderSuccessPopup = ({ isVisible, isInvoicePrintVisible,  isLoading, orderDetails, onClose, onOrderPrint, onInvoicePrint, invoiceDetails }) => {


  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View className="flex-1 justify-center items-center ">
        <View className="bg-green-500 backdrop-blur-3xl p-16 rounded-lg shadow-lg">
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
            <Text className="text-green-500 font-bold text-xl">Invoice Print</Text>
          </Button>

          {/* Render InvoicePrint component based on visibility */}
          {isLoading && <Text>Loading, please wait...</Text>}
          {isInvoicePrintVisible && (
            <InvoicePrint invoiceDetails={invoiceDetails} />
          )}

          <Button
            
            className="bg-white text-green-500 font-bold rounded mb-4 px-6 py-3"
            onPress={onOrderPrint}>
            <Text className="text-green-500 font-bold text-xl">Order Print</Text>
          </Button>

          {/* Render InvoicePrint component based on visibility */}
          {isLoading && <Text>Loading, please wait...</Text>}
          {isInvoicePrintVisible && (
            <OrderPrint orderDetails={invoiceDetails} />
          )}

          <Button
            className="bg-white text-green-500 font-bold rounded mb-4 px-6 py-3"
            onPress={onClose}>
            <Text className="text-green-500 font-bold text-xl">New Order/Close</Text>
          </Button>
          </View>
          
        </View>
      </View>
    </Modal>
  );
};

export default OrderSuccessPopup;
