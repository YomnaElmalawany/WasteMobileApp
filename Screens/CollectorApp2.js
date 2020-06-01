import React from 'react'
import {Image, StyleSheet, Text, ImageBackground, AsyncStorage, TouchableHighlight} from 'react-native'
// import {Icon} from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'

import CollectorHome from "./CollectorScreens/CollectorHome";
import ColletorProfile from "./CollectorScreens/ColletorProfile";


export default class CollectorApp extends React.Component{
    
    render(){

        let HomeStack = createStackNavigator();
        let RequestStack = createStackNavigator();
        let PromotionStack = createStackNavigator();
        let ProfileStack = createStackNavigator();
        let Tabs = createBottomTabNavigator();
        // let Stack = createStackNavigator();
        
        return(
            // <NavigationContainer independent={true}>
            <Tabs.Navigator>
              <Tabs.Screen name="Home" options={{
                  tabBarIcon: (tetcolor) => <Icon name="ios-home" size={30} />
                }}>
                {()=>(
                    <HomeStack.Navigator initialRouteName="Colletor-Home" screenOptions={{headerShown: false}}>
                        <HomeStack.Screen component={CollectorHome} name="Colletor-Home"/>
                    </HomeStack.Navigator>
                )}
              </Tabs.Screen>

              <Tabs.Screen name="Profile" options={{
                  tabBarIcon: (tetcolor) => <Icon name="ios-person" size={30} />
                }}>
                {()=>(
                    <ProfileStack.Navigator initialRouteName="Colletor-Profile" screenOptions={{headerShown: false}}>
                        <ProfileStack.Screen component={ColletorProfile} name="Colletor-Profile"/>
                        {/* <HomeStack.Screen component={EditCollectorProfile} name="EditCollectorProfile"/> */}
                    </ProfileStack.Navigator>
                )}
              </Tabs.Screen>
            </Tabs.Navigator>
          // </NavigationContainer>   
        )
    }
}
