import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Title} from 'react-native-paper';
import LoginController from '../controllers/LoginController'; // Import the checkLoginStatus function
import ErrorPopup from '../components/ErrorPopup';
import LottieView from 'lottie-react-native';


function DashboardView() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [error, setError] = useState(null); // State to track errors

  const handleCloseError = () => {
    setError(null); // Clear the error message
  };

  useEffect(() => {
  // Function to check the login status
  const checkUserLoginStatus = async () => {
    try {
      const userData = await LoginController.checkLoginStatus(); // Use the checkLoginStatus function
      if (userData.error) {
        // Handle the case where the user is not logged in
        // You can redirect to the login screen or perform other actions here
        const logoutResponse = await LoginController.logout();
        // Redirect to the login screen here
          // You can use navigation or any other method to navigate to the login screen
          navigation.navigate('Login'); // Replace 'Login' with your actual screen name
        
        console.log('Logout Response: ', logoutResponse);
      } else {
        // User is logged in; set the user data to the state
        setUser(userData);
      }
    } catch (error) {
      setError(error.message); // Set the error message in state
    }
  };

    // Function to fetch the user details from AsyncStorage
    const fetchUserDetails = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData !== null) {
          // User details found in AsyncStorage; parse the JSON data
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          //console.log(parsedUser.username, ': login success');
          // console.log(parsedUser.token);
        }
      } catch (error) {
        console.error('Error retrieving user details:', error);
      }
    };

    // Call the function to check login status when the component mounts
    checkUserLoginStatus();
    // Call the function to fetch user details when the component mounts
    fetchUserDetails();
  }, []);

  return (
    <ScrollView>
      <View className="flex-1 flex-col gap-1 ">
        <View className="flex-1 flex justify-between ">
          <View className="flex-1 p-4 bg-gray-50">
            {/* <Image
        source={require('../assets/bg.jpg')}
        resizeMode="cover"
        className="absolute w-full h-full"
      /> */}
            {user && (
              <>
                <Card className="bg-gray-300 p-2 mb-2">
                  <Text className="text-2xl text-gray-700 font-semibold">
                    {user.uname}
                  </Text>
                </Card>
              </>
            )}

            <View className="flex flex-row gap-2">
              <Card className="flex-1 h-32 bg-gray-300 mt-2">
                <View className="relative">
                  
                  <View className="flex justify-end">
                    <Card.Content>
                      <Title className="pl-2 text-gray-900 text-xl pt-5">
                        Billing | Today{' '}
                      </Title>
                      <Title className="p-2 text-gray-800 text-5xl">0</Title>
                    </Card.Content>
                  </View>
                </View>
              </Card>

              <Card className="flex-1 h-32 bg-gray-300 mt-2">
                <View className="relative">
                  
                  <View className="flex justify-end">
                    <Card.Content>
                      <Title className="pl-2 text-gray-900 text-xl pt-5">
                        Order | Today{' '}
                      </Title>
                      <Title className="p-2 text-gray-800 text-5xl">0</Title>
                    </Card.Content>
                  </View>
                </View>
              </Card>

              <Card className="flex-1 h-32 bg-gray-300 mt-2">
                <View className="relative">
                 
                  <View className="flex justify-end">
                    <Card.Content>
                      <Title className="pl-2 text-gray-900 text-xl pt-5">
                        Customers | Today{' '}
                      </Title>
                      <Title className="p-2 text-gray-800 text-5xl">0</Title>
                    </Card.Content>
                  </View>
                </View>
              </Card>

              

              <Card className="flex-1 h-32 bg-gray-300 mt-2">
                <View className="relative">
                 
                  <View className="flex justify-end">
                    <Card.Content>
                      <Title className="pl-2 text-gray-900 text-xl pt-5">
                        Recevice Cash | Today{' '}
                      </Title>
                      <Title className="p-2 text-gray-800 text-5xl">0</Title>
                    </Card.Content>
                  </View>
                </View>
              </Card>

              

              <Card className="flex-1 h-32 bg-gray-300 mt-2">
                <View className="relative">
                 
                  <View className="flex justify-end">
                    <Card.Content>
                      <Title className="pl-2 text-gray-900 text-xl pt-5">
                        Balance | Today{' '}
                      </Title>
                      <Title className="p-2 text-gray-800 text-5xl">0</Title>
                    </Card.Content>
                  </View>
                </View>
              </Card>

              </View>

              <View>
              <Text className="h-52 text-xl pl-5 pt-3 text-gray-700 bg-gray-300 mt-2 rounded-lg">
                Recent Orders | Today
              </Text>

              <LottieView source={require('../assets/lottie/home.json')} autoPlay loop />
            </View>

            <ErrorPopup
          isVisible={error !== null}
          errorMessage={error}
          onClose={handleCloseError}
        />

          </View>
        </View>

        
      </View>
    </ScrollView>
  );
}

export default DashboardView;
