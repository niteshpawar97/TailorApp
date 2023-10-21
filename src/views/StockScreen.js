import React from 'react';
import { View, Text } from 'react-native';
import { useMediaQuery } from 'react-responsive'

const StockScreen = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })


  return (
    <View className="flex-1 flex justify-center items-center">
      <Text className="text-xl font-semibold">Stock Screen</Text>
    
    <Text>Device Test!</Text>
    {isDesktopOrLaptop && <Text>You are a desktop or laptop</Text>}
    {isBigScreen && <Text>You  have a huge screen</Text>}
    {isTabletOrMobile && <Text>You are a tablet or mobile phone</Text>}
    <Text>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</Text>
    {isRetina && <Text>You are retina</Text>}
    </View>
  );
};

export default StockScreen;
