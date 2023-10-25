import React from 'react';
import { View, Modal } from 'react-native';
import { Button, Text } from 'react-native-paper';

const ErrorPopup = ({ isVisible, errorMessage, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
      <View className="flex flex-1 justify-center items-center">
        <View className="bg-red-400 p-4 rounded-lg shadow-lg">
          <Text className="text-gray-800 font-bold text-lg mb-5">Error: {errorMessage}</Text>
          <Button
            mode="contained"
            className="bg-gray-200 text-red-500 font-bold rounded"
            onPress={onClose}
          >
            <Text className="text-red-800 font-extrabold">OK</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorPopup;
