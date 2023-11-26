// OrderDetailsModal.js
import React from 'react';
import {View, Modal, Text, FlatList, TouchableOpacity} from 'react-native';

const OrderDetailsModal = ({isVisible, orderDetails, onClose}) => {
  const products = JSON.parse(orderDetails.products_details);

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
      {/* ... (Render other properties of the object) */}
    </View>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center">
        <View className="bg-white p-4 rounded w-5/6">
          <Text className="text-xl text-green-500 font-bold mb-2">
            Order Details.
          </Text>
          <Text className="text-base">Order ID: {orderDetails.order_id}</Text>
          <View className="flex flex-row justify-between bg-gray-300 mt-1  py-2 px-3">
            <Text className="w-4  text-gray-950 font-extrabold">#</Text>
            <Text className="w-1/12 text-gray-950 font-extrabold">Name</Text>
            <Text className="w-1/12  text-gray-950 font-extrabold">Type</Text>
            <Text className="w-1/8  text-gray-950 font-extrabold">Size</Text>
            <Text className="w-1/8  text-gray-950 font-extrabold">
              Quantity
            </Text>
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
              // onPress={onClose}
            >
              <Text className="bg-green-500 text-lg p-2 text-white mt-4 rounded-md"> Print Bill </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-1/8"
              // onPress={onClose}
            >
              <Text className="bg-green-500 text-lg p-2 text-white mt-4 rounded-md">
                Print Order
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
