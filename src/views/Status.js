import React from 'react';
import { View, ScrollView, Image, Text} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useMediaQuery } from 'react-responsive';

const StatusScreen = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
 
  return (
    <ScrollView>
      <View className="flex flex-col">
       
      <Card className="h-32 bg-gray-200 m-5">
          <View className="relative">
            <View className="absolute top-0 right-0">
              <Image
                source={{ uri: 'https://soft.niketgroup.in/img/bill.png' }}
                className="w-24 h-24 m-5"
              />
            </View>
            <View className="flex justify-end">
              <Card.Content>
                <Title  className="pl-2 text-gray-900 text-2xl pt-5">Billing | Today </Title>
                  <Title className="pl-10 text-gray-800 text-2xl">0</Title>
              </Card.Content>
            </View>
          </View>
          </Card>

          <Card className="h-32 bg-gray-200 m-5">
          <View className="relative">
            <View className="absolute top-0 right-0">
              <Image
                source={{ uri: 'https://soft.niketgroup.in/img/order.png' }}
                className="w-24 h-24 m-5"
              />
            </View>
            <View className="flex justify-end">
              <Card.Content>
              <Title  className="pl-2 text-gray-900 text-2xl pt-5">Order | Today </Title>
                <Title className="pl-10 text-gray-800 text-2xl">0</Title>
              </Card.Content>
            </View>
          </View>
          </Card>

          <Card className="h-32 bg-gray-200 m-5 ">
          <View className="relative">
            <View className="absolute top-0 right-0">
              <Image
                source={{ uri: 'https://soft.niketgroup.in/img/people.png' }}
                className="w-24 h-24 m-5"
              />
            </View>
            <View className="flex justify-end">
              <Card.Content>
              <Title  className="pl-2 text-gray-900 text-2xl pt-5">Customers | Today </Title>
                  <Title className="pl-10 text-gray-800 text-2xl">0</Title>
              </Card.Content>
            </View>
          </View>
          </Card>
        
      </View>
    </ScrollView>
  );
};

export default StatusScreen;
