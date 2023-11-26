// MPModal.js
import React from 'react';
import {View, Modal, Text, FlatList, TouchableOpacity} from 'react-native';

const MPModal = ({isVisible, suggestions, onClose}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center">
        <View className="bg-white p-4 rounded w-1/2">
          <Text className="text-xl font-bold mb-2">MP Suggestions</Text>
          <View className="flex flex-row justify-between bg-gray-300 mt-1  py-2 px-3">
            <Text className="w-2  text-gray-950 font-extrabold">#</Text>
            <Text className="w-1/8 text-gray-950 font-extrabold">Name</Text>
            <Text className="w-1/8  text-gray-950 font-extrabold">
              Measurement
            </Text>
            {/* <Text className="w-1/8  text-gray-950 font-extrabold">Action</Text> */}
          </View>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View className="flex flex-row justify-between items-center bg-gray-100 border border-gray-400 py-1 px-3 mt-1">
                <Text className="w-2 text-gray-950  text-lg font-medium">
                  {index + 1}
                </Text>
                <Text className="w-1/8 text-gray-950 text-lg font-bold">
                  {item.name}
                </Text>
                <Text className="w-1/8 text-gray-950  text-lg font-medium">
                  {item.measurement}{' '}
                </Text>
                {/* ... (Render other properties of the object) */}
              </View>
            )}
          />
          
          <TouchableOpacity className="w-1/8" onPress={onClose}>
            <Text className="bg-gray-200 w-14 text-lg p-2 text-gray-900 mt-4 rounded-md">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MPModal;
