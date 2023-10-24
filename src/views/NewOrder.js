//src/views/NewOrder.js
import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Config from '../api/Config';

const {CUSTOMER_API} = Config;

const NewOrderView = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [shouldFetchSuggestions, setShouldFetchSuggestions] = useState(true);

  useEffect(() => {
    if (phone.length >= 4) {
      // Fetch suggestions when the phone number input has 4 or more characters
      fetchSuggestions();
    }
  }, [phone]);

  const fetchSuggestions = async () => {
    if (shouldFetchSuggestions) {
      try {
        const response = await fetch(`${CUSTOMER_API}/${phone}`);

        const data = await response.json();

        if (data.error === false) {
          setSuggestions(data.customer);
          
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    }
  };

  const handleSelectSuggestion = customer => {
    setSelectedCustomer(customer);
    setPhone(customer.phone);
    setName(customer.name);
    setWhatsApp(customer.whatsapp);
    setShouldFetchSuggestions(false); // Prevent further API calls
    setSuggestions([]); // Clear suggestions
  };

  const handlePhoneChange = text => {
    setPhone(text); // Update the "Phone" input value
    setWhatsApp(text); // Automatically populate the "WhatsApp" input

     // If the phone number is cleared, re-enable fetching suggestions
  if (text === '') {
    setShouldFetchSuggestions(true);
  }
  };

  return (
    <View className="flex-1 flex justify-center items-center">
      <Image
        source={require('../assets/bg.jpg')}
        resizeMode="cover"
        className="absolute w-full h-full"
      />
      <View className="flex py-10 px-20  bg-gray-200 rounded-lg shadow-lg">
        <Text className="text-xl text-center font-semibold pb-5 text-gray-900">
          New Customer Details
        </Text>

        <View className="flex w-72 flex-col gap-6">
          <TextInput
            mode="outlined"
            label="Phone Number"
            className={
              suggestions.length > 0
                ? "placeholder-gray-800 text-placeholder-gray-800 rounded-md w-full -mb-6"
                : "placeholder-gray-800 text-placeholder-gray-800 rounded-md w-full mt-2"
            }
            placeholder="Phone"
            // onChangeText={text => setPhone(text)}
            onChangeText={handlePhoneChange} // Updated the onChangeText handler
            value={phone}
            keyboardType="phone-pad"
          />

          {suggestions.length > 0 && (
            <FlatList
              className="bg-gray-300 w-72"
              data={suggestions}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handleSelectSuggestion(item)}>
                  <View className="border border-gray-400 px-4 py-1">
                    <Text className="text-base text-gray-800">{item.phone}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}

          <TextInput
            mode="outlined"
            label="Full Name"
            className="placeholder-gray-800 text-placeholder-gray-800 rounded-md mt-2 w-full"
            onChangeText={text => setName(text)}
            value={name}
            placeholder="Full Name"
          />

          <TextInput
            mode="outlined"
            label="WhatsApp Number"
            className="placeholder-gray-500 text-placeholder-gray-500 rounded-md mt-2 w-full"
            placeholder="WhatsApp"
            onChangeText={text => setWhatsApp(text)}
            value={whatsApp}
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            className="bg-gray-800 w-72 text-white font-bold py-2 px-4 rounded-md flex justify-center items-center"
            onPress={() => {
              // Handle submit action
            }}>
            <Text className="text-center text-yellow-200 font-semibold text-xl">
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewOrderView;
