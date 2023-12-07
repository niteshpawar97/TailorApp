// StockModal.js
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import {View, Text, TouchableOpacity, Modal, } from 'react-native';
import StockController from '../controllers/StockController';
import LoaderOnly from '../components/LoaderOnly'; // Adjust the path based on your project structure

const StockModal = ({ isVisible, onClose, stockData }) => {
    const [proId, setProId] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [stock, setStock] = useState('');
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState('');
    const [updateResult, setUpdateResult] = useState(null); // State to hold the update result
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      // If stockData is provided, pre-fill the form fields for editing
      if (stockData) {
        setProId(stockData.id);
        setName(stockData.name);
        setType(stockData.type);
        setStock(stockData.stock.toString());
        setUnit(stockData.unit);
        setPrice(stockData.price.toString());
      } else {
        // If no stockData is provided, clear the form fields for adding new stock
        setName('');
        setProId('');
        setType('');
        setStock('');
        setUnit('');
        setPrice('');
      }
    }, [stockData]);
  
    const handleSave = async () => {
        
        setIsLoading(true);
      try {
        // Convert stock and price to numbers
  
        const stockData = {
          id: proId,
          dress_name: name,
          dress_name_arabic: '',
          dress_type: type,
          stock,
          unit,
          price,
          status: 1,
        };
  
        try {
          const response = await StockController.updateStock(stockData);
          setUpdateResult(response);
          console.log('Stock stockData :', stockData);
          console.log('Stock response :', response);
          setIsLoading(false);
        } catch (error) {
          console.error('Stock Update Error:', error.message);
          setIsLoading(false);
        }
      } finally {
        // Close the modal whether the update succeeds or fails
        onClose();
        setIsLoading(false);
      }
    };

  return (
    // Your modal JSX with TextInput components for each field
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center">
        <View className="bg-white p-8 rounded w-5/6  shadow-xl shadow-gray-950">
          <Text className="text-2xl text-green-500 font-normal mb-4 -mt-2">
            Stock Detail #{proId}
          </Text>
          <View className="gap-3">
            <TextInput
              mode="outlined"
              label="Name"
              className="rounded-md w-full"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              mode="outlined"
              label="Type"
              className="rounded-md w-full"
              value={type}
              onChangeText={setType}
            />

            <TextInput
              mode="outlined"
              label="Stock"
              className="rounded-md w-full"
              value={stock}
              onChangeText={setStock}
              keyboardType="numeric"
            />

            <TextInput
              mode="outlined"
              label="Unit"
              className="rounded-md w-full"
              value={unit}
              onChangeText={setUnit}
            />

            <TextInput
              mode="outlined"
              label="Price"
              className="rounded-md w-full"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>
          <View className="flex flex-row gap-8 justify-start">
            <TouchableOpacity onPress={handleSave}>
              <Text className="bg-green-400 text-lg py-2 px-12 text-gray-800 mt-4 rounded-md">
                SAVE
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-1/8" onPress={onClose}>
              <Text className="bg-gray-300 text-lg  py-2 px-12 text-gray-900 mt-4 rounded-md">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
      <LoaderOnly isLoading={isLoading} />

      </View>
    </Modal>
  );
};

export default StockModal;
