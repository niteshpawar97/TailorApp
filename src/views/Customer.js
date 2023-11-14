// src\views\Customer.js
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {TextInput} from 'react-native-paper';
import Config from '../api/Config';
import {
  sendPostRequest,
  sendGetRequest,
} from '../helpers/apiRequestWithHeaders';

const CustomerScreen = () => {
  // State to manage the date range and search term
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderHistoryData, setOrderHistoryData] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await sendGetRequest(Config.CUSTOMER_LIST_API);
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
      <Text className="text-lg font-bold">Customer List</Text>
      <View className="flex flex-row justify-end items-center gap-x-10">
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
        <Text className="w-1/12 text-gray-950 font-extrabold">Name</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Mobile</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Whatsapp</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Action</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">
          First Visit Date
        </Text>
      </View>

      <FlatList
        data={orderHistoryData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View className="flex flex-row justify-between items-center bg-lime-200 border py-1 px-3">
            <Text className="w-1/12 text-zinc-700 font-extrabold">
              {index + 1}
            </Text>
            <Text className="w-1/12 text-slate-950 text-xl font-bold">
              {item.cname}
            </Text>
            <Text className="w-1/12 text-xl font-semibold">{item.mobile}</Text>
            <Text className="w-1/12 text-xl font-semibold">
              {item.whatsapp}
            </Text>
            {/* Button to Action this */}
            <TouchableOpacity className="w-1/12 cursor-pointer">
      <Text className="bg-red-500 w-20 text-white font-bold p-1 rounded-md hover:bg-black hover:text-white">
        Order Check
      </Text>
    </TouchableOpacity>
            <Text className="w-1/12">{item.create_date}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CustomerScreen;
