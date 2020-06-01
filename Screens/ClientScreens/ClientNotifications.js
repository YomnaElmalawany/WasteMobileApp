import React from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Text } from 'native-base';

export default class ClientNotifications extends React.Component{
    render(){
        return(
            <Container>
                <Content contentContainerStyle={{alignItems:'center', paddingTop:20}}>
                <Text style={{fontSize:30, fontStyle:'italic'}}>Client-Notifications</Text>
                </Content>
            </Container>
            // <></>
        )
    }
}