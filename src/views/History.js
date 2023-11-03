// History.js
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {TextInput} from 'react-native-paper';
const HistoryScreen = () => {
  // State to manage the date range and search term
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data for the order history (replace with your actual data)
  const orderHistoryData = [
    {
      name: 'A Razak',
      phone: '669965833',
      orderId: '9984507478',
      materialType: 'Material',
      dressName: 'THOUB',
      meter: 5,
      meterPrice: 50,
      paid: 60,
      orderedDate: '2023-05-18',
      deliveredDate: '2023-05-22',
    },
    {
      name: 'Abdul Azeez',
      phone: '66228730',
      orderId: '3240495645',
      materialType: 'Material',
      dressName: 'THOUB MEDIUM',
      meter: 5,
      meterPrice: 30,
      paid: 70,
      orderedDate: '2023-05-18',
      deliveredDate: '2023-05-22',
    },
    {
      name: 'Abdul Azeez',
      phone: '66228730',
      orderId: '3240495645',
      materialType: 'Material',
      dressName: 'THOUB MEDIUM',
      meter: 5,
      meterPrice: 30,
      paid: 70,
      orderedDate: '2023-05-18',
      deliveredDate: '2023-05-22',
    },
    {
      name: 'Abdul Azeez',
      phone: '66228730',
      orderId: '3240495645',
      materialType: 'Material',
      dressName: 'THOUB MEDIUM',
      meter: 5,
      meterPrice: 30,
      paid: 70,
      orderedDate: '2023-05-18',
      deliveredDate: '2023-05-22',
    },
    {
      name: 'Abdul Azeez',
      phone: '66228730',
      orderId: '3240495645',
      materialType: 'Material',
      dressName: 'THOUB MEDIUM',
      meter: 5,
      meterPrice: 30,
      paid: 70,
      orderedDate: '2023-05-18',
      deliveredDate: '2023-05-22',
    },
    // Add more data as needed
  ];

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
        <Text className="w-1/12 text-gray-950 font-extrabold">Name</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">Phone</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">OrderId</Text>
        <Text className="w-1/12  text-gray-950 font-extrabold">
          Material Type
        </Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Dress Name</Text>
        <Text className="w-1/12 text-gray-950 font-extrabold">Meter</Text>
        <Text className="w-1/12 text-red-500 font-extrabold">Meter Price</Text>
        <Text className="w-1/12 text-red-500 font-extrabold">Paid</Text>
        <Text className="w-1/12 text-red-500 font-extrabold">Ordered Date</Text>
        <Text className="w-1/12 text-red-500 font-extrabold">
          Delivered Date
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
            <Text className="w-1/12 text-xl font-semibold">{item.name}</Text>
            <Text className="w-1/12">{item.phone}</Text>
            <Text className="w-1/12">{item.orderId}</Text>
            <Text className="w-1/12">{item.materialType}</Text>
            <Text className="w-1/12">{item.dressName}</Text>
            <Text className="w-1/12">{item.meter}</Text>
            <Text className="w-1/12">{item.meterPrice}</Text>
            <Text className="w-1/12">{item.paid}</Text>
            <Text className="w-1/12">{item.orderedDate}</Text>
            <Text className="w-1/12">{item.deliveredDate}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HistoryScreen;
