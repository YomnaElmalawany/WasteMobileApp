import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './CollectorScreens/Home';
import ClientList from './CollectorScreens/ClientList';
import AddWeight from './CollectorScreens/AddWeight'
import MakeCall from './CollectorScreens/MakeCall'

import { Icon ,Button} from 'native-base';
class CollectorApp extends React.Component{
    render()
    {   let AppStack=createStackNavigator();
        let HomeStack=createStackNavigator();
        let Tabs=createBottomTabNavigator();

        this.props.route.params.Login.setState({buttonDisabled:false, buttonText:"Sign in", buttonTextStyle:"normal", isValid:1, displaySpinner:0});
        
        return(

                <Tabs.Navigator initialRouteName="الصفحة الرئيسة">

                    <Tabs.Screen  name="ملفك الشخصي"options={{
                        tabBarIcon:()=> <Icon name='person' size={30} />
                    }}>
                         {()=>(
                            // all of that change to only one page about him and his rates
                             <HomeStack.Navigator>
                             <HomeStack.Screen component={Home} name="الملف الشخصي"/>                          
                             </HomeStack.Navigator>                  
                        )}
                        </Tabs.Screen>

                    <Tabs.Screen name="الصفحة الرئيسة"options={{
                        tabBarIcon:()=> <Icon name='home' size={30} />
                    }}>

                        {()=>(
                             
                             <AppStack.Navigator initialRouteName="العملاء">
                            {/* // login implemented by yomna */}
                             {/* <AppStack.Screen component={Plogin} name="Login"/> */}
                          
                             <AppStack.Screen component={AddWeight} name="اضافة الوزن"/>
                             <AppStack.Screen component={ClientList} name="العملاء"/>
                             <AppStack.Screen component={MakeCall} name="اتصال"/>
                             </AppStack.Navigator>                  
                        )}

                    </Tabs.Screen >

                </Tabs.Navigator>

        )

    }
}
export default CollectorApp