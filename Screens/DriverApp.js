import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import{createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import getDriverSchedule from './DriverScreens/WasteAppAPI'
import map from './DriverScreens/map' 
import Login from "../Screens/Login";

export default class DriverApp extends React.Component{
    
    render(){
        let stack=createStackNavigator();
        let Tabs = createBottomTabNavigator();
 
        this.props.route.params.Login.setState({buttonDisabled:false, buttonText:"Sign in", buttonTextStyle:"normal", 
        isValid:1, phone:" ", password:" ", displaySpinner:0});
        console.log("route data: ",this.props.route.params);
        
        return(
    <stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <stack.Screen component={getDriverSchedule} name="Home"/>
        <stack.Screen component={map} name="map"/>
        {/* <stack.Screen component={Login} name="Login"/> */}
    </stack.Navigator>
        )
    }
} 