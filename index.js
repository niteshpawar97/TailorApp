import { AppRegistry } from 'react-native';
import App from './App'; // Import your App component from App.js

import { name as appName } from './app.json';

// Register your app with a specified name (replace 'YourAppName' with your app's name)
AppRegistry.registerComponent(appName, () => App);

// The following line is optional but may be used to enable Fast Refresh during development
if (module.hot) {
  module.hot.accept();
}
