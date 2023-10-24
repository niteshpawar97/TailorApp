This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

```markdown
# API Request Helper
`./src/helpers/apiRequestWithHeaders.js`
This module provides a set of functions for making API requests with headers. It supports common HTTP methods like GET, POST, PUT, and DELETE.

## Installation

To use these functions in your React Native application, follow these steps:

1. Install the required dependencies.

   ```bash
   yarn add @react-native-async-storage/async-storage
   ```

2. Import the functions into your application.

   ```javascript
   import { sendPostRequest, sendGetRequest, sendPutRequest, sendDeleteRequest } from '../helpers/apiRequestWithHeaders';
   ```

3. Use the functions to make API requests.

## Usage

### Sending a POST Request

```javascript
const url = 'https://example.com/api/resource';
const data = { key: 'value' };

const response = await sendPostRequest(url, data);
console.log('POST Response:', response);
```

### Sending a GET Request

```javascript
const url = 'https://example.com/api/resource';

const response = await sendGetRequest(url);
console.log('GET Response:', response);
```

### Sending a PUT Request

```javascript
const url = 'https://example.com/api/resource';
const data = { key: 'new-value' };

const response = await sendPutRequest(url, data);
console.log('PUT Response:', response);
```

### Sending a DELETE Request

```javascript
const url = 'https://example.com/api/resource';

const response = await sendDeleteRequest(url);
console.log('DELETE Response:', response);
```







`structured way following a Model-View-Controller (MVC) pattern in a React Native application`

project/
|-- src/
|   |-- components/
|   |   |-- Splash.js
|   |   |-- Login.js
|   |   |-- Dashboard.js
|   |   |-- Status.js
|   |   |-- Stock.js
|   |   |-- Customer.js
|   |   |-- NewOrder.js
|   |   |-- History.js
|   |-- navigation/
|   |   |-- AppNavigator.js
|   |   |-- DashboardNavigator.js
|   |-- controllers/
|   |   |-- AuthController.js
|   |-- models/
|   |   |-- UserModel.js
|   |-- views/
|   |   |-- SplashScreen.js
|   |   |-- LoginScreen.js
|   |   |-- DashboardScreen.js
|   |   |-- StatusScreen.js
|   |   |-- StockScreen.js
|   |   |-- CustomerScreen.js
|   |   |-- NewOrderScreen.js
|   |   |-- HistoryScreen.js
|   |-- App.js
|-- package.json
|-- ...






If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
