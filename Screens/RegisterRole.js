import React from 'react'
import {StyleSheet, ImageBackground} from 'react-native'
import { Container, Content, Button, Text } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import ClientrApp from "./ClientApp";
import CollectorApp from "./CollectorApp";


export default class RegisterRole extends React.Component{
    
    render(){

        let Stack = createStackNavigator();
        
        return(
             <Container>
                <ImageBackground source={require('./assets/Images/bg.jpg')} style={styles.backgroundImage}>
                    <Content>
                        <Button success style={{justifyContent:'center',marginTop:200}}
                            // onPress={() => this.props.navigation.navigate("RegisterHome", {"Login": this.props.route.params.Login})}>
                            onPress={() => this.props.navigation.navigate("RegisterHome1",{"regions":this.props.route.params.regions})}>
                            <Text style={{color: 'black', fontSize:16, fontWeight:'bold'}}>Register for Home</Text>
                        </Button>
                        <Button success style={{justifyContent:'center',marginTop:50}}>
                            <Text style={{color: 'black', fontSize:16, fontWeight:'bold'}}>Register for Orginzation</Text>
                        </Button>
                    </Content>
                </ImageBackground>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    btn:{
        justifyContent:'center'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', //'contain', // or 'stretch',
        // width: '100%'
        // justifyContent:'center',
        paddingLeft:50,
        paddingRight:50
      }
})