//src/views/NewOrder.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {TextInput, IconButton, Button, RadioButton} from 'react-native-paper';
import Config from '../api/Config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import {
  saveDataToAsyncStorage,
  getDataFromAsyncStorage,
} from '../helpers/DataToAsyncStorage';
import PDFGenerator from '../components/PDFGenerator'; // Import the PDFGenerator component
import {useFocusEffect} from '@react-navigation/native';

const {CUSTOMER_SEARCH, ALL_PRODUCT_API, ORDER_CREATE_API, } = Config;

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

      setPaid('0');
      setPaidmode('');
      setDiscount('0');
      setBalance('0');

      setSelectedMaterial('Ready Made');
      setMaterial('');
      setOpen(false);
      setProduct(null);
      setProductItems([]);
      setOpenSize(false);
      setSize(null);
      setSizes([{label: 'Free Size', value: 'freesize'}]);
      setDdate('');
      setSelectedItems([]);
      setResetFields(false);
      setTableVisible(false);

      setShouldFetchSavedProducts(true);
    }, []),
  );

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsApp] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [shouldFetchSuggestions, setShouldFetchSuggestions] = useState(true);
  const [error, setError] = useState(null); // State to track errors
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [measurement, setMeasurement] = useState('');
  const [newMpName, setNewMpName] = useState('');
  const [quantity, setQuantity] = useState('');

  const [paid, setPaid] = useState('0');
  const [paidmode, setPaidmode] = useState('');
  const [discount, setDiscount] = useState('0');
  const [balance, setBalance] = useState('0');

  const [selectedMaterial, setSelectedMaterial] = useState('Ready Made');
  const [material, setMaterial] = useState('');
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [productitems, setProductItems] = useState([]);
  const [opensize, setOpenSize] = useState(false);
  const [size, setSize] = useState(null);
  const [sizes, setSizes] = useState([{label: 'Free Size', value: 'freesize'}]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dDate, setDdate] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [resetFields, setResetFields] = useState(false);
  const [isTableVisible, setTableVisible] = useState(false);

  const [shouldFetchSavedProducts, setShouldFetchSavedProducts] =
    useState(true);

  const handleAddItem = () => {
    if (selectedMaterial === 'Stitching') {
      if (newMpName && measurement && product && quantity) {
        const selectedProduct = productitems.find(item => item.id === product);
        //console.log('selectedProduct:', selectedProduct); // Debug statement

        if (selectedProduct) {
          const newItem = {
            value: selectedProduct.id,
            dress_type: selectedProduct.type,
            dress_name: selectedProduct.name,
            unit: selectedProduct.unit,
            price: selectedProduct.price,
            size,
            new_mp_name: newMpName,
            measurement: measurement,
            meter: '',
            quantity,
            total: selectedProduct.price * quantity,
          };

          setSelectedItems([...selectedItems, newItem]);
          setProduct('');
          setSize('');
          setQuantity('');
          setNewMpName('');
          setMeasurement('');
          setResetFields(true);
          setTableVisible(true);

          console.log('Selected Items:', selectedItems);
        }
      }
    } else {
      if (product && size && quantity) {
        const selectedProduct = productitems.find(item => item.id === product);
        //console.log('selectedProduct:', selectedProduct); // Debug statement

        if (selectedProduct) {
          const newItem = {
            value: selectedProduct.id,
            dress_type: selectedProduct.type,
            dress_name: selectedProduct.name,
            unit: selectedProduct.unit,
            price: selectedProduct.price,
            size,
            new_mp_name: '',
            measurement: '',
            meter: '',
            quantity,
            total: selectedProduct.price * quantity,
          };

          setSelectedItems([...selectedItems, newItem]);
          setProduct('');
          setSize('');
          setQuantity('');
          setNewMpName('');
          setMeasurement('');
          setResetFields(true);
          setTableVisible(true);

          console.log('Selected Items:', selectedItems);
        }
      }
    }
  };

  // Function to remove a single item
  const handleRemoveItem = index => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1); // Remove the item at the specified index
    setSelectedItems(updatedItems);
  };

  const fetchProducts = async shouldFetchSavedProducts => {
    try {
      const purl = `${ALL_PRODUCT_API}`;
      const products = await sendGetRequest(purl);
      console.log('GET ALL_PRODUCT_API:', purl);
      console.log('GET Response: ', products);

      if (products.error === false && products.productsByType) {
        // Save the products.productsByType object to AsyncStorage
        await saveDataToAsyncStorage(
          'products',
          JSON.stringify(products.productsByType),
        );
        console.log('Products data saved successfully.');
        setShouldFetchSavedProducts(false);
      } else {
        console.warn('No products data to save.');
      }
    } catch (error) {
      console.error('Error fetching and saving products data:', error);
    }
  };

  // Use the function to retrieve the user data
  const setProductItemsByMaterial = async selectedMaterial => {
    const key = 'products'; // The key you used to save the user data
    const productsData = await getDataFromAsyncStorage(key); // Assuming productsData is a JSON string
    const parsedProductsData = JSON.parse(productsData);
    if (productsData) {
      // User data found; you can use it
      if (
        productsData &&
        selectedMaterial &&
        parsedProductsData[selectedMaterial]
      ) {
        setProductItems(
          parsedProductsData[selectedMaterial].map(product => product),
        );
      } else {
        // Handle the case where selectedMaterial is not a valid key
        console.warn('Invalid selectedMaterial:', parsedProductsData);
        // You can set a default value or show an error message, for example.
      }
    } else {
      // No user data found or not an object
      console.log('No user data found in AsyncStorage or invalid data format.');
      // Handle the absence of data or invalid data format here
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
    setDdate(formattedDate);
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

      if (shouldFetchSavedProducts) {
        fetchProducts();
        console.log('shouldFetchSavedProducts: ', shouldFetchSavedProducts);
      }

      if (selectedMaterial) {
        // Call the function to retrieve product data
        setProductItemsByMaterial(selectedMaterial);
        console.log('Error selectedMaterial:', selectedMaterial);
      }
    },
    [phone],
    [selectedMaterial],
  );

  const fetchSuggestions = async () => {
    if (shouldFetchSuggestions) {
      try {
        // Construct the URL
        ///api/client/customers?q=search&m=1234
        const url = `${CUSTOMER_SEARCH}?q=search&m=${phone}`;

        console.log('GET CUSTOMER_SEARCH:', url);
        const data = await sendGetRequest(url);
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
    setPhone(customer.mobile.toString());
    setName(customer.cname);
    setWhatsApp(customer.whatsapp.toString());
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

  // Grand total amount calculate karna
  let grandTotal = 0;
  selectedItems.forEach(item => {
    grandTotal += item.total;
  });

  const calculateFinalTotal = (grandTotal, discount) => {
    return grandTotal - discount;
  };

  const finalTotal = calculateFinalTotal(grandTotal, discount);

  const calculateFinalBalance = (finalTotal, paid) => {
    return finalTotal - paid;
  };

  const finalBalance = calculateFinalBalance(finalTotal, paid);

  const billing = {
    total: grandTotal,
    discount: discount,
    paytotal: finalTotal,
    paid: paid,
    balance: finalBalance,
    paidmode: paidmode,
  };

  // Update the customer object
  const customer = {
    name: name, // Update with actual name value
    mobile: phone, // Store as an integer
    whatsapp: whatsapp, // Store as an integer
  };
  // console.log(customer);

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

      setIsLoading(false);
    } else if (currentStep === 2) {
      // Handle step 2 logic
      // You can add more checks or actions for step 2 here
    } else if (currentStep === 3) {
      // Handle step 3 logic

      // Define a function to convert selectedItems into products
      const convertSelectedItemsToProducts = selectedItems => {
        const products = selectedItems.map((item, index) => ({
          value: item.value,
          dress_type: item.dress_type,
          dress_name: item.dress_name,
          unit: item.unit,
          price: item.price,
          size: item.size,
          new_mp_name: item.new_mp_name,
          measurement: item.measurement,
          meter: item.meter,
          quantity: item.quantity,
          total: item.total,
        }));
        return products;
      };

      //function to convert selectedItems when you need to update the products data:
      const products = convertSelectedItemsToProducts(selectedItems);

      const createInvoiceData = (dDate, customer, products, billing) => {
        return {
          dDate,
          fForm: {
            customer,
            products,
            billing,
          },
        };
      };

      // Generate invoice data based on the customer, products, and billing data
      const invoiceData = createInvoiceData(dDate, customer, products, billing);
      console.warn('products: ', products);
      console.warn('invoiceData: ', invoiceData);

      // Send the POST request
      const createOrder = async () => {
        try {
          const response = await sendPostRequest(ORDER_CREATE_API, invoiceData);

          if (response.error) {
            console.error('Error creating order:', response.message);
            // Handle the error here
          } else {
            console.log('Order created successfully:', response);
            // Handle the success response here
          }
        } catch (error) {
          console.error('Error creating order:', error);
          // Handle the error here
        }
      };

      // Call the createOrder function to send the POST request
      createOrder();
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View className="flex-1 flex-row bg-gray-200">
        <View className="flex-1 items-center justify rounded-lg shadow-sm py-1">
          <Text className="text-xl text-center font-semibold text-gray-900">
            Order Details (Step {currentStep}/3)
          </Text>

          <View
            className={
              currentStep === 3
                ? 'flex w-full flex-col gap-6'
                : 'flex w-72 flex-col gap-6 pt-5'
            }>
            {currentStep === 1 && (
              <TextInput
                mode="outlined"
                label="Phone Number"
                className={
                  suggestions.length > 0
                    ? 'rounded-md w-full -mb-6'
                    : 'rounded-md w-full mt-2'
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
                keyExtractor={item => item.mobile.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handleSelectSuggestion(item)}>
                    <View className="border border-gray-400 px-4 py-1">
                      <Text className="text-base text-gray-800">
                        {item.mobile}
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
                className="rounded-md mt-2 w-full"
                onChangeText={text => setName(text)}
                value={name}
                placeholder="Full Name"
              />
            )}

            {currentStep === 1 && (
              <TextInput
                mode="outlined"
                label="WhatsApp Number"
                className="rounded-md mt-2 w-full"
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
                    setProductItemsByMaterial(value); // Call the function with the selectedMaterial
                  }}
                  value={selectedMaterial}>
                  <View className="flex flex-row justify-between text-gray-950">
                    <RadioButton.Item
                      position="leading"
                      label="Ready Made"
                      value="Ready Made"
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
                      value="Sale Material"
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
                    items={productitems.map(product => ({
                      label: product.name,
                      value: product.id, // Set the entire product object as the value
                    }))}
                    setOpen={setOpen}
                    setValue={setProduct}
                    setItems={() => {}}
                    placeholder={selectedMaterial}
                    placeholderStyle={{fontWeight: 'bold', fontSize: 16}}
                    disableBorderRadius={false}
                    showArrowIcon={false}
                    showTickIcon={true}
                    theme="LIGHT"
                    autoScroll
                    dropDownDirection="TOP"
                  />
                </View>
                {selectedMaterial === 'Stitching' ? null : (
                  <View className="flex flex-row justify-between">
                    <DropDownPicker
                      open={opensize}
                      value={size}
                      items={sizes}
                      setOpen={setOpenSize}
                      setValue={setSize}
                      setItems={setSizes}
                      placeholder="Select Size"
                      disableBorderRadius={false}
                      autoScroll
                      placeholderStyle={{fontWeight: 'bold', fontSize: 16}}
                      showArrowIcon={false}
                      theme="LIGHT"
                      dropDownDirection="TOP"
                    />
                  </View>
                )}

                {selectedMaterial === 'Stitching' ? (
                  <View>
                    <TextInput
                      mode="outlined"
                      label="New MP Name"
                      className="rounded-md mt-2 w-full"
                      onChangeText={text => setNewMpName(text)}
                      value={newMpName}
                      placeholder="New MP Name"
                    />

                    <TextInput
                      mode="outlined"
                      label="Measurement"
                      className="rounded-md mt-2 w-full"
                      onChangeText={text => setMeasurement(text)}
                      value={measurement}
                      multiline={true} // Multiline prop for a comment box type input
                      numberOfLines={3} // Number of lines to display (adjust as needed)
                    />
                  </View>
                ) : null}

                <View>
                  <TextInput
                    mode="outlined"
                    label="Quantity"
                    className="rounded-md mt-2 w-full"
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

                  <View className="flex flex-row justify-end items-center pt-4">
                    <Text className="w-1/4 border py-1 px-2 border-gray-500  text-gray-950 font-extrabold">
                      Delivery Date
                    </Text>

                    <View className="flex-row w-1/4 h-14 border py-1 px-1 border-gray-500">
                      <TextInput
                        mode="outlined"
                        value={dDate} // Display the selected date
                        onTouchStart={showDatePicker} // Show the date picker when the input is touched
                        className="flex-1 "
                        available
                        space
                      />
                      <IconButton
                        icon="calendar"
                        color="#000"
                        size={24}
                        onPress={showDatePicker}
                      />
                    </View>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date" // You can change this to "datetime" for date and time
                      onConfirm={handleDateConfirm}
                      onCancel={hideDatePicker}
                    />
                  </View>

                  <View className="flex flex-row justify-end items-center">
                    <Text className="w-1/4 border py-1 px-2 border-gray-500  text-gray-950 font-extrabold">
                      Grand Total
                    </Text>
                    <Text className="w-1/4  border py-1 px-2 border-gray-500  text-gray-950 font-extrabold">
                      QAR {grandTotal}
                    </Text>
                  </View>

                  <View className="flex flex-row justify-end items-center">
                    <Text className="w-1/4 border py-1 px-2 border-gray-500  text-gray-950 font-extrabold">
                      Discount
                    </Text>
                    <View className="flex-row w-1/4 h-14 border py-1 px-1 border-gray-500">
                      <TextInput
                        mode="outlined"
                        className="rounded-md w-40"
                        // Add the onChangeText and value for step 3
                        onChangeText={text => setDiscount(text)}
                        value={discount}
                        keyboardType="phone-pad"
                      />
                    </View>
                  </View>

                  <View className="flex flex-row justify-end items-center">
                    <Text className="w-1/4 border py-1 px-2 border-gray-500  text-gray-950 font-extrabold">
                      Pay Total
                    </Text>
                    <Text className="w-1/4  border py-1 px-2 border-gray-500  text-gray-950 font-extrabold">
                      QAR {finalTotal}
                    </Text>
                  </View>

                  <View className="flex flex-row justify-end items-center">
                    <Text className="w-1/4 border py-1 px-2 border-gray-500  text-gray-950 font-extrabold">
                      Pay Mode
                    </Text>

                    <RadioButton.Group
                      onValueChange={value => setPaidmode(value)}
                      value={paidmode}>
                      <View className="flex-row w-44 border border-gray-500">
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
                  </View>

                  <View className="flex flex-row justify-end items-center">
                    <Text className="w-1/4 border py-1 px-2 border-gray-500  text-gray-950 font-extrabold">
                      Paid
                    </Text>

                    <View className="flex-row w-1/4 h-14 border py-1 px-1 border-gray-500">
                      <TextInput
                        mode="outlined"
                        className="rounded-md w-40"
                        // Add the onChangeText and value for step 3
                        onChangeText={text => setPaid(text)}
                        value={paid}
                        keyboardType="phone-pad"
                      />
                    </View>
                  </View>

                  <View className="flex flex-row justify-end items-center">
                    <Text className="w-1/4 border py-1 px-2 border-gray-500  text-gray-950 font-extrabold">
                      Balance
                    </Text>
                    <Text className="w-1/4  border py-1 px-2 border-gray-500  text-gray-950 font-extrabold">
                      QAR {finalBalance}
                    </Text>
                  </View>

                  <View className="flex flex-row justify-start p-5">
                    <Text className="text-red-500">
                      PDFGenerator component :
                    </Text>
                    <PDFGenerator
                      selectedItems={selectedItems}
                      customer={customer}
                      billing={billing}
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
                    ? 'Order Confirm'
                    : currentStep === 2
                    ? 'NEXT'
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
              <Text className="w-1/6 text-gray-950 font-extrabold">
                Item Name
              </Text>
              <Text className="w-1/6 text-gray-950 font-extrabold">
                Dress Type
              </Text>
              <Text className="w-1/12  text-gray-950 font-extrabold">Size</Text>
              <Text className="w-1/12  text-gray-950 font-extrabold">Qty</Text>
              <Text className="w-1/12  text-gray-950 font-extrabold">
                Price
              </Text>
              <Text className="w-1/6 text-gray-950 font-extrabold">Total</Text>
              {/* <Text className="w-1/6 text-gray-950 font-extrabold">Amount</Text> */}
              <Text className="w-1/8 text-red-500 font-extrabold">Action</Text>
            </View>

            {selectedItems.map((item, index) => (
              <View
                key={index}
                className="flex flex-row justify-between items-center bg-lime-200 border py-1 px-3">
                <Text className="w-1/12 text-zinc-700 font-extrabold">
                  {index + 1}
                </Text>
                <Text className="w-1/6 text-zinc-700 font-semibold">
                  {item.dress_name ? item.dress_name : 'N/A'}
                </Text>
                <Text className="w-1/6 text-zinc-700 font-semibold">
                  {item.dress_type}
                </Text>
                <Text className="w-1/12 text-zinc-700 font-semibold">
                  {item.size}
                </Text>
                <Text className="w-1/12 text-zinc-700 font-semibold">
                  {item.quantity}
                </Text>
                <Text className="w-1/12 text-zinc-700 font-semibold">
                  {item.price}
                </Text>

                <Text className="w-1/6 text-zinc-700 font-semibold">
                  {item.total}
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
              <Text className="w-1/6 text-gray-950 font-extrabold">
                Item Name
              </Text>
              <Text className="w-1/6 text-gray-950 font-extrabold">
                Dress Type
              </Text>
              <Text className="w-1/12  text-gray-950 font-extrabold">Size</Text>
              <Text className="w-1/12  text-gray-950 font-extrabold">Qty</Text>
              <Text className="w-1/12  text-gray-950 font-extrabold">
                Price
              </Text>
              <Text className="w-1/6 text-gray-950 font-extrabold">Total</Text>
            </View>

            {selectedItems.map((item, index) => (
              <View
                key={index}
                className="flex flex-row justify-between items-center bg-lime-200 border py-2 px-3">
                <Text className="w-1/12 text-zinc-700 font-extrabold">
                  {index + 1}
                </Text>
                <Text className="w-1/6 text-zinc-700 font-semibold">
                  {item.dress_name ? item.dress_name : 'N/A'}
                </Text>
                <Text className="w-1/6 text-zinc-700 font-semibold">
                  {item.dress_type}
                </Text>
                <Text className="w-1/12 text-zinc-700 font-semibold">
                  {item.size}
                </Text>
                <Text className="w-1/12 text-zinc-700 font-semibold">
                  {item.quantity}
                </Text>
                <Text className="w-1/12 text-zinc-700 font-semibold">
                  {item.price}
                </Text>

                <Text className="w-1/6 text-zinc-700 font-semibold">
                  {item.total}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default NewOrderView;
