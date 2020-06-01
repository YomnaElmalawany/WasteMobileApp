import React from 'react'
import {Image, StyleSheet, Text, ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native'
import {Container, Input, View, Content, Button, Spinner} from 'native-base'
import AsyncStorage from'@react-native-community/async-storage'

import jwt_decode from 'jwt-decode';

const ACCESS_TOKEN = 'access_token';

export default class LoginRedirected extends React.Component{
    
    state={
      username:"",
      password:"",
      AccessToken:null,
      buttonDisabled:false,
      buttonText:"Sign in"
    }

    storeToken(responseData){
        AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err)=> {
          if(err){
            console.log("an error");
            throw err;
          }
          console.log("success");
        }).catch((err)=> {
            console.log("error is: " + err);
        });
      }

    async getToken(){
      try {
        let accessToken = JSON.parse(await AsyncStorage.getItem(ACCESS_TOKEN))["token"];
        // console.log(accessToken);
        
        if(!accessToken) {
            // this.redirect('login');
            console.log("wrong login!");
            
        } else {
            this.setState({AccessToken: accessToken});
            console.log("Token acquired");
            // console.log(this.state.AccessToken);
            
        }
      } catch(error) {
          console.log("Something went wrong");
          // this.redirect('login');
      }
    }

    async onLoginPressed() {
      console.log("in");
      this.setState({buttonDisabled:true, buttonText:"Signing in..."})
        // this.setState({showProgress: true})
        try {
          let response = await fetch('http://10.0.2.2:9999/api/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "username": this.state.username,
              "password": this.state.password
            })
          });
          let res = await response.text();
          if (response.status >= 200 && response.status < 300) {
              //Handle success
              let accessToken = res;
              console.log(accessToken);
              //On success we will store the access_token in the AsyncStorage
              this.storeToken(accessToken);

              let decodedToken = jwt_decode(accessToken);
              // console.log(decodedToken.role);
              if(decodedToken.role == 'Client')
                this.props.navigation.navigate("ClientApp", {"Login": this});
              else if(decodedToken.role == 'Collector')
                this.props.navigation.navigate("CollectorApp");

          } else {
              //Handle error
              let error = res;
              throw error;
          }
        } catch(error) {
            // this.setState({error: error});
            console.log("error " + error);
            // this.setState({showProgress: false});
        }
      }

    async onGetdataPressed(){
      
      await this.getToken();
      console.log("Acquired Token is: ", this.state.AccessToken);
      
      let response = await fetch('http://10.0.2.2:9999/api/values', {
        method: 'GET',
        headers: {
          // 'Accept': 'application/json',
          'Authorization': "Bearer " + this.state.AccessToken,
          'Content-Type': 'application/json',
        }
      });

      let res = await response.text();
      console.log("res: ", res);
      
      if (response.status >= 200 && response.status < 300) {
        //Handle success
        let data = res;
        console.log(data);
      } else {
        //Handle error
        let error = res;
        throw error;
      }
                                  
    }

    render(){

      return(
        <Container>
          <ImageBackground source={require('./assets/Images/bg.jpg')} style={styles.backgroundImage}>
            <Content style={{paddingTop:180, width:200, marginBottom:0}}>
              <Input placeholder='Username' style={styles.text} /*ref={input => this.NameInput = input}*/
                onChangeText={(text) => this.setState({username: text})}/>
              <Input placeholder='Password' style={styles.text} /*ref={input => this.PasswordInput = input}*/
                onChangeText={(text) => this.setState({password: text})}/>
                {/* <Spinner/> */}
              <Button success style={{justifyContent:'center', marginTop:200}} disabled={this.state.buttonDisabled}
                onPress={() => this.onLoginPressed()}>
                <Text>{this.state.buttonText}</Text>
              </Button>

            </Content>
          </ImageBackground>

        </Container>
      )
    }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', //'contain', // or 'stretch',
    // width: '100%'
    // justifyContent:'center',
    paddingLeft:130
  },
  text:{
      fontSize: 16,
      color:'black', 
      fontWeight:'bold',
    //   borderColor: 'grey',
    //   borderWidth: 1,
      marginBottom: 10,
      backgroundColor:'white'
  }
});