import React from 'react';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import icon library
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      console.log('User data cleared from AsyncStorage.');
      navigation.navigate('Login');
      console.log('Navigated to the Login screen.');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View className="flex-1 flex justify-between items-center p-4 bg-gray-100">
      <Text className="text-lg font-bold">TailorApp</Text>

      <Button title="Logout" onPress={handleLogout} className="float-right" />

      <View className="flex-1 flex flex-col">
        <View className="flex-1 bg-gray-100 p-4">
          <Text className="text-lg font-semibold">Menu</Text>
          <View className="mt-4 flex flex-col">
            <View className="flex items-center">
              <Icon name="plus" size={20} />
              <Text className="ml-2 text-lg">New Order</Text>
            </View>
            <View className="flex items-center mt-2">
              <Icon name="check" size={20} />
              <Text className="ml-2 text-lg">Status</Text>
            </View>
            <View className="flex items-center mt-2">
              <Icon name="boxes" size={20} />
              <Text className="ml-2 text-lg">Manage Stock</Text>
            </View>
            <View className="flex items-center mt-2">
              <Icon name="history" size={20} />
              <Text className="ml-2 text-lg">Order History</Text>
            </View>
            <View className="flex items-center mt-2">
              <Icon name="users" size={20} />
              <Text className="ml-2 text-lg">Customer List</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;
