import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, TextInput, Title} from 'react-native-paper';
import LoginController from '../controllers/LoginController';
import DashboardController from '../controllers/DashboardController'; // Import the checkLoginStatus function
import ErrorPopup from '../components/ErrorPopup';
import LottieView from 'lottie-react-native';

function DashboardView() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [error, setError] = useState(null); // State to track errors

  const [dashboardData, setDashboardData] = useState({
    cards: {
      'All Billing Amount': null,
      'All Due Amount': null,
      'All Orders': 0,
      'All Paid Amount': null,
      'Today Billing Amount': null,
      'Today Customers': 0,
      'Today Due Amount': null,
      'Today Paid Amount': null,
      'Today Total Orders': 0,
    },
    recent_orders: [],
  });

  const handleCloseError = () => {
    setError(null); // Clear the error message
  };

  useEffect(() => {
    checkDashboard();
    // Call the function to check login status when the component mounts
    checkUserLoginStatus();
    // Call the function to fetch user details when the component mounts
    fetchUserDetails();
    // Set up a timer to periodically check the dashboard data (every 5 minutes in this example)
    const intervalId = setInterval(() => {
      checkDashboard();
    }, 2 * 60 * 1000); // 5 minutes in milliseconds

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const checkUserLoginStatus = async () => {
    try {
      const userData = await LoginController.checkLoginStatus(); // Use the checkLoginStatus function
      if (userData.error) {
        const logoutResponse = await LoginController.logout();
        navigation.navigate('Login'); // Replace 'Login' with your actual screen name
        console.log('Logout Response: ', logoutResponse);
      } else {
        setUser(userData);
      }
    } catch (error) {
      setError(error.message); // Set the error message in state
      navigation.navigate('Login'); // Replace 'Login' with your actual screen name
    }
  };

  const checkDashboard = async () => {
    try {
      const data = await DashboardController.checkDashboardData();
      console.log('dashboardData Response: ', data);
      if (data.error) {
        console.log('dashboardData Error: ', data);
      } else {
        setDashboardData(data);
      }
    } catch (error) {
      setError(error.message);
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
  // Define an array of objects for each card
  const cardData = [
    {title: 'Billing | Today', dataKey: 'Today Total Orders'},
    {title: 'Order | Today', dataKey: 'All Orders'},
    {title: 'Customers | Today', dataKey: 'Today Customers'},
  ];
  // Define an array of objects for each card
  const cardData2 = [
    {title: 'Today Billing Amount', dataKey: 'Today Billing Amount'},
    {title: 'Today Paid Amount', dataKey: 'Today Paid Amount'},
    {title: 'Today Due Amount', dataKey: 'Today Due Amount'},
  ];
  // Define an array of objects for each card
  const cardData3 = [
    {title: 'All Billing Amount', dataKey: 'All Billing Amount'},
    {title: 'All Paid Amount', dataKey: 'All Paid Amount'},
    {title: 'All Due Amount', dataKey: 'All Due Amount'},
  ];

  return (
    <ScrollView>
      <View className="flex-1 flex-col gap-1 ">
        <View className="flex-1 flex justify-between ">
          <View className="flex-1 p-4 bg-gray-50">
            {user && (
              <>
                <Card className="bg-gray-300 p-2 mb-2">
                  <Text className="text-2xl text-gray-700 font-semibold">
                    {user.uname}
                  </Text>
                </Card>
              </>
            )}

            <View className="flex flex-row gap-2 py-2">
              {cardData.map((card, index) => (
                <Card key={index} className="flex-1 h-32 bg-gray-300 mt-2">
                  <View className="relative">
                    <View className="flex justify-end">
                      <Card.Content>
                        <Title className="pl-2 text-gray-900 text-xl pt-5">
                          {card.title}
                        </Title>
                        <Title className="p-2 text-gray-800 text-5xl">
                          {dashboardData.cards[card.dataKey] ?? 0}
                        </Title>
                      </Card.Content>
                    </View>
                  </View>
                </Card>
              ))}
            </View>

            <View className="flex flex-row gap-2 py-2">
              {cardData2.map((card, index) => (
                <Card key={index} className="flex-1 h-32 bg-gray-300 mt-2">
                  <View className="relative">
                    <View className="flex justify-end">
                      <Card.Content>
                        <Title className="pl-2 text-gray-900 text-xl pt-5">
                          {card.title}
                        </Title>
                        <Title className="p-2 text-gray-800 text-5xl">
                          {dashboardData.cards[card.dataKey] ?? 0}
                        </Title>
                      </Card.Content>
                    </View>
                  </View>
                </Card>
              ))}
            </View>

            <View className="flex flex-row gap-2 py-2">
              {cardData3.map((card, index) => (
                <Card key={index} className="flex-1 h-32 bg-gray-300 mt-2">
                  <View className="relative">
                    <View className="flex justify-end">
                      <Card.Content>
                        <Title className="pl-2 text-gray-900 text-xl pt-5">
                          {card.title}
                        </Title>
                        <Title className="p-2 text-gray-800 text-5xl">
                          {dashboardData.cards[card.dataKey] ?? 0}
                        </Title>
                      </Card.Content>
                    </View>
                  </View>
                </Card>
              ))}
            </View>

            <View>
              <Text className="h-52 text-xl pl-5 pt-3 text-gray-700 bg-gray-300 mt-2 rounded-lg">
                Recent Orders | Today
              </Text>

              <LottieView
                source={require('../assets/lottie/home.json')}
                autoPlay
                loop
              />
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
