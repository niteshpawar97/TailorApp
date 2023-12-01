import React from 'react';
import {View, Text, Modal} from 'react-native';
import * as Progress from 'react-native-progress';

// Reusable Loader component with progress bar
const CustomLoader = ({progress, loadingText}) => (
    <View className="bg-gray-300 p-6 rounded shadow-2xl shadow-stone-950">
      {/* <ActivityIndicator size="large" color="#0000ff" /> */}
      <Progress.CircleSnail
        color={['yellow', 'green', 'blue']}
        progress={progress}
        size={100}
        animating={true}
        thickness={6}
        strokeCap="round"
        hidesWhenStopped={true}
      />
      <Text className="items-center text-black text-xl py-6">{loadingText}</Text>
    </View>);

const LoaderOnly = ({isLoading}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isLoading}
      onRequestClose={() => {}}>
      <View className="flex-1 justify-center items-center">
      
          {isLoading && <CustomLoader loadingText="Loading, please wait... >" />}
      </View>
    </Modal>
  );
};

export default LoaderOnly;
