//src/views/NewOrder.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {TextInput, IconButton, RadioButton} from 'react-native-paper';
import Config from '../api/Config';
import {
  sendPostRequest,
  sendGetRequest,
} from '../helpers/apiRequestWithHeaders';
import ErrorPopup from '../components/ErrorPopup';
import OrderSuccessPopup from '../components/OrderDone';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  saveDataToAsyncStorage,
  getDataFromAsyncStorage,
} from '../helpers/DataToAsyncStorage';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';
import LoaderOnly from '../components/LoaderOnly'; // Adjust the path based on your project structure
import CheckBox from 'react-native-check-box';

const {
  CUSTOMER_SEARCH_API,
  ALL_PRODUCT_API,
  ORDER_CREATE_API,
  ORDER_DETAILS_API,
} = Config;

const NewOrderView = () => {
  // Set the displayName property for the functional component
  NewOrderView.displayName = 'NewOrderView';
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      // Your code to refresh the screen when it's focused
      // For example, reset your states here
      setPhone('');
      setName('');
      setWhatsApp('');
      setSuggestions([]);
      setMPSuggestions([]);
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
      setMaterialColors([]);
      setOpenMC(false);
      setOpen(false);
      setProduct(null);
      setProductItems([]);
      setOpenSize(false);
      setSize('freesize');
      setSizes([{label: 'Free Size', value: 'freesize'}]);
      setDdate('');
      setSelectedItems([]);
      setResetFields(false);
      setTableVisible(false);
      setShouldFetchSavedProducts(true);
      setIsSuccessModalVisible(false);
      setOrderDetails(null);
      setInvoicePrintVisible(false);
      setOrderPrintVisible(false);
      setMPName('');
      setNewMpName('');
      setIsLoader(false);
      setIsChecked(false);
      setClothColor('');
      setMeter('');
    }, []),
  );

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsApp] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [mpSuggestions, setMPSuggestions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [shouldFetchSuggestions, setShouldFetchSuggestions] = useState(true);
  const [error, setError] = useState(null); // State to track errors
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [measurement, setMeasurement] = useState('');
  const [newMpName, setNewMpName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [paid, setPaid] = useState('0');
  const [paidmode, setPaidmode] = useState('');
  const [discount, setDiscount] = useState('0');
  const [balance, setBalance] = useState('0');
  const [selectedMaterial, setSelectedMaterial] = useState('Ready Made');
  const [materialColors, setMaterialColors] = useState('');
  const [openMC, setOpenMC] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMP, setOpenMP] = useState(false);
  const [mpName, setMPName] = useState('');
  const [product, setProduct] = useState(null);
  const [productitems, setProductItems] = useState([]);
  const [opensize, setOpenSize] = useState(false);
  const [size, setSize] = useState('freesize');
  const [sizes, setSizes] = useState([{label: 'Free Size', value: 'freesize'}]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dDate, setDdate] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [resetFields, setResetFields] = useState(false);
  const [isTableVisible, setTableVisible] = useState(false);
  const [shouldFetchSavedProducts, setShouldFetchSavedProducts] =
    useState(true);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [isInvoicePrintVisible, setInvoicePrintVisible] = useState(false);
  const [isOrderPrintVisible, setOrderPrintVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [clothColor, setClothColor] = useState('');
  const [meter, setMeter] = useState('');

  const generateUniqueTagId = () => {
    // Generate a random 3-digit number
    return Math.floor(100 + Math.random() * 900);
  };
  // Initial unique tag ID
  const initialUniqueTagId = generateUniqueTagId();
  const [uniqueTagId, setUniqueTagId] = useState(initialUniqueTagId);

  const handleAddItem = () => {
    const newUniqueTagId = generateUniqueTagId();
    setUniqueTagId(newUniqueTagId);

    if (selectedMaterial === 'Stitching') {
      if (
        newMpName &&
        measurement &&
        product &&
        quantity &&
        clothColor &&
        meter &&
        isChecked
      ) {
        const selectedClothColor = materialColors.find(
          materialColor => materialColor.id === clothColor,
        );

        const newItemcolor = {
          tag: uniqueTagId,
          value: selectedClothColor.id,
          dress_type: selectedClothColor.type,
          dress_name: selectedClothColor.name,
          unit: selectedClothColor.unit,
          price: selectedClothColor.price,
          size: '',
          new_mp_name: '',
          measurement: '',
          meter: meter,
          quantity: meter,
          total: selectedClothColor.price * quantity,
        };

        const selectedProduct = productitems.find(item => item.id === product);

        const newItem = {
          tag: uniqueTagId,
          value: selectedProduct.id,
          dress_type: selectedProduct.type,
          dress_name: selectedProduct.name,
          unit: selectedProduct.unit,
          price: selectedProduct.price,
          size: '',
          new_mp_name: newMpName,
          measurement: measurement,
          meter: '',
          quantity,
          total: selectedProduct.price * quantity,
        };

        // If selectedClothColor doesn't exist, add only newItem
        setSelectedItems([...selectedItems, newItem, newItemcolor]);
        console.log('selectedClothColor Items:', newItemcolor);
        console.log('selectedItems :', selectedItems);
        console.log('setSelectedItems :', setSelectedItems);

        setClothColor('');
        setIsChecked(false);
        setMeter('');
        setProduct('');
        setQuantity('');
        setNewMpName('');
        setMeasurement('');
        setResetFields(true);
        setTableVisible(true);
        console.log('Selected Maah Items:', newItem);
        console.log('Selected Maah Items:', selectedItems);
      } else if (
        selectedMaterial === 'Stitching' &&
        newMpName &&
        measurement &&
        product &&
        quantity
      ) {
        const selectedProduct = productitems.find(item => item.id === product);
        //console.log('selectedProduct:', selectedProduct); // Debug statement

        if (selectedProduct) {
          const newItem = {
            tag: uniqueTagId,
            value: selectedProduct.id,
            dress_type: selectedProduct.type,
            dress_name: selectedProduct.name,
            unit: selectedProduct.unit,
            price: selectedProduct.price,
            size: '',
            new_mp_name: newMpName,
            measurement: measurement,
            meter: '',
            quantity,
            total: selectedProduct.price * quantity,
          };

          setSelectedItems([...selectedItems, newItem]);
          setProduct('');
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
            tag: uniqueTagId,
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
          setSize('freesize');
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
        console.log('No products data to save.');
      }
    } catch (error) {
      console.log('Error fetching and saving products data:', error);
    }
  };

  // Use the function to retrieve the user data
  const setProductItemsByMaterial = async selectedMaterial => {
    const key = 'products'; // The key you used to save the user data
    const productsData = await getDataFromAsyncStorage(key); // Assuming productsData is a JSON string
    const parsedProductsData = JSON.parse(productsData);

    const MaterialType = 'Sale Material';
    setMaterialColors(parsedProductsData[MaterialType]);

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
        console.log('Invalid selectedMaterial:', parsedProductsData);
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
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

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
        const url = `${CUSTOMER_SEARCH_API}?q=search&m=${phone}`;

        console.log('GET CUSTOMER_SEARCH_API:', url);
        const data = await sendGetRequest(url);
        console.log('GET Response:', data.customer);
        if (data.error === false) {
          setSuggestions(data.customer);
        }
        if (data.error === true) {
          setSuggestions([]);
        }
      } catch (error) {
        console.log('Error fetching suggestions:', error);
      }
    }
  };

  const fetchMPSuggestions = async () => {
    try {
      // Construct the URL
      //USE /api/client/mp?q=search&m=1234543456
      const url = `${Config.CUSTOMER_MP_LIST_API}?q=search&m=${phone}`;

      console.log('GET CUSTOMER_MP_LIST_API:', url);
      const data = await sendGetRequest(url);
      console.log('GET MP Response:', data);
      if (data.error === false) {
        setMPSuggestions(data.mp);
      }
    } catch (error) {
      console.log('Error fetching suggestions:', error);
    }
  };

  // Dynamically add "New MP" to the mpSuggestions array
  const newMpItem = {name: 'New', measurement: ''};
  const oldMpItem = {name: 'Old', measurement: ''};
  const updatedMpSuggestions = [...mpSuggestions, newMpItem, oldMpItem];

  const handleMPValueChange = () => {
    const selectedMP = updatedMpSuggestions.find(
      mpItem => mpItem.name === mpName,
    );
    if (selectedMP) {
      if (selectedMP.name === 'New') {
        // setNewMpName('');
        // setMeasurement('');
      } else {
        if (selectedMP.name === 'Old') {
          // setNewMpName('');
        } else {
          setNewMpName(selectedMP.name);
          setMeasurement(selectedMP.measurement);
          setMPName('Old');
        }
      }
    } else {
      // Handle case when the selected MP is not found
      // console.warn('Selected MP not found:', mpName);//
    }
  };

  useEffect(() => {
    handleMPValueChange();
    // This effect will run whenever newMpName or selectedMP changes
    if (newMpName === mpName) {
      // Do something when newMpName matches selectedMP.name
      console.log('Match found!');
      //setMPName('Old');
    } else {
      // Do something else when newMpName does not match selectedMP.name
      console.log('No match.');
      //setMPName('New');
    }
  }, [newMpName, mpName]);

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
    mobile: parseInt(phone), // Convert to integer
    whatsapp: parseInt(whatsapp), // Convert to integer
  };
  console.log(customer);

  const handleNext = async () => {
    // Handle each step *1*
    if (currentStep === 1) {
      // Check if any of the required fields are empty
      if (!phone || !whatsapp || !name) {
        setError('Please fill in all required fields');
        return;
      }
      // Set the loading state to true
      fetchMPSuggestions();
    } else if (currentStep === 2) {
      // Handle step 2 logic
      // Check if any of the required fields are empty
      if (
        !selectedMaterial ||
        !selectedItems ||
        selectedItems.length === 0 ||
        !selectedItems[0].dress_name
      ) {
        setError('Please fill in all required fields');
        return;
      }

      // You can add more checks or actions for step 2 here
    } else if (currentStep === 3) {
      // Handle step 3 logic

      // Check if any of the required fields are empty
      if (!dDate) {
        setError('Please fill in all required fields');
        return;
      }

      // Assuming paid is a state variable
      if (paid === 0) {
        setPaidmode('');
      }

      if (paidmode && (paid === 0 || paid === null || paid < 0)) {
        setPaidmode('');
        setError('Invalid Amount for paid');
        return;
      }

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
      // console.warn('products: ', products);
      // console.warn('invoiceData: ', invoiceData);

      // Send the POST request
      const createOrder = async () => {
        setIsLoader(true);
        try {
          const response = await sendPostRequest(ORDER_CREATE_API, invoiceData);

          if (response.error) {
            //console.error('Error creating order:', response.message);
            setIsLoader(false);
            setError('creating order ', response);
            // Handle the error here
          } else {
            console.log('Order created successfully:', response);
            // Set order details and show success modal
            setOrderDetails(response);
            // Trigger the second API call after successfully creating the order
            if (response.order_id) {
              fetchInvoiceDetails(response.order_id);
            } else {
              setIsLoader(false);
              console.log('No order ID available to fetch details.');
            }
            // setIsSuccessModalVisible(true);
          }
        } catch (error) {
          setIsLoader(false);
          console.error('Error creating order:', error);
          // Handle the error here
        }
      };

      // Call the createOrder function to send the POST request
      createOrder();
    }

    // Function to fetch invoice details
    const fetchInvoiceDetails = async orderId => {
      try {
        // Check if orderId exists
        if (orderId) {
          // If orderId exists, fetch details
          const orderUrl = `${Config.ORDER_DETAILS_API}?oid=${orderId}`;
          const invoiceDetailsResponse = await sendGetRequest(orderUrl);

          if (invoiceDetailsResponse.error) {
            console.error(
              'Error fetching invoice details:',
              invoiceDetailsResponse.message,
            );
            setIsLoader(false);
            // Handle the error here
          } else {
            // Assuming the data is an array
            const updatedInvoiceDetails = invoiceDetailsResponse.data[0];
            setInvoiceDetails(updatedInvoiceDetails);
            setIsSuccessModalVisible(true);
            setIsLoader(false);
          }
        } else {
          console.log('No order ID available to fetch details.');
          setIsLoader(false);
        }
      } catch (error) {
        console.error('Error fetching invoice details:', error);
        setIsLoader(false);
        // Handle the error here
      }
    };

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

  // Function to close the success modal
  const closeSuccessModal = () => {
    setIsSuccessModalVisible(false);
    // Add any additional actions you want to perform after closing the modal
  };

  const handleInvoicePrint = async () => {
    // Check if invoiceDetails exist
    if (invoiceDetails) {
      setIsLoader(true);
      setInvoicePrintVisible(!isInvoicePrintVisible);
      setIsLoader(false);
    } else {
      // Handle the case when invoiceDetails do not exist
      console.log('No invoice details available.');
    }
  };

  const handleNewOrder = () => {
    // Navigate to the "NewOrder" screen
    navigation.navigate('Home'); // Replace 'NewOrder' with the actual name of your NewOrder screen
    setOrderDetails(null);
  };

  const paidHandleFocus = () => {
    // When the TextInput is focused, select the text
    setPaid(paid === '0' ? '' : paid);
  };

  const paidHandleChangeText = text => {
    // Remove leading zeros
    const sanitizedPaid = text.replace(/^0+/, '');
    // Update the state when the user types a new value or clears the input
    setPaid(sanitizedPaid === '' ? '0' : sanitizedPaid);
  };

  const disHandleFocus = () => {
    // When the TextInput is focused, select the text
    setDiscount(discount === '0' ? '' : discount);
  };

  const disHandleChangeText = text => {
    // Remove leading zeros
    const sanitizedDisc = text.replace(/^0+/, '');
    // Update the state when the user types a new value or clears the input
    setDiscount(sanitizedDisc === '' ? '0' : sanitizedDisc);
  };

  const handleMaterialChange = () => {
    setShowTextInput(!showTextInput); // Toggle the state when the Material changes
  };

  return (
    <SafeAreaView className="flex-1">
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}> */}

      <ScrollView>
        <View className="">
          <View className="bg-white border m-1">
            <Text className="text-2xl text-center font-semibold text-gray-400 py-1">
              Enter Details To Create New Order.
            </Text>
          </View>
          <View className="bg-gray-200 rounded-sm p-1 items-center">
            <Text className="text-xl bg-white p-1 w-72 rounded-md text-center font-semibold text-gray-900">
              {currentStep === 1 && 'Customer Details'}
              {currentStep === 2 && 'Select Products'}
              {currentStep === 3 && 'Billing Details'} (Step {currentStep}/3)
            </Text>
          </View>
        </View>
        <View className="flex-1 flex-row">
          <View className="flex-1 items-center justify">
            <View
              className={
                currentStep === 3
                  ? 'flex w-full flex-col gap-6'
                  : 'flex w-72 flex-col gap-6 pt-5'
              }>
              {/* loader Show */}
              {/* <LoaderOnly isLoading={isLoading} /> */}

              {currentStep === 1 && (
                <View>
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
                </View>
              )}

              {suggestions.length > 0 && currentStep === 1 && (
                <View>
                  <ScrollView className="bg-gray-200">
                    {suggestions.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleSelectSuggestion(item)}>
                        <View className="border border-gray-400 px-4 py-1">
                          <Text className="text-base text-gray-800">
                            {item.mobile}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              {currentStep === 1 && (
                <View>
                  <TextInput
                    mode="outlined"
                    label="Full Name"
                    className="rounded-md mt-2 w-full"
                    onChangeText={text => setName(text)}
                    value={name}
                    placeholder="Full Name"
                  />
                </View>
              )}

              {currentStep === 1 && (
                <View>
                  <TextInput
                    mode="outlined"
                    label="WhatsApp Number"
                    className="rounded-md mt-2 w-full"
                    placeholder="WhatsApp"
                    onChangeText={text => setWhatsApp(text)}
                    value={whatsapp}
                    keyboardType="phone-pad"
                  />
                </View>
              )}

              {currentStep === 2 && (
                // Render step 2 fields
                <View className="flex-1 justify items bg-gray-100 gap-2">
                  <View className="flex justify-start">
                    <RadioButton.Group
                      onValueChange={value => {
                        setSelectedMaterial(value);
                        setProductItemsByMaterial(value); // Call the function with the selectedMaterial
                      }}
                      value={selectedMaterial}>
                      <View className="flex flex-row text-gray-950">
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
                      <View className="flex flex-row text-gray-950">
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
                  </View>

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
                      placeholder="Select Product"
                      placeholderStyle={{fontWeight: 'bold', fontSize: 16}}
                      disableBorderRadius={false}
                      showArrowIcon={true}
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
                        showArrowIcon={true}
                        showTickIcon={true}
                        theme="LIGHT"
                        dropDownDirection="TOP"
                      />
                    </View>
                  )}

                  {selectedMaterial === 'Stitching' ? (
                    <View>
                      {/* mp name working Done  */}
                      <DropDownPicker
                        open={openMP}
                        value={mpName}
                        items={updatedMpSuggestions.map(mpItem => ({
                          label: mpItem.name,
                          value: mpItem.name,
                          disabled: mpItem.name === 'Old', // Disable only the "New MP" item
                        }))}
                        setOpen={setOpenMP}
                        setValue={setMPName}
                        setItems={() => {}}
                        placeholder="Select MP name"
                        placeholderStyle={{fontWeight: 'bold', fontSize: 16}}
                        disableBorderRadius={false}
                        showArrowIcon={true}
                        showTickIcon={true}
                        theme="LIGHT"
                        autoScroll
                        dropDownDirection="TOP"
                      />

                      <TextInput
                        mode="outlined"
                        label="New MP Name"
                        className="rounded-md w-full"
                        onChangeText={text => setNewMpName(text)}
                        value={newMpName}
                        placeholder="New MP Name"
                      />

                      <TextInput
                        mode="outlined"
                        label="Measurement"
                        className="rounded-md mt-1 w-full"
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
                      className="rounded-md mb-2 w-full"
                      // Add the onChangeText and value for step 2
                      onChangeText={text => setQuantity(text)}
                      value={quantity}
                      keyboardType="phone-pad"
                    />
                  </View>

                  {selectedMaterial === 'Stitching' && (
                    <CheckBox
                      value={isChecked}
                      onClick={() => setIsChecked(!isChecked)}
                      isChecked={isChecked}
                      rightText="Material"
                      righTextStyle={{
                        fontSize: 16,
                        color: isChecked ? 'green' : 'black',
                        fontWeight: 'bold',
                      }}
                    />
                  )}

                  {selectedMaterial === 'Stitching' && isChecked && (
                    <View>
                      <DropDownPicker
                        open={openMC}
                        value={clothColor}
                        items={materialColors.map(materialColor => ({
                          label: materialColor.name,
                          value: materialColor.id, // Set the entire product object as the value
                        }))}
                        setOpen={setOpenMC}
                        setValue={setClothColor}
                        setItems={() => {}}
                        placeholder="Select Color"
                        placeholderStyle={{fontWeight: 'bold', fontSize: 16}}
                        disableBorderRadius={false}
                        showArrowIcon={true}
                        showTickIcon={true}
                        theme="LIGHT"
                        autoScroll
                        dropDownDirection="TOP"
                      />

                      <TextInput
                        mode="outlined"
                        label="Meter"
                        value={meter}
                        keyboardType="phone-pad"
                        onChangeText={text => setMeter(text)}
                        style={{marginTop: 10}}
                      />
                    </View>
                  )}

                  <TouchableOpacity
                    className="bg-lime-500 text-white font-bold py-2 px-4 rounded-md"
                    onPress={handleAddItem}>
                    <Text className="text-center text-white font-semibold text-xl">
                      Add Item
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {currentStep === 3 && (
                // Items Show added
                <ScrollView>
                  <View className="w-full text-center rounded-md bg-gray-100">
                    <Text className="text text-xl px-3 py-1 mt-1  bg-gray-300 text-gray-950 font-light">
                      Order Confirmation
                    </Text>

                    <View className="flex flex-row mt-2">
                      <View className="flex-1 justify-between pl-4">
                        {/* <Text>Side 1 </Text> */}

                        <Text className="  py-1 px-2 text-gray-950 font-extrabold">
                          Delivery Date
                        </Text>

                        <Text className=" py-1 px-2 text-gray-950 font-extrabold">
                          Grand Total
                        </Text>
                        <Text className="py-1 px-2 text-gray-950 font-extrabold">
                          Discount
                        </Text>
                        <Text className="py-1 px-2  text-gray-950 font-extrabold">
                          Pay Total
                        </Text>
                        <Text className="py-1 px-2 text-gray-950 font-extrabold">
                          Pay Mode
                        </Text>
                        <Text className="py-1 px-2 text-gray-950 font-extrabold">
                          Paid
                        </Text>
                        <Text className="py-1 px-2 text-gray-950 font-extrabold">
                          Balance
                        </Text>
                      </View>

                      <View className="flex-1 justify-between items-end">
                        {/* <Text>Side 2 </Text> */}

                        <View className="flex-row h-14  py-1 px-1 ">
                          <TouchableWithoutFeedback onPress={showDatePicker}>
                            <View>
                              <TextInput
                                mode="outlined"
                                label="Delivery Date"
                                placeholder="Delivery Date"
                                value={dDate} // Display the selected date
                                onFocus={showDatePicker} // Show the date picker when the input is touched
                                className="flex-1 w-40"
                                editable={false}
                              />
                            </View>
                          </TouchableWithoutFeedback>
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
                          // date={selectedDate}
                          minimumDate={new Date()} // Set minimum date to the current date
                          onConfirm={handleDateConfirm}
                          onCancel={hideDatePicker}
                        />

                        <Text className="py-1 px-2 text-lg  text-gray-500 font-extrabold">
                          QAR {grandTotal}
                        </Text>

                        <View className="flex-row h-14 py-1 px-1 ">
                          <TextInput
                            mode="outlined"
                            className="rounded-md w-40 text-green-600"
                            // Add the onChangeText and value for step 3
                            // onChangeText={text => setPaid(text)}
                            onChangeText={disHandleChangeText}
                            value={discount}
                            onFocus={disHandleFocus}
                            keyboardType="phone-pad"
                          />
                        </View>
                        <Text className="py-1 px-2 text-xl text-gray-800 font-extrabold">
                          QAR {finalTotal}
                        </Text>

                        <RadioButton.Group
                          onValueChange={value => setPaidmode(value)}
                          value={paidmode}>
                          <View className="flex-row">
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

                        <View className="flex-row h-14 py-1 px-1 ">
                          {paidmode === 'card' || paidmode === 'cash' ? (
                            <TextInput
                              mode="outlined"
                              className="rounded-md w-40 text-green-600"
                              onChangeText={paidHandleChangeText}
                              value={paid}
                              onFocus={paidHandleFocus}
                              keyboardType="phone-pad"
                            />
                          ) : (
                            <TextInput
                              mode="outlined"
                              className="rounded-md w-40 text-green-600"
                              editable={false} // Make the TextInput not editable
                              disabled
                              value={paid}
                            />
                          )}
                        </View>

                        <Text className="py-1 px-2  text-2xl text-red-700 font-extrabold">
                          QAR {finalBalance}
                        </Text>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              )}

              <View className="flex flex-row justify-between">
                {currentStep > 1 && (
                  <TouchableOpacity
                    className="bg-gray-300 text-white font-bold py-2 px-6 mb-10 rounded-md"
                    onPress={handleBack}>
                    <Text className="text-center text-gray-800 font-semibold text-xl">
                      Back
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  className="bg-gray-800 w-40 text-white font-bold py-2 px-4 mb-10 rounded-md"
                  onPress={handleNext}>
                  <Text className="text-center text-gray-50 font-semibold text-xl">
                    {isLoading
                      ? 'Processing...'
                      : currentStep === 3
                      ? 'Order Confirm'
                      : currentStep === 2
                      ? 'Next'
                      : 'Next'}
                  </Text>
                </TouchableOpacity>
              </View>

              <ErrorPopup
                isVisible={error !== null}
                errorMessage={error}
                onClose={handleCloseError}
              />

              {/* Conditionally render Order Success Popup */}
              {orderDetails?.order_id && (
                <OrderSuccessPopup
                  isVisible={isSuccessModalVisible}
                  orderDetails={orderDetails}
                  onClose={handleNewOrder}
                  onInvoicePrint={handleInvoicePrint}
                  isLoading={isLoading}
                  invoiceDetails={invoiceDetails}
                  isInvoicePrintVisible={isInvoicePrintVisible}
                />
              )}
            </View>
          </View>

          {currentStep === 2 && (
            <View className="flex-1 justify items bg-gray-100 px-2">
              <Text className="text text-xl p-2 bg-gray-50 text-gray-900 font-bold">
                Seleted Items
              </Text>

              <View className="flex flex-row justify-between bg-gray-300 mt-1  py-2 px-3">
                <Text className="w-1/12  text-gray-950 font-extrabold">#</Text>
                <Text className="w-1/12  text-gray-950 font-extrabold">
                  Tag
                </Text>
                <Text className="w-1/6 text-gray-950 font-extrabold">
                  Item Name
                </Text>
                <Text className="w-1/6 text-gray-950 font-extrabold">
                  Dress Type
                </Text>
                <Text className="w-1/12  text-gray-950 font-extrabold">
                  Size
                </Text>
                <Text className="w-1/12  text-gray-950 font-extrabold">
                  Qty
                </Text>
                <Text className="w-1/12  text-gray-950 font-extrabold">
                  Price
                </Text>
                <Text className="w-1/6 text-gray-950 font-extrabold">
                  Total
                </Text>
                {/* <Text className="w-1/6 text-gray-950 font-extrabold">Amount</Text> */}
                <Text className="w-1/8 text-gray-700 font-extrabold">
                  Action
                </Text>
              </View>

              {selectedItems.map((item, index) => (
                <View
                  key={index}
                  className="flex flex-row justify-between items-center bg-gray-100 border py-1 px-3">
                  <Text className="w-1/12 text-zinc-700 font-extrabold">
                    {index + 1}
                  </Text>
                  <Text className="w-1/12 text-zinc-700 font-semibold">
                    {item.tag}
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
                    <Text
                      className="bg-gray-700 w-1/8 text-white font-bold
                  px-2 py-1 rounded-md">
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {currentStep === 3 && (
            <View className="flex-1 justify items bg-gray-100">
              {/* <Text className="text text-xl p-2 bg-gray-200 text-gray-900 font-bold">
                Order Items Confirmation
              </Text> */}

              <View className="flex flex-row justify-between bg-gray-300 mt-1  py-2 px-3">
              <Text className="w-1/12  text-gray-950 font-light">#</Text>
              <Text className="w-1/12  text-gray-950 font-light">Tag</Text>
                <Text className="w-1/6 text-gray-950 font-light">
                  Item Name
                </Text>
                <Text className="w-1/6 text-gray-950 font-light">
                  Dress Type
                </Text>
                <Text className="w-1/12  text-gray-950 font-light">Size</Text>
                <Text className="w-1/12  text-gray-950 font-light">Qty</Text>
                <Text className="w-1/12  text-gray-950 font-light">Price</Text>
                <Text className="w-1/6 text-gray-950 font-light">Total</Text>
              </View>

              {selectedItems.map((item, index) => (
                <View
                  key={index}
                  className="flex flex-row justify-between items-center bg-gray-100 border py-2 px-3">
                  <Text className="w-1/12 text-zinc-700 font-extrabold">
                    {index + 1}
                  </Text>
                  <Text className="w-1/12 text-zinc-700 font-semibold">
                    {item.tag}
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
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
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
