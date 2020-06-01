/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './Screens/App';
import getApiInfo from './getApiInfo'
import TryAdaptiveCard from './Screens/TryAdaptiveCard'
// import getDriverSchedule from './Screens/DriverScreens/WasteAppAPI'
// import AppRoutes from './Screens/Components/Routes/AppRoutes'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
