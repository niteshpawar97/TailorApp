import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Title} from 'react-native-paper';

function DashboardView() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Function to fetch the user details from AsyncStorage
    const fetchUserDetails = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData !== null) {
          // User details found in AsyncStorage; parse the JSON data
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          //console.log(parsedUser.username, ': login success');
        }
      } catch (error) {
        console.error('Error retrieving user details:', error);
      }
    };

    // Call the function to fetch user details when the component mounts
    fetchUserDetails();
  }, []);

  return (
    <ScrollView>
      <View className="flex-1 flex-col gap-2">
        <View className="flex-1 flex justify-between">
          <View className="flex-1 p-4 bg-stone-400">
          {/* <Image
        source={require('../assets/bg.jpg')}
        resizeMode="cover"
        className="absolute w-full h-full"
      /> */}
            {user && (
              <>
              <Card className="bg-gray-200 p-2 mb-2"><Text className="text-2xl text-lime-600 font-semibold">
                  User: {user.username}
                </Text></Card>
                
                
                {/* <Text className="text-2xl text-yellow-600 font-semibold">
                  Subscription type: {user.subscription_type}
                </Text> */}
              </>
            )}

            <View className="flex flex-col gap-2">
              
              <Card className="h-32 bg-gray-200 mt-2">
                <View className="relative">
                  <View className="absolute top-0 right-0">
                    <Image
                      source={{uri: 'https://soft.niketgroup.in/img/bill.png'}}
                      className="w-24 h-24 m-5"
                    />
                  </View>
                  <View className="flex justify-end">
                    <Card.Content>
                      <Title className="pl-2 text-gray-900 text-xl pt-5">
                        Billing | Today{' '}
                      </Title>
                      <Title className="pl-10 text-gray-800 text-xl">0</Title>
                    </Card.Content>
                  </View>
                </View>
              </Card>

              <Card className="h-32 bg-gray-200 mt-2">
                <View className="relative">
                  <View className="absolute top-0 right-0">
                    <Image
                      source={{uri: 'https://soft.niketgroup.in/img/order.png'}}
                      className="w-24 h-24 m-5"
                    />
                  </View>
                  <View className="flex justify-end">
                    <Card.Content>
                      <Title className="pl-2 text-gray-900 text-xl pt-5">
                        Order | Today{' '}
                      </Title>
                      <Title className="pl-10 text-gray-800 text-xl">0</Title>
                    </Card.Content>
                  </View>
                </View>
              </Card>

              <Card className="h-32 bg-gray-200 mt-2">
                <View className="relative">
                  <View className="absolute top-0 right-0">
                    <Image
                      source={{
                        uri: 'https://soft.niketgroup.in/img/people.png',
                      }}
                      className="w-24 h-24 m-5"
                    />
                  </View>
                  <View className="flex justify-end">
                    <Card.Content>
                      <Title className="pl-2 text-gray-900 text-xl pt-5">
                        Customers | Today{' '}
                      </Title>
                      <Title className="pl-10 text-gray-800 text-xl">0</Title>
                    </Card.Content>
                  </View>
                </View>
              </Card>

              <Text className="h-52 text-xl pl-5 pt-3 text-gray-700 bg-gray-200 mt-2 border border-red-400 rounded-lg"> 
              Recent Orders | Today 
              </Text>


            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default DashboardView;
