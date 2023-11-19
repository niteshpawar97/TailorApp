import React from 'react';
import { View, Modal, Text } from 'react-native';
import { Button } from 'react-native-paper';

const SuccessPopup = ({ isVisible, errorMessage, successMessage, onClose }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View className='flex-1 justify-center items-center'>
      <View
            className={
              successMessage
                ? 'bg-green-400 p-4 rounded-lg shadow-lg'
                : 'bg-red-400 p-4 rounded-lg shadow-lg'
            }>
          <Text className='text-gray-600 font-bold text-lg mb-5'>
            {successMessage ? 'Success' : 'Error'}: {successMessage || errorMessage}
          </Text>
          <Button
            mode="contained"
            className='bg-gray-300 text-gray-900 font-bold rounded'
            onPress={onClose}
          >
            <Text className={
              successMessage
                ? 'text-green-400 text-base'
                : 'text-red-400 text-base'
            }>OK</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessPopup;
