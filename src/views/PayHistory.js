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
import LoaderOnly from '../components/LoaderOnly'; // Adjust the path based on your project structure

const PayHistoryScreen = ({navigation}) => {
  // State to manage the date range and search term
  const [searchTerm, setSearchTerm] = useState('');
  const [payHistoryData, setPayHistoryData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetcPayHistory();
  }, []);

  useEffect(() => {
    // Update filteredData when searchTerm or stocksData changes
    const filtered = payHistoryData.filter(
      item =>
        item.id.toString().includes(searchTerm) || // Check if search term is in order ID
        item.name.toLowerCase().includes(searchTerm.toLowerCase()), // Check if search term is in name
    );
    setFilteredData(filtered);
  }, [searchTerm, payHistoryData]);

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
        setIsLoading(false);
        setError('');
      } else {
        setError('Error fetching order history data');
        setIsLoading(false);
      }
    } catch (error) {
      setError('Error fetching order history data: ' + error.message);
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

      <View className="flex flex-row justify-between bg-gray-300 mt-1  py-2 px-3">
        <Text className="text-gray-950 font-extrabold">#</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Order Id</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Name</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Mobile</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">
          Invoice Amount
        </Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Paid</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">PayMode</Text>
        <Text className="w-1/12 text-red-500 font-extrabold">PayDate</Text>
      </View>

      {error && <Text style={{color: 'red', marginBottom: 10}}>{error}</Text>}
      <LoaderOnly isLoading={isLoading} />

      <FlatList
        className="mb-4"
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View className="flex flex-row justify-between bg-gray-100 border  border-gray-400 py-1 px-3 mt-1">
            <Text className=" text-gray-950 text-lg font-medium">
              {index + 1}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
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
