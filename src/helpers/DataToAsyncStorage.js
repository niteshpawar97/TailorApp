
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveDataToAsyncStorage = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const getDataFromAsyncStorage = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        // Data found in AsyncStorage; parse the JSON data and return it
        return JSON.parse(data);
      } else {
        // Data not found
        return null;
      }
    } catch (error) {
      console.error('Error getting data from AsyncStorage:', error);
      return null;
    }
  };
  
  export { saveDataToAsyncStorage, getDataFromAsyncStorage, };

