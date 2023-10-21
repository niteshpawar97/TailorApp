import React from 'react';
import { View, Text, Modal, Button } from 'react-native';

const ErrorPopup = ({ isVisible, errorMessage, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
      <View className="flex justify-center items-center mt-72">
        <View className="bg-red-500 p-4 rounded-lg shadow-lg">
          <Text className="text-white font-bold text-lg mb-5">Error: {errorMessage}</Text>
          <Button
            className="mt-4 bg-white text-red-500 font-bold px-4 py-2 rounded"
            title="OK"
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ErrorPopup;
