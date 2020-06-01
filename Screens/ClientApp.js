import React from 'react'
import {Image, StyleSheet, Text, ImageBackground, AsyncStorage, TouchableHighlight} from 'react-native'
// import {Icon} from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/Ionicons'

import ClientHome from "./ClientScreens/ClientHome";
import ClientProfile from "./ClientScreens/ClientProfile";
import ClientRequest from './ClientScreens/ClientRequest'
import ClientPromotion from './ClientScreens/ClientPromotion'
import ClientNotifications from './ClientScreens/ClientNotifications'


export default class ClientApp extends React.Component{
    
    render(){

        let LoginStack = createStackNavigator();
        let HomeStack = createStackNavigator();
        let RequestStack = createStackNavigator();
        let PromotionStack = createStackNavigator();
        let ProfileStack = createStackNavigator();
        let Tabs = createBottomTabNavigator();
        // let Stack = createStackNavigator();
        this.props.route.params.Login.setState({buttonDisabled:false, buttonText:"Sign in", buttonTextStyle:"normal", isValid:1});
        console.log("route data: ",this.props.route.params);
        
        return(
            // <NavigationContainer independent={true}>
            <Tabs.Navigator>
              <Tabs.Screen name="Home" options={{
                  tabBarIcon: (tetcolor) => <Icon name="ios-home" size={30} />
                }}>
                {()=>(
                    <HomeStack.Navigator initialRouteName="ClientHome" screenOptions={{headerShown: false}}>
                    <HomeStack.Screen component={ClientHome} name="ClientHome"/>
                    </HomeStack.Navigator>
                )}
              </Tabs.Screen>

              <Tabs.Screen name="Requests" options={{
                  tabBarIcon: (tetcolor) => <Icon name="ios-add" size={30} />
                }}>
                {()=>(
                    <RequestStack.Navigator initialRouteName="ClientRequest" screenOptions={{headerShown: false}}>
                        <ProfileStack.Screen component={ClientRequest} name="ClientRequest"/>
                    </RequestStack.Navigator>
                )}
              </Tabs.Screen>

              <Tabs.Screen name="Promotions" options={{
                  tabBarIcon: (tetcolor) => <Icon name="ios-gift" size={30} />
                }}>
                {()=>(
                    <PromotionStack.Navigator initialRouteName="ClientPromotion" screenOptions={{headerShown: false}}>
                        <ProfileStack.Screen component={ClientPromotion} name="ClientPromotion"/>
                    </PromotionStack.Navigator>
                )}
              </Tabs.Screen>

              <Tabs.Screen name="Notifications" options={{
                  tabBarIcon: (tetcolor) => <Icon name="ios-notifications" size={30} />
                }}>
                {()=>(
                    <ProfileStack.Navigator initialRouteName="ClientNotifications" screenOptions={{headerShown: false}}>
                    <ProfileStack.Screen component={ClientNotifications} name="ClientNotifications"/>
                    </ProfileStack.Navigator>
                )}
              </Tabs.Screen>

              <Tabs.Screen name="Profile" options={{
                  tabBarIcon: (tetcolor) => <Icon name="ios-person" size={30} />
                }}>
                {()=>(
                    <ProfileStack.Navigator initialRouteName="ClientProfile" screenOptions={{headerShown: false}}>
                    <ProfileStack.Screen component={ClientProfile} name="ClientProfile"/>
                    {/* <HomeStack.Screen component={EditClientProfile} name="EditClientProfile"/> */}
                    </ProfileStack.Navigator>
                )}
              </Tabs.Screen>
              
              {/* <LoginStack.Navigator>
                  <LoginStack.Screen component={Login} name="Login"/>
              </LoginStack.Navigator> */}
            </Tabs.Navigator>
        //   </NavigationContainer>   
        )
    }
}
