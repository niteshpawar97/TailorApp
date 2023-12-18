// src/components/ConfirmModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const ConfirmModal = ({ isVisible, onClose, onConfirm, customMessage  }) => {
    console.log('customMessage :' ,customMessage);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center">
        {/* <View style={{ backgroundColor: 'yellow', padding: 20, borderRadius: 10, width: '80%' }}> */}
        <View className="bg-yellow-400 p-6 rounded w-1/4  shadow-2xl shadow-black">

        <Text className="text-2xl text-gray-800 font-normal my-4">
        {customMessage || "Are you sure to confirm the order?"}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={onClose}>
              <Button mode="contained" color="#ff5c5c">
                No
              </Button>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm}>
              <Button mode="contained" color="#5cb85c">
                Yes
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
