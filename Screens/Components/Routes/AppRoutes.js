import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import{createStackNavigator} from '@react-navigation/stack'
import getDriverSchedule from '../../DriverScreens/WasteAppAPI'
import map from '../../DriverScreens/map' 

export default class AppRoutes extends React.Component{
    
    render(){
        let stack=createStackNavigator();
        return(
 <NavigationContainer>
    <stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <stack.Screen component={getDriverSchedule} name="Home"/>
        <stack.Screen component={map} name="map"/>
    </stack.Navigator>
 </NavigationContainer>
        )
    }
} 