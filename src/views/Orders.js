// History.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Config from '../api/Config';
import {
  sendPostRequest,
  sendGetRequest,
} from '../helpers/apiRequestWithHeaders';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
import OrderDetailsModal from '../components/OrderDetailsModal';

const HistoryScreen = ({navigation}) => {
  // State to manage the date range and search term
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderHistoryData, setOrderHistoryData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const fetchOrderHistory = async () => {
    try {
      const response = await sendGetRequest(Config.ORDER_HISTORY_API);
      if (response && response.data) {
        setOrderHistoryData(response.data);
        setLoading(false);
        setError('');
      } else {
        setError('Error fetching orders data');
      }
    } catch (error) {
      setError('Error fetching orders data: ' + error.message);
    }
  };

  const fetchOrderDetails = async order_id => {
    try {
      const url = `${Config.ORDER_DETAILS_API}?oid=${order_id}`;
      console.log('GET ORDER_DETAILS_API:', url);
      const data = await sendGetRequest(url);
      console.log('GET Response:', data);
      if (data.error === false) {
        setOrderDetails(data.data[0]);
        setIsModalVisible(true); // Show modal after fetching data
      }
    } catch (error) {
      console.log('Error fetching order details:', error);
    }
  };

  const closeModal = () => {
    setOrderDetails({}); // Use setOrderDetails to update the state
    setIsModalVisible(false);
  };

  return (
    <View className="py-2 px-4">
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
        <Text className="w-2 text-gray-950 font-extrabold">#</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Order Id</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Name</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Mobile</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Balance</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Order</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Delivery</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Status</Text>
        <Text className="w-1/8 text-red-500 font-extrabold">Action</Text>
      </View>

      {loading && <ActivityIndicator size="large" color="black" />}
      {error && <Text style={{color: 'red', marginBottom: 10}}>{error}</Text>}

      <FlatList
        className="mb-4"
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View className="flex flex-row justify-between items-center bg-gray-100 border py-1 px-3 mt-1">
            <Text className="w-2 text-gray-950  text-lg font-medium">
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
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
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

            {/* Render OrderDetailsModal when isModalVisible is true */}
            {isModalVisible && (
              <OrderDetailsModal
                isVisible={isModalVisible}
                orderDetails={orderDetails}
                onClose={closeModal}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default HistoryScreen;
