import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import ClientList from './ClientList';
import AddWeight from './AddWeight'

import { Icon ,Button} from 'native-base';
class TapRout extends React.Component{
    render()
    {   let AppStack=createStackNavigator();
        let HomeStack=createStackNavigator();
        let Tabs=createBottomTabNavigator();
        return(

            <NavigationContainer>
                <Tabs.Navigator>
                    <Tabs.Screen name="العملاء"options={{
                        tabBarIcon:()=> <Icon name='person' size={30} />
                       
                    
                    }}>

                        {()=>(
                             
                             <AppStack.Navigator initialRouteName="العملاء">
                            {/* // login implemented by yomna */}
                             {/* <AppStack.Screen component={Plogin} name="Login"/> */}
                          
                             <AppStack.Screen component={AddWeight} name="اضافة الوزن"/>
                             <AppStack.Screen component={ClientList} name="العملاء"/>
                             </AppStack.Navigator>                  
                        )}

                    </Tabs.Screen >


                    <Tabs.Screen  name="ملفك الشخصي"options={{
                        tabBarIcon:()=> <Icon name='home' size={30} />
                    }}>
                         {()=>(
                            // all of that change to only one page about him and his rates
                             <HomeStack.Navigator>
                             <HomeStack.Screen component={Home} name="الملف الشخصي"/>                          
                             </HomeStack.Navigator>                  
                        )}
                        </Tabs.Screen>
                </Tabs.Navigator>
                
            </NavigationContainer>



        )

    }
}
export default TapRout