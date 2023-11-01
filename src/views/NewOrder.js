//src/views/NewOrder.js
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
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
import {saveDataToAsyncStorage} from '../helpers/apiRequestWithHeaders';
import PDFGenerator from '../components/PDFGenerator'; // Import the PDFGenerator component
import { useFocusEffect } from '@react-navigation/native';


const {CUSTOMER_SEARCH, PRODUCT_SEARCH, CUSTOMER_CREATE} = Config;

const NewOrderView = () => {
  // Set the displayName property for the functional component
  NewOrderView.displayName = 'NewOrderView';

  useFocusEffect(
    React.useCallback(() => {
      // Your code to refresh the screen when it's focused
      // For example, reset your states here
      setPhone('');
      setName('');
      setWhatsApp('');
      setSuggestions([]);
      setSelectedCustomer(null);
      setShouldFetchSuggestions(true);
      setError(null);
      setCurrentStep(1);
      setIsLoading(false);
      setQuantity('');
      setPaidAmt('');
      setDiscount('0');
      setSelectedMaterial('ReadyMade');
      setMaterial('');
      setPaymode('cash');
      setOpen(false);
      setProduct(null);
      setProductItems([]);
      setOpenSize(false);
      setSize(null);
      setSizes([{ label: 'Free Size', value: 'freesize' }]);
      setDeliveryDate('');
      setSelectedItems([]);
      setResetFields(false);
      setTableVisible(false);
    }, [])
    );

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
  const [discount, setDiscount] = useState('0');
  const [selectedMaterial, setSelectedMaterial] = useState('ReadyMade');
  const [material, setMaterial] = React.useState('');
  const [paymode, setPaymode] = React.useState('cash');
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [productitems, setProductItems] = useState([]);
  const [opensize, setOpenSize] = useState(false);
  const [size, setSize] = useState(null);
  const [sizes, setSizes] = useState([{label: 'Free Size', value: 'freesize'}]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');

  const [selectedItems, setSelectedItems] = useState([]);
  const [resetFields, setResetFields] = useState(false);
  const [isTableVisible, setTableVisible] = useState(false);

  const handleAddItem = () => {
    if (product && size && quantity) {
      const newItem = {
        product,
        size,
        quantity,
      };

      setSelectedItems([...selectedItems, newItem]);
      setProduct('');
      setSize('');
      setQuantity('');
      setResetFields(true);
      setTableVisible(true); // Show the table when an item is added
    }
  };

  // Function to remove a single item
  const handleRemoveItem = index => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1); // Remove the item at the specified index
    setSelectedItems(updatedItems);
  };

  const fetchProducts = async selectedMaterial => {
    try {
      const purl = `${PRODUCT_SEARCH}`;
      const data = await sendGetRequest(purl);
      console.log('GET PRODUCT_SEARCH:', purl);
      console.log('GET Response:', data);

      if (data.error === false) {
        if (data.productsByType[selectedMaterial]) {
          const productNames = data.productsByType[selectedMaterial].map(
            product => product.name,
          );
          setProductItems(productNames);

          // Save the data.productsByType object to AsyncStorage
          const saveData = await saveDataToAsyncStorage(
            'productDataByType',
            data.productsByType,
          );
          console.log('Error saveData:', saveData);
        }
      }
    } catch (error) {
      console.log('Error fetching:', error);
    }
  };

  const fetchSavedDataByType = async () => {
    try {
      const savedDataByType = await AsyncStorage.getItem('productDataByType');
      if (savedDataByType) {
        const parsedDataByType = JSON.parse(savedDataByType);
        // Use parsedDataByType as needed in your component
        console.log('Error parsedDataByType:', parsedDataByType);
      }
    } catch (error) {
      console.error('Error fetching saved data by type:', error);
    }
  };

  // Call fetchSavedDataByType when you need to use the saved data
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

  useEffect(
    () => {
      if (phone.length >= 4) {
        if (currentStep === 1) {
          // Fetch suggestions when the phone number input has 4 or more characters
          fetchSuggestions();
          setShouldFetchSuggestions(true);
        }
      }

      if (selectedMaterial) {
        if (currentStep >= 1) {
          console.log(selectedMaterial);
          fetchProducts(selectedMaterial);
        }
      }

      fetchSavedDataByType();
    },
    [phone],
    [material],
  );

  const fetchSuggestions = async () => {
    if (shouldFetchSuggestions) {
      try {
        // Construct the URL
        const url = `${CUSTOMER_SEARCH}/${phone}`;
        const data = await sendGetRequest(url);
        console.log('GET CUSTOMER_SEARCH:', url);
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
    <View className="flex-1 flex-row bg-gray-200">
      <View className="flex-1 items-center justify rounded-lg shadow-sm py-2 px-4">
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
                onValueChange={value => {
                  setSelectedMaterial(value);
                  fetchProducts(value); // Call the function with the selectedMaterial
                }}
                value={selectedMaterial}>
                <View className="flex flex-row justify-between text-gray-950">
                  <RadioButton.Item
                    position="leading"
                    label="ReadyMade"
                    value="ReadyMade"
                  />
                  <RadioButton.Item
                    position="leading"
                    label="Stitching"
                    value="Stitching"
                  />
                </View>
                <View className="flex flex-row justify-between">
                  <RadioButton.Item
                    position="leading"
                    label="Sale Material"
                    value="Material"
                  />
                  <RadioButton.Item
                    position="leading"
                    label="Accessories"
                    value="Accessories"
                  />
                </View>
              </RadioButton.Group>

              <View className="flex flex-row justify-between">
                <DropDownPicker
                  open={open}
                  value={product}
                  items={productitems.map(productName => ({
                    label: productName,
                    value: productName,
                  }))}
                  setOpen={setOpen}
                  setValue={setProduct}
                  setItems={() => {}}
                  placeholder={selectedMaterial}
                  placeholderStyle={{}}
                  disableBorderRadius={true}
                />
              </View>
              <View className="flex flex-row justify-between">
                <DropDownPicker
                  open={opensize}
                  value={size}
                  items={sizes}
                  setOpen={setOpenSize}
                  setValue={setSize}
                  setItems={setSizes}
                  placeholder="Select Size"
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
                  keyboardType="phone-pad"
                />
              </View>

              <TouchableOpacity
                className="bg-lime-600 text-white font-bold py-2 px-4 rounded-md"
                onPress={handleAddItem}>
                <Text className="text-center text-gray-200 font-semibold text-xl">
                  Add Item
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {currentStep === 3 && (
            // Items Show added
            <ScrollView>
              <View className="px-6 py-2 w-full text-center rounded-md bg-amber-100">
                <Text className="text text-xl p-2 bg-yellow-200 text-gray-600 font-bold">
                  Order Confirmation
                </Text>

                <View className="row justify items-start p-2">
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
                    <Text className="pr-48 text-gray-600 text-lg font-extrabold">
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
                    <View className="flex flex-row justify-between items-center text-gray-950">
                      <Text className="text-gray-800 text-lg font-extrabold">
                        Payment Mode
                      </Text>
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

                  <View className="flex flex-row justify-between gap-5">
                    <TextInput
                      mode="outlined"
                      label="Paid Balance"
                      className="placeholder-gray-800 text-placeholder-gray-800 rounded-md mt-2 w-40"
                      // Add the onChangeText and value for step 3
                      onChangeText={text => setPaidAmt(text)}
                      value={paidamt}
                      keyboardType="phone-pad"
                    />

                    <TextInput
                      mode="outlined"
                      label="Due Balance"
                      className="placeholder-gray-800 text-placeholder-gray-800 rounded-md mt-2 w-40"
                      // Add the onChangeText and value for step 3
                      onChangeText={text => setPaidAmt(text)}
                      value={paidamt}
                      disabled
                    />
                  </View>
                </View>

                <View className="flex flex-row justify-start p-5">
                  <Text className="text-red-500">PDFGenerator component :</Text>
                  <PDFGenerator selectedItems={selectedItems} />
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
                  ? 'Order Confirm'
                  : currentStep === 2
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

      {currentStep === 2 && (
        <View className="flex-1 justify items bg-gray-400 px-2">
          <Text className="text text-xl p-2 bg-gray-200 text-red-600 font-bold">
            Seleted Items List
          </Text>

          <View className="flex flex-row justify-between bg-green-400 mt-1  py-2 px-3">
            <Text className="w-1/12  text-gray-950 font-extrabold">#</Text>
            <Text className="w-1/4 text-gray-950 font-extrabold">Item</Text>
            <Text className="w-1/12  text-gray-950 font-extrabold">
              Quantity
            </Text>
            <Text className="w-1/12  text-gray-950 font-extrabold">Meter</Text>
            <Text className="w-1/12  text-gray-950 font-extrabold">Stitch</Text>
            <Text className="w-1/6 text-gray-950 font-extrabold">
              Material/ QAR
            </Text>
            <Text className="w-1/6 text-gray-950 font-extrabold">Amount</Text>
            <Text className="w-1/8 text-red-500 font-extrabold">Action</Text>
          </View>

          {selectedItems.map((item, index) => (
            <View
              key={index}
              className="flex flex-row justify-between items-center bg-lime-200 border py-1 px-3">
              <Text className="w-1/12 text-zinc-700 font-extrabold">
                {index + 1}
              </Text>
              <Text className="w-1/4 text-zinc-700 font-semibold">
                {item.product}
              </Text>
              <Text className="w-1/12 text-zinc-700 font-semibold">
                {item.quantity}
              </Text>
              <Text className="w-1/12 text-zinc-700 font-semibold">
                {item.quantity}
              </Text>
              <Text className="w-1/12 text-zinc-700 font-semibold">
                {item.quantity}
              </Text>
              <Text className="w-1/6 text-zinc-700 font-semibold">
                {item.quantity}
              </Text>
              <Text className="w-1/6 text-zinc-700 font-semibold">
                {item.quantity}
              </Text>
              {/* Button to remove this item */}
              <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                <Text className="bg-red-500 w-1/8 text-white font-bold p-1 rounded-md">
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {currentStep === 3 && (
        <View className="flex-1 justify items bg-gray-400 px-2">
          <Text className="text text-xl p-2 bg-gray-200 text-red-600 font-bold">
          Order Items Confirmation
          </Text>

          <View className="flex flex-row justify-between bg-green-400 mt-1  py-2 px-3">
            <Text className="w-1/12  text-gray-950 font-extrabold">#</Text>
            <Text className="w-1/4 text-gray-950 font-extrabold">Item</Text>
            <Text className="w-1/12  text-gray-950 font-extrabold">
              Quantity
            </Text>
            <Text className="w-1/12  text-gray-950 font-extrabold">Meter</Text>
            <Text className="w-1/12  text-gray-950 font-extrabold">Stitch</Text>
            <Text className="w-1/6 text-gray-950 font-extrabold">
              Material/ QAR
            </Text>
            <Text className="w-1/6 text-gray-950 font-extrabold">Amount</Text>
          </View>

          {selectedItems.map((item, index) => (
            <View
              key={index}
              className="flex flex-row justify-between items-center bg-lime-200 border py-2 px-3">
              <Text className="w-1/12 text-zinc-700 font-extrabold">
                {index + 1}
              </Text>
              <Text className="w-1/4 text-zinc-700 font-semibold">
                {item.product}
              </Text>
              <Text className="w-1/12 text-zinc-700 font-semibold">
                {item.quantity}
              </Text>
              <Text className="w-1/12 text-zinc-700 font-semibold">
                {item.quantity}
              </Text>
              <Text className="w-1/12 text-zinc-700 font-semibold">
                {item.quantity}
              </Text>
              <Text className="w-1/6 text-zinc-700 font-semibold">
                {item.quantity}
              </Text>
              <Text className="w-1/6 text-zinc-700 font-semibold">
                {item.quantity}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default NewOrderView;
