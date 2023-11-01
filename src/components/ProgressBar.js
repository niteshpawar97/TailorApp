import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const ProgressBar = ({ isVisible }) => {
  return (
    isVisible && (
      <View>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  );
};

export default ProgressBar;
