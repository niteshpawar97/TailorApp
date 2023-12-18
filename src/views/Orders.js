// History.js
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {TextInput} from 'react-native-paper';
import Config from '../api/Config';
import {
  sendPostRequest,
  sendGetRequest,
} from '../helpers/apiRequestWithHeaders';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
import OrderDetailsModal from '../components/OrderDetailsModal';
import LoaderOnly from '../components/LoaderOnly'; // Adjust the path based on your project structure

const HistoryScreen = ({navigation}) => {
  // State to manage the date range and search term
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderHistoryData, setOrderHistoryData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  useEffect(() => {
    // Update filteredData when searchTerm or orderHistoryData changes
    const filtered = orderHistoryData.filter(
      item =>
        item.mobile.toString().includes(searchTerm) ||
        item.order_id.toString().includes(searchTerm) || // Check if search term is in order ID
        item.name.toLowerCase().includes(searchTerm.toLowerCase()), // Check if search term is in name
    );
    setFilteredData(filtered);
  }, [searchTerm, orderHistoryData]);

  // Use useFocusEffect to fetch order history data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchOrderHistory();
    }, []), // The empty dependency array ensures this effect runs only once when the component mounts
  );

  // fetchOrderHistory
  const fetchOrderHistory = async () => {
    setIsLoading(true);
    try {
      const response = await sendGetRequest(Config.ORDER_HISTORY_API);

      if (response && response.data) {
        setIsLoading(true);
        setOrderHistoryData(response.data);
        setError('');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError('Error fetching orders data');
      }
    } catch (error) {
      setIsLoading(false);
      setError('Error fetching orders data: ' + error.message);
    }
  };

  // fetchOrderDetails single order
  const fetchOrderDetails = async order_id => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const url = `${Config.ORDER_DETAILS_API}?oid=${order_id}`;
      console.log('GET ORDER_DETAILS_API:', url);
      const data = await sendGetRequest(url);
      console.log('GET Response:', data);
      if (data.error === false) {
        setOrderDetails(data.data[0]);
        setIsModalVisible(true); // Show modal after fetching data
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Error fetching order details:', error);
    }
    setIsLoading(false);
  };

  const closeModal = () => {
    setOrderDetails({}); // Use setOrderDetails to update the state
    setIsModalVisible(false);
  };

  return (
    <View className="py-2 px-4">
      {/* Render your content or handle error state */}

      <View className="flex flex-row justify-end items-center gap-x-10">
        <TextInput
          className="bg-gray-200 rounded-full mr-0 w-96"
          mode="outlined"
          label="Search"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
      </View>

      <View className="flex flex-row justify-between bg-gray-300 mt-1  py-2 px-3">
        <Text className="w-10 text-gray-950 font-normal">#</Text>
        <Text className="w-1/12 text-gray-950 font-normal">Order Id</Text>
        <Text className="w-1/12 text-gray-950 font-normal">Name</Text>
        <Text className="w-1/12 text-gray-950 font-normal">Mobile</Text>
        <Text className="w-1/12 text-gray-950 font-normal">Balance</Text>
        <Text className="w-1/12 text-gray-950 font-normal">Order</Text>
        <Text className="w-1/12 text-gray-950 font-normal">Delivery</Text>
        <Text className="w-1/12 text-gray-950 font-normal">Status</Text>
        <Text className="w-1/8 text-red-500 font-normal">Action</Text>
      </View>

      {error && <Text style={{color: 'red', marginBottom: 10}}>{error}</Text>}
      <LoaderOnly isLoading={isLoading} />

      {/* Show loader only when isLoadingDetails is true */}
      {isLoadingDetails && <LoaderOnly isLoading={true} />}

      <FlatList
        className="mb-4"
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View className="flex flex-row justify-between items-center bg-gray-100 border py-1 px-3 mt-1">
            <Text className="w-10 text-gray-950  text-lg font-medium">
              {index + 1}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.order_id}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.name}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.mobile}
            </Text>
            <Text
              className={`w-1/12 text-lg font-medium ${
                item.balance === '0' ? 'text-gray-800' : 'text-red-500'
              }`}>
              {item.balance}
            </Text>

            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.order_date}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.delivery_date}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.delivery_status}
            </Text>
            <TouchableOpacity
              className="w-1/8"
              onPress={() => fetchOrderDetails(item.order_id)}>
              <Text className="bg-gray-700 w-1/8 text-white font-medium text-base py-2 px-2 -mr-2 rounded-md">
                View
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Render OrderDetailsModal outside of FlatList */}
      {isModalVisible && (
        <OrderDetailsModal
          isVisible={isModalVisible}
          orderDetails={orderDetails}
          onClose={closeModal}
        />
      )}
    </View>
  );
};

export default HistoryScreen;
