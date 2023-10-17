// src/views/DashboardView.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DashboardController from '../controllers/DashboardController';
import UserModel from '../models/UserModel'; // Import the UserModel

const DashboardView = ({ navigation }) => {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await DashboardController.fetchUserData();
        const userModel = UserModel.fromJSON(userData); // Parse the user data using UserModel
        setUser(userModel);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    navigation.navigate('Login'); // Make sure the route name matches your navigation setup
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Dashboard</Text>
      {user ? (
        <View>
          <Text>User ID: {user.user_id}</Text>
          <Text>Role: {user.role}</Text>
          <Text>Username: {user.username}</Text>
          <Text>Subscription Type: {user.subscription_type}</Text>
          <Text>Session ID: {user.session_id}</Text>
          <Text>Session Date: {user.session_date}</Text>
          {/* Display other user data here */}
        </View>
      ) : (
        <Text>Loading user data...</Text>
      )}
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default DashboardView;
