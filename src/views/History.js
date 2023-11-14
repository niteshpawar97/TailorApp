// History.js
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {TextInput} from 'react-native-paper';
import Config from '../api/Config';
import {
  sendPostRequest,
  sendGetRequest,
} from '../helpers/apiRequestWithHeaders';

const HistoryScreen = () => {
  // State to manage the date range and search term
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await sendGetRequest(Config.ORDER_HISTORY_API);
        if (response && response.data) {
          setOrderHistoryData(response.data);
        } else {
          console.error('Error fetching order history data');
        }
      } catch (error) {
        console.error('Error fetching order history data', error);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <View className="p-4">
      <Text className="text-lg font-bold">Order History</Text>
      <View className="flex flex-row justify-start items-center gap-x-10">
        <TextInput
          className="rounded-md mt-2 w-40"
          mode="outlined"
          label="Start Date"
          value={startDate}
          onChangeText={text => setStartDate(text)}
        />
        <TextInput
          className="rounded-md mt-2 mr-4 w-40"
          mode="outlined"
          label="End Date"
          value={endDate}
          onChangeText={text => setEndDate(text)}
        />
        <TouchableOpacity
          className="bg-green-700 font-bold mt-3 p-3 px-1 rounded-md"
          // onPress={handleBack}
        >
          <Text className="text-center text-white w-28 font-semibold text-xl">
            Show
          </Text>
        </TouchableOpacity>
        <TextInput
          className="bg-gray-200 rounded-full mt-2 mr-4 w-40"
          mode="outlined"
        label="Search"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
      />
      </View>



      <View className="flex flex-row justify-between bg-green-400 mt-1  py-2 px-3">
        <Text className="w-1/12  text-gray-950 font-extrabold">#</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Order Id</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Name</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Mobile</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Balance</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">
          Order Status
        </Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Order Date</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Delivery Date</Text>
        <Text className="w-1/12 text-red-500 font-extrabold">Delivery Status</Text>
        
      </View>

      <FlatList
        data={orderHistoryData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View className="flex flex-row justify-between items-center bg-lime-200 border py-1 px-3">
            <Text className="w-1/12 text-zinc-700 font-extrabold">
              {index + 1}
            </Text>
            <Text className="w-1/12">{item.order_id}</Text>
            <Text className="w-1/12 text-xl font-semibold">{item.name}</Text>
            <Text className="w-1/12">{item.mobile}</Text>
            <Text className="w-1/12">{item.balance}</Text>
            <Text className="w-1/12">{item.order_status}</Text>
            <Text className="w-1/12">{item.order_date}</Text>
            <Text className="w-1/12">{item.delivery_date}</Text>
            <Text className="w-1/12">{item.delivery_status}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HistoryScreen;
