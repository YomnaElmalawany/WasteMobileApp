import React from 'react'
import { Container, Header, Content, Text, Body, Left, Right, Title, Subtitle, Button, Thumbnail } from 'native-base';
import { TouchableHighlight } from 'react-native';
import AsyncStorage from'@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'

const ACCESS_TOKEN = 'access_token';

export default class ClientHome extends React.Component{

    async deleteToken(){
        try {
          await AsyncStorage.removeItem(ACCESS_TOKEN)
          let token = await AsyncStorage.getItem(ACCESS_TOKEN)
          if(token == null)
            console.log("token removed successfully");
            
        } catch(error) {
            console.log("Something went wrong, Error Details: ", error);
        }
    }

    onLogoutPressed(){
        this.deleteToken();
        
        this.props.navigation.navigate('Login');
    }

    render(){
        // console.log("route data: ",this.props.route.params.Login);
        return(
            <Container>
                <Header>
                <Left>
                    {/* <Button transparent>
                    <Icon name='md-basket'/>
                    </Button> */}
                    <Thumbnail small source={require('../assets/Images/recycle.png')}/>
                    {/* <Title>WasteApp</Title> */}
                </Left>
                <Body>
                    <Title>WasteApp</Title>
                    {/* <Subtitle>For Home</Subtitle> */}
                </Body>
                <Right>
                    <TouchableHighlight underlayColor={'transparent'} onPress={()=> this.onLogoutPressed()}>
                        <Text style={{color:'white'}}>Logout</Text>
                    </TouchableHighlight>
                </Right>
                </Header>

                <Content contentContainerStyle={{alignItems:'center', paddingTop:20}}>
                    <Text style={{fontSize:30, fontStyle:'italic'}}>Client-Home</Text>
                    {/* <TouchableHighlight underlayColor={'transparent'} onPress={()=> this.onLogoutPressed()}>
                        <Text>Logout</Text>
                    </TouchableHighlight> */}
                </Content>
            </Container>
            // <></>
        )
    }
}