
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveDataToAsyncStorage = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  export { saveDataToAsyncStorage, };

