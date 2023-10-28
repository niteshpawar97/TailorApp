//src/views/NewOrder.js
import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {TextInput, IconButton, Button, RadioButton} from 'react-native-paper';
import Config from '../api/Config';
import {
  sendPostRequest,
  sendGetRequest,
  sendPutRequest,
  sendDeleteRequest,
} from '../helpers/apiRequestWithHeaders';
import ErrorPopup from '../components/ErrorPopup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const {CUSTOMER_SEARCH, CUSTOMER_CREATE} = Config;

const NewOrderView = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsApp] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [shouldFetchSuggestions, setShouldFetchSuggestions] = useState(true);
  const [error, setError] = useState(null); // State to track errors
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [quantity, setQuantity] = useState('');
  const [paidamt, setPaidAmt] = useState('');
  const [discount, setDiscount] = useState('');

  const [material, setMaterial] = React.useState('readyMade');
  const [paymode, setPaymode] = React.useState('readyMade');
  const [open, setOpen] = useState(false);
  const [readymade, setReadymade] = useState(null);
  const [readymadeitems, setReadymadeItems] = useState([
    {label: 'Paint', value: 'Paint'},
    {label: 'Shirt', value: 'Shirt'},
    {label: 'Suit', value: 'Suit'},
  ]);

  const [opensize, setOpenSize] = useState(false);
  const [size, setsize] = useState(null);
  const [sizes, setSizes] = useState([{label: 'Free Size', value: 'freesize'}]);

  const [deliveryDate, setDeliveryDate] = useState(''); // State variable for selected delivery date
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    // Format the date if needed
    const formattedDate = date.toISOString().split('T')[0]; // Example formatting

    // Update the state with the selected delivery date
    setDeliveryDate(formattedDate);

    // Close the date picker modal
    hideDatePicker();
  };

  useEffect(() => {
    if (phone.length >= 4) {
      // Fetch suggestions when the phone number input has 4 or more characters
      fetchSuggestions();
      setShouldFetchSuggestions(true);
    }
  }, [phone]);

  const fetchSuggestions = async () => {
    if (shouldFetchSuggestions) {
      try {
        // Construct the URL
        const url = `${CUSTOMER_SEARCH}/${phone}`;
        const data = await sendGetRequest(url);
        console.log('GET CUSTOMER_SEARCH:', CUSTOMER_SEARCH);
        console.log('GET Response:', data);
        if (data.error === false) {
          setSuggestions(data.customer);
        }
      } catch (error) {
        console.log('Error fetching suggestions:', error);
      }
    }
  };

  const handleSelectSuggestion = customer => {
    setSelectedCustomer(customer);
    setPhone(customer.phone);
    setName(customer.name);
    setWhatsApp(customer.whatsapp);
    setShouldFetchSuggestions(false); // Prevent further API calls
    setSuggestions([]); // Clear suggestions
  };

  const handlePhoneChange = text => {
    setPhone(text); // Update the "Phone" input value
    setWhatsApp(text); // Automatically populate the "WhatsApp" input

    // If the phone number is cleared, re-enable fetching suggestions
    if (phone.length <= 4) {
      // if (text === '') {
      setShouldFetchSuggestions(true);
      setSuggestions([]); // Clear suggestions
    }
  };

  const handleNext = async () => {
    // Handle each step *1*
    if (currentStep === 1) {
      // Check if any of the required fields are empty
      if (!phone || !whatsapp || !name) {
        setError('Please fill in all required fields');
        return;
      }

      // Set the loading state to true
      setIsLoading(true);

      // Prepare your data
      const data = {
        phone,
        whatsapp,
        name,
      };
      // Make the POST request
      //console.log('Response:', CUSTOMER_CREATE);
      try {
        const response = await sendPostRequest(CUSTOMER_CREATE, data);
        // Handle the response as needed
        console.log('Response:', response);
        // Set the loading state back to false when processing is complete
        setIsLoading(false);
        // When the "NEXT" button is pressed, toggle the visibility of next step fields.
      } catch (error) {
        // Set the loading state back to false when processing is complete
        setIsLoading(false);
        // Handle errors
        setError('Error:', error);
      }
    } else if (currentStep === 2) {
      // Handle step 2 logic
      // You can add more checks or actions for step 2 here
    } else if (currentStep === 3) {
      // Handle step 3 logic
      // You can add more checks or actions for step 3 here
    }

    // If the current step is less than 3, proceed to the next step
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }
  };

  const handleBack = () => {
    // Allow users to go back to the previous step
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCloseError = () => {
    setError(null); // Clear the error message
  };

  return (
    <View className="flex-1 flex justify items-center bg-gray-200 w-full">
      {/* <Image
        source={require('../assets/bg.jpg')}
        resizeMode="cover"
        className="absolute w-full h-full"
      /> */}

      <View className="flex-1 w-full justify-center items-center rounded-lg shadow-sm ">
        <Text className="text-xl text-center font-semibold pb-5 text-gray-900">
          Order Details (Step {currentStep}/3)
        </Text>

        <View
          className={
            currentStep === 3
              ? 'flex w-full flex-col gap-6'
              : 'flex w-72 flex-col gap-6'
          }>
          {currentStep === 1 && (
            <TextInput
              mode="outlined"
              label="Phone Number"
              className={
                suggestions.length > 0
                  ? 'placeholder-gray-800 text-placeholder-gray-800 rounded-md w-full -mb-6'
                  : 'placeholder-gray-800 text-placeholder-gray-800 rounded-md w-full mt-2'
              }
              placeholder="Phone"
              // onChangeText={text => setPhone(text)}
              onChangeText={handlePhoneChange} // Updated the onChangeText handler
              value={phone}
              keyboardType="phone-pad"
            />
          )}

          {suggestions.length > 0 && currentStep === 1 && (
            <FlatList
              className="bg-gray-300 w-72"
              data={suggestions}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handleSelectSuggestion(item)}>
                  <View className="border border-gray-400 px-4 py-1">
                    <Text className="text-base text-gray-800">
                      {item.phone}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}

          {currentStep === 1 && (
            <TextInput
              mode="outlined"
              label="Full Name"
              className="placeholder-gray-800 text-placeholder-gray-800 rounded-md mt-2 w-full"
              onChangeText={text => setName(text)}
              value={name}
              placeholder="Full Name"
            />
          )}

          {currentStep === 1 && (
            <TextInput
              mode="outlined"
              label="WhatsApp Number"
              className="placeholder-gray-800 text-placeholder-gray-800 rounded-md mt-2 w-full"
              placeholder="WhatsApp"
              onChangeText={text => setWhatsApp(text)}
              value={whatsapp}
              keyboardType="phone-pad"
            />
          )}

          {currentStep === 2 && (
            // Render step 2 fields
            <View className="gap-4">
              <Text className="text-lg text-gray-950 px-6">
                Select-Material
              </Text>
              <RadioButton.Group
                onValueChange={value => setMaterial(value)}
                value={material}>
                <View className="flex flex-row justify-between text-gray-950">
                  <RadioButton.Item
                    position="leading"
                    label="Ready Made"
                    value="readyMade"
                  />
                  <RadioButton.Item
                    position="leading"
                    label="Stitching"
                    value="stitching"
                  />
                </View>
                <View className="flex flex-row justify-between">
                  <RadioButton.Item
                    position="leading"
                    label="Sale Material"
                    value="saleMaterial"
                  />
                  <RadioButton.Item
                    position="leading"
                    label="Accessories"
                    value="accessories"
                  />
                </View>
              </RadioButton.Group>

              <View>
                <DropDownPicker
                  open={open}
                  value={readymade}
                  items={readymadeitems}
                  setOpen={setOpen}
                  setValue={setReadymade}
                  setItems={setReadymadeItems}
                  placeholder="Select Readymade"
                  placeholderStyle={{}}
                  disableBorderRadius={true}
                />
              </View>
              <View>
                <TextInput
                  mode="outlined"
                  label="Quantity"
                  className="placeholder-gray-800 text-placeholder-gray-800 rounded-md mt-2 w-full"
                  // Add the onChangeText and value for step 2
                  onChangeText={text => setQuantity(text)}
                  value={quantity}
                />
              </View>
              <View>
                <DropDownPicker
                  open={opensize}
                  value={size}
                  items={sizes}
                  setOpen={setOpenSize}
                  setValue={setsize}
                  setItems={setSizes}
                  placeholder="Select Size"
                />
              </View>

              {/* Add more step 2 fields */}
            </View>
          )}

          {currentStep === 3 && (
            // Items Show added
            <ScrollView>
              <View className="px-6 py-2 w-full rounded-md bg-blue-400">
                <Text className="text-lg text-lime-300 font-bold">
                  Order Confirmation
                </Text>

                <View className="flex flex-row justify-between my-2 bg-blue-50 py-3 px-3">
                  <Text className="w-1/2  text-gray-950 font-extrabold">
                    Item
                  </Text>
                  <Text className="w-1/8  text-gray-950 font-extrabold">
                    Quantity
                  </Text>
                  <Text className="w-1/8  text-gray-950 font-extrabold">
                    Meter
                  </Text>
                  <Text className="w-1/8  text-gray-950 font-extrabold">
                    Stitch
                  </Text>
                  <Text className="w-1/6  text-gray-950 font-extrabold">
                    Material/Items QAR
                  </Text>
                  <Text className="w-1/6  text-gray-950 font-extrabold">
                    Amount
                  </Text>
                </View>

                {/* Invoice items */}
                <View className="flex flex-row justify-between my-2 bg-blue-200 py-2 px-2 ">
                  <Text className="w-1/2 text-zinc-700 font-semibold">
                    Coat suit
                  </Text>
                  <Text className="w-1/8 text-zinc-700 font-semibold">1</Text>
                  <Text className="w-1/8 text-zinc-700 font-semibold">0</Text>
                  <Text className="w-1/8 text-zinc-700 font-semibold">0</Text>
                  <Text className="w-1/6 text-zinc-700 font-semibold">
                    10 QAR
                  </Text>
                  <Text className="w-1/6 text-zinc-700 font-semibold">
                    QAR 10
                  </Text>
                </View>

                <View className="flex flex-row justify-between my-2 bg-blue-200 py-2 px-2 ">
                  <Text className="w-1/2 text-zinc-700 font-semibold">
                    SHIRTS
                  </Text>
                  <Text className="w-1/8 text-zinc-700 font-semibold">1</Text>
                  <Text className="w-1/8 text-zinc-700 font-semibold">3</Text>
                  <Text className="w-1/8 text-zinc-700 font-semibold">10</Text>
                  <Text className="w-1/6 text-zinc-700 font-semibold">
                    30 QAR
                  </Text>
                  <Text className="w-1/6 text-zinc-700 font-semibold">
                    QAR 40
                  </Text>
                </View>

                <View className="row justify-end items-end">
                  <View className="flex-row w-72">
                    <TextInput
                      mode="outlined"
                      label="Pick Delivery Date"
                      placeholder="Select a date"
                      value={deliveryDate} // Display the selected date
                      onTouchStart={showDatePicker} // Show the date picker when the input is touched
                      className="flex-1"
                      available
                      space
                    />
                    <IconButton
                      icon="calendar"
                      color="#000"
                      size={25}
                      onPress={showDatePicker}
                    />
                  </View>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date" // You can change this to "datetime" for date and time
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                  />

                  {/* Total and Discount */}
                  <View className="my-2">
                    <Text className="text-gray-600 text-lg font-extrabold">
                      Total: QAR 50
                    </Text>

                    <TextInput
                      mode="outlined"
                      label="Discount"
                      className="placeholder-gray-800 text-placeholder-gray-800 rounded-md mt-2 w-40"
                      // Add the onChangeText and value for step 3
                      onChangeText={text => setDiscount(text)}
                      value={discount}
                      keyboardType="phone-pad"
                    />
                  </View>

                  <RadioButton.Group
                    onValueChange={value => setPaymode(value)}
                    value={paymode}>
                    <View className="flex flex-cal w-32 justify-between text-gray-950">
                      <RadioButton.Item
                        position="leading"
                        label="Card"
                        value="card"
                      />
                      <RadioButton.Item
                        position="leading"
                        label="Cash"
                        value="cash"
                      />
                    </View>
                  </RadioButton.Group>

                  <Text className="text-gray-800 text-lg font-extrabold">
                    Pay Total: QAR 50
                  </Text>

                  <TextInput
                    mode="outlined"
                    label="Paid Balance"
                    className="placeholder-gray-800 text-placeholder-gray-800 rounded-md mt-2 w-40"
                    // Add the onChangeText and value for step 3
                    onChangeText={text => setPaidAmt(text)}
                    value={paidamt}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </ScrollView>
          )}

          <View className="flex flex-row justify-between">
            {currentStep > 1 && (
              <TouchableOpacity
                className="bg-gray-400 text-white font-bold py-2 px-4 rounded-md"
                onPress={handleBack}>
                <Text className="text-center text-gray-800 font-semibold text-xl">
                  BACK
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              className="bg-gray-800 w-36 text-white font-bold py-2 px-4 rounded-md"
              onPress={handleNext}>
              <Text className="text-center text-yellow-200 font-semibold text-xl">
                {isLoading
                  ? 'Processing...'
                  : currentStep === 3
                  ? 'SUBMIT'
                  : 'NEXT'}
              </Text>
            </TouchableOpacity>
          </View>
          <ErrorPopup
            isVisible={error !== null}
            errorMessage={error}
            onClose={handleCloseError}
          />
        </View>
      </View>
    </View>
  );
};

export default NewOrderView;
