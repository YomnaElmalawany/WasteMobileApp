import React from 'react'
import {Image, StyleSheet, Text, ImageBackground, AsyncStorage, TouchableHighlight} from 'react-native'
import {Container, Input, View, Content, Button} from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Login from "./Login"
import RegisterRole from "./RegisterRole";
import RegisterHome1 from "./RegisterHome1";
import RegisterHome2 from "./RegisterHome2";
import LoginRedirected from "./LoginRedirected"
// import ClientHome from "./ClientScreens/ClientHome";
// import CollectorHome from "./CollectorScreens/CollectorHome";
import ClientApp from "./ClientApp"
import CollectorApp from "./CollectorApp"
import DriverApp from "./DriverApp";

const ACCESS_TOKEN = 'access_token';

export default class App extends React.Component{
    
    render(){
        let Stack = createStackNavigator();
        return(
            // <Login/>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                    <Stack.Screen component={Login} name="Login"/>
                    <Stack.Screen component={LoginRedirected} name="LoginRedirected"/>
                    <Stack.Screen component={RegisterRole} name="RegisterRole"/>
                    <Stack.Screen component={RegisterHome1} name="RegisterHome1"/>
                    <Stack.Screen component={RegisterHome2} name="RegisterHome2"/>
                    <Stack.Screen component={ClientApp} name="ClientApp"/>
                    <Stack.Screen component={CollectorApp} name="CollectorApp"/>
                    <Stack.Screen component={DriverApp} name="DriverApp"/>
                </Stack.Navigator>
            </NavigationContainer>    
        )
    }
}
