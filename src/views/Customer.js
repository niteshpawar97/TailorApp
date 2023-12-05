// src\views\Customer.js
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native-paper';
import Config from '../api/Config';
import {
  sendPostRequest,
  sendGetRequest,
} from '../helpers/apiRequestWithHeaders';
import {useFocusEffect} from '@react-navigation/native'; // Import useFocusEffect
import MPModal from '../components/MPModal'; // Import the MPModal component
import LoaderOnly from '../components/LoaderOnly'; // Adjust the path based on your project structure

const CustomerScreen = ({navigation}) => {
  // State to manage the date range and search term
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [customerData, setCustomerData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mpSuggestions, setMPSuggestions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomer = async () => {
    try {
      const response = await sendGetRequest(Config.CUSTOMER_LIST_API);
      if (response && response.data) {
        setCustomerData(response.data);
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

  useEffect(() => {
    fetchCustomer();
  }, []);

  useEffect(() => {
    // Update filteredData when searchTerm or orderHistoryData changes
    const filtered = customerData.filter(
      item =>
        item.mobile.toString().includes(searchTerm) || // mobile
        item.whatsapp.toString().includes(searchTerm) || // Check if search term is in whatsapp
        item.name.toLowerCase().includes(searchTerm.toLowerCase()), // Check if search term is in name
    );
    setFilteredData(filtered);
  }, [searchTerm, customerData]);

  // Use useFocusEffect to fetch order history data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchCustomer();
    }, []), // The empty dependency array ensures this effect runs only once when the component mounts
  );

  const fetchMPSuggestions = async (mobile) => {
    setIsLoading(true);
    try {
      const url = `${Config.CUSTOMER_MP_LIST_API}?q=search&m=${mobile}`;
      console.log('GET CUSTOMER_MP_LIST_API:', url);
      const data = await sendGetRequest(url);
      console.log('GET Response:', data);
      if (data.error === false) {
        setMPSuggestions(data.mp);
        console.log('setMPSuggestions: ', mpSuggestions);
        setIsModalVisible(true); // Show modal after fetching data
        setIsLoading(false);
      }
    } catch (error) {
      console.log('Error fetching suggestions:', error);
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

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
        <Text className="w-2  text-gray-950 font-extrabold">#</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Name</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Mobile</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Whatsapp</Text>
        <Text className="w-1/8  text-gray-950 font-extrabold">Action</Text>
      </View>

      {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
      <LoaderOnly isLoading={isLoading} />

      <FlatList
        className="mb-4"
        data={customerData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View className="flex flex-row justify-between items-center bg-gray-100 border py-1 px-3 mt-1">
            <Text className="w-2 text-gray-950  text-lg font-medium">
              {index + 1}
            </Text>
            <Text className="w-1/12 text-gray-950 text-lg font-bold">
              {item.cname}
            </Text>
            <Text className="w-1/12 text-gray-950  text-lg font-medium">
              {item.mobile}
            </Text>
            <Text className="w-1/12  text-gray-950 text-lg font-medium">
              {item.whatsapp}
            </Text>

            <TouchableOpacity className="w-1/8" onPress={() => fetchMPSuggestions(item.mobile)}>
              <Text className="bg-gray-700 w-1/8 text-white font-medium text-base py-2 px-2 -mr-2 rounded-md">
                View MP
              </Text>
            </TouchableOpacity>

            {/* Render MPModal component with necessary props */}
            <MPModal
              isVisible={isModalVisible}
              suggestions={mpSuggestions}
              onClose={closeModal}
            />
          </View>
        )}
      />
    </View>
  );
};

export default CustomerScreen;
