import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const InternetStatus = ({ isConnected }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // If connected, hide the status after 5 seconds
    if (isConnected) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      // If not connected, always show the status
      setVisible(true);
    }
  }, [isConnected]);

  const containerStyle = {
    backgroundColor: isConnected ? 'green' : 'black',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  };

  const textStyle = {
    color: 'white',
  };

  return visible ? (
    <View style={containerStyle}>
      <Text style={textStyle}>
        {isConnected ? ' Back Online ' : ' No Internet Connection '}
      </Text>
    </View>
  ) : null;
};

export default InternetStatus;
