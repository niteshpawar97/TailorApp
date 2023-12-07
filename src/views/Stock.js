// History.js
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import {TextInput} from 'react-native-paper';
import Config from '../api/Config';
import {sendGetRequest} from '../helpers/apiRequestWithHeaders';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
import LoaderOnly from '../components/LoaderOnly'; // Adjust the path based on your project structure

const StockScreen = ({navigation}) => {
  // State to manage the date range and search term
  const [searchTerm, setSearchTerm] = useState('');
  const [stocksData, setStocksData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchStock();
  }, []);

  useEffect(() => {
    // Update filteredData when searchTerm or stocksData changes
    const filtered = stocksData.filter(item =>
      item.type.toString().includes(searchTerm) || // Check if search term is in order ID
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) // Check if search term is in name
  );
    setFilteredData(filtered);
  }, [searchTerm, stocksData]);

  // Use useFocusEffect to fetch order history data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchStock();
    }, []), // The empty dependency array ensures this effect runs only once when the component mounts
  );

  const fetchStock = async () => {
    try {
      const response = await sendGetRequest(Config.STOCK_LIST_API);
      if (response && response.data) {
        setStocksData(response.data);
        setIsLoading(false);
        setError('');
      } else {
        setError('Error fetching stock data');
        setIsLoading(false);
      }
    } catch (error) {
      setError('Error fetching stock data: ' + error.message);
      setIsLoading(false);
    }
  };

  return (
    <View className="py-2 px-4">
      <View className="flex flex-row justify-end items-center gap-x-10">
        <TextInput
          className="bg-gray-100 rounded-full mr-0 w-96"
          mode="outlined"
          label="Search"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
      </View>

      <View className="flex flex-row justify-between  items-center bg-gray-300 mt-1  py-2 px-3">
        <Text className="text-gray-950 font-extrabold">#</Text>
        <Text className="w-1/4 text-gray-950 font-extrabold">Name</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Type</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Stock</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Unit</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Price</Text>
      </View>

      <LoaderOnly isLoading={isLoading} />
      {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}

      <FlatList
        className="mb-24"
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View className="flex flex-row justify-between items-center bg-gray-100 border border-gray-400 py-1 px-3 mt-1">
            <Text className=" text-gray-950  text-lg font-medium">
              {index + 1}
            </Text>
            <Text className="w-1/4 text-gray-950  text-lg font-medium">
              {item.name}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.type}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.stock}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.unit}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.price}
            </Text>
          </View>
        )}
      />

      
    </View>
  );
};

export default StockScreen;
