import AsyncStorage from '@react-native-async-storage/async-storage';

const setHeaders = async () => {
  // Get the user data from AsyncStorage
  const userData = await AsyncStorage.getItem('user');
  const user = JSON.parse(userData);

  if (user && user.accesstoken) {
    return {
      Authorization: `${user.accesstoken}`,
      store_id: `${user.store_id}`
    };
  }
  return {};
};

const sendPostRequest = async (url, data) => {
  try {
    const headers = await setHeaders();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
    });

    console.log(JSON.stringify(data));
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error sending POST request:', error);
    throw error;
  }
};

const sendGetRequest = async (url) => {
  try {
    const headers = await setHeaders();

    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error sending GET request:', error);
    throw error;
  }
};

const sendPutRequest = async (url, data) => {
  try {
    const headers = await setHeaders();

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error sending PUT request:', error);
    throw error;
  }
};

const sendDeleteRequest = async (url) => {
  try {
    const headers = await setHeaders();

    const response = await fetch(url, {
      method: 'DELETE',
      headers: headers,
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error sending DELETE request:', error);
    throw error;
  }
};

export { sendPostRequest, sendGetRequest, sendPutRequest, sendDeleteRequest };
