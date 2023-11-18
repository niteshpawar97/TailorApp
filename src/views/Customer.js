// src\views\Customer.js
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {TextInput} from 'react-native-paper';
import Config from '../api/Config';

import {
  sendPostRequest,
  sendGetRequest,
} from '../helpers/apiRequestWithHeaders';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect

const CustomerScreen = ({navigation}) => {
  // State to manage the date range and search term
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [customerData, setCustomerData] = useState([]);

  const fetchCustomer = async () => {
    try {
      const response = await sendGetRequest(Config.CUSTOMER_LIST_API);
      if (response && response.data) {
        setCustomerData(response.data);
      } else {
        console.error('Error fetching order history data');
      }
    } catch (error) {
      console.error('Error fetching order history data', error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);
  // Use useFocusEffect to fetch order history data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchCustomer();
    }, []), // The empty dependency array ensures this effect runs only once when the component mounts
  );

  return (
    <View className="py-2 px-4">
      <View className="flex flex-row justify-end items-center">
        <TextInput
          className="bg-gray-200 rounded-full mr-0 w-96"
          mode="outlined"
          label="Search"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
      </View>

      <View className="flex flex-row justify-between bg-gray-300 mt-1  py-2 px-3">
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
        className="mb-4"
        data={customerData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View className="flex flex-row justify-between items-center bg-gray-100 border py-1 px-3 mt-1">
            <Text className="w-1/12 text-zinc-700 font-extrabold">
              {index + 1}
            </Text>
            <Text className="w-1/12 text-gray-950 text-xl font-bold">
              {item.cname}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.mobile}
            </Text>
            <Text className="w-1/12  text-gray-950 text-lg font-medium">
              {item.whatsapp}
            </Text>
            {/* Button to Action this */}
            <TouchableOpacity className="w-1/12 cursor-pointer">
              <Text className="bg-gray-700 w-20 text-white font-bold py-2 px-1 rounded-md hover:bg-black hover:text-white">
                Order Check
              </Text>
            </TouchableOpacity>
            <Text className="w-1/12  text-gray-950 ">{item.create_date}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CustomerScreen;
