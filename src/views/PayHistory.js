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

const PayHistoryScreen = ({navigation}) => {
  // State to manage the date range and search term
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [payHistoryData, setPayHistoryData] = useState([]);

  useEffect(() => {
    fetcPayHistory();
  }, []);

  // Use useFocusEffect to fetch order history data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetcPayHistory();
    }, []), // The empty dependency array ensures this effect runs only once when the component mounts
  );

  const fetcPayHistory = async () => {
    try {
      const response = await sendGetRequest(Config.PAY_HISTORY_API);
      console.log('payHistoryData: ', response.data);
      if (response && response.data) {
        setPayHistoryData(response.data);
      } else {
        console.error('Error fetching order history data');
      }
    } catch (error) {
      console.error('Error fetching order history data', error);
    }
  };
  

  return (
    <View className="py-2 px-4">
      <View className="flex flex-row justify-start items-center gap-x-10">
        <TextInput
          className="bg-gray-50 rounded-full mr-0 w-40"
          mode="outlined"
          label="Start Date"
          value={startDate}
          onChangeText={text => setStartDate(text)}
        />
        <TextInput
          className="bg-gray-50 rounded-full mr-0 w-40"
          mode="outlined"
          label="End Date"
          value={endDate}
          onChangeText={text => setEndDate(text)}
        />
        <TouchableOpacity
          className="bg-gray-700 font-bold mt-2 p-3 px-1 rounded-md"
          // onPress={handleBack}
        >
          <Text className="text-center text-white w-28 font-semibold text-xl">
            Show
          </Text>
        </TouchableOpacity>
        <TextInput
          className="bg-gray-200 rounded-full mr-0 w-96"
          mode="outlined"
          label="Search"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
      </View>

      <View className="flex flex-row justify-between bg-gray-300 mt-1  py-2 px-3">
        <Text className="text-gray-950 font-extrabold">#</Text>
        <Text className="text-gray-950 font-extrabold">Order Id</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Name</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Mobile</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Invoice Amount</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Paid</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">
          PayMode
        </Text>
        <Text className="w-1/12 text-red-500 font-extrabold">
          PayDate
        </Text>
      </View>

      <FlatList
        className="mb-4"
        data={payHistoryData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View className="flex flex-row justify-between items-center bg-gray-100 border py-1 px-3 mt-1">
            <Text className=" text-gray-950  text-lg font-medium">
              {index + 1}
            </Text>
            <Text className="text-gray-950  text-lg font-medium">
              {item.id}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.name}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.mobile}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.invoice_amt}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.paid_amt}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.paymode}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.paydate}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default PayHistoryScreen;
