import React from 'react'
import {Image, StyleSheet, Text, ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native'
import {Container, Input, View, Content, Button, Spinner} from 'native-base'
import AsyncStorage from'@react-native-community/async-storage'

import jwt_decode from 'jwt-decode';

const ACCESS_TOKEN = 'access_token';

export default class Login extends React.Component{
    
    state={
      phone:"",
      password:"",
      AccessToken:null,
      buttonDisabled:false,
      buttonText:"Sign in",
      buttonTextStyle:"normal",
      governorates:[],
      isValid:1,
      // userId:0,
      displaySpinner:0
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
      this.setState({buttonDisabled:true, buttonText:"Signing in...", buttonTextStyle:"italic", displaySpinner:1})
        // this.setState({showProgress: true})
        try {
          let response = await fetch('http://10.0.2.2:7777/api/auth/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "Mobile": this.state.phone,
              "Password": this.state.password
            })
          });
          let res = await response.text();
          if (response.status >= 200 && response.status < 300) {

            this.setState({isValid:1})
            //Handle success
              let accessToken = res;
              console.log(accessToken);
              //On success we will store the access_token in the AsyncStorage
              this.storeToken(accessToken);

              let decodedToken = jwt_decode(accessToken);
              console.log("Role: ",decodedToken.role);
              if(decodedToken.role == 'apartment')
                this.props.navigation.navigate("ClientApp", {"Login": this});
              else if(decodedToken.role == 'collector')
                this.props.navigation.navigate("CollectorApp", {"Login": this});
              else if(decodedToken.role == 'driver')
                this.props.navigation.navigate("DriverApp", {"Login": this});
              // this.setState({userId:decodedToken.UserId})

        //----------- save user ID in async storage to be available on any screen --------
              AsyncStorage.setItem("UserId", decodedToken.UserId, (err)=> {
                if(err){
                  console.log("error in storing userId");
                  throw err;
                }
                console.log("stored userId successfully");
              }).catch((err)=> {
                  console.log("error is: " + err);
              });

          } else {

            this.setState({buttonDisabled:false, buttonText:"Sign in", 
            buttonTextStyle:"normal", isValid:0})
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

    // async onGetdataPressed(){
      
    //   await this.getToken();
    //   console.log("Acquired Token is: ", this.state.AccessToken);
      
    //   let response = await fetch('http://10.0.2.2:9999/api/values', {
    //     method: 'GET',
    //     headers: {
    //       // 'Accept': 'application/json',
    //       'Authorization': "Bearer " + this.state.AccessToken,
    //       'Content-Type': 'application/json',
    //     }
    //   });

    //   let res = await response.text();
    //   console.log("res: ", res);
      
    //   if (response.status >= 200 && response.status < 300) {
    //     //Handle success
    //     let data = res;
    //     console.log(data);
    //   } else {
    //     //Handle error
    //     let error = res;
    //     throw error;
    //   }
                                  
    // }

    async onSignupPressed(){
      
      let response = await fetch('http://10.0.2.2:7777/region', {
        method: 'GET',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      let res = await response.text();
      console.log("res from login screen: ", res);
      this.setState({governorates:res});
      
      this.props.navigation.navigate("RegisterRole",{"regions":this.state.governorates})

      /*if (response.status >= 200 && response.status < 300) {
        //Handle success
        let data = res;
        console.log(data);
      } else {
        //Handle error
        let error = res;
        throw error;
      }*/
    }
    // constructor(props){
    //   super(props);
    //   this.NameInput = React.createRef();
    //   this.PasswordInput = React.createRef();
    // }

    // componentWillMount(){
    //   // this.NameInput.current._root.clear();
    //   // this.PasswordInput.current._root.clear();

    //   // this.NameInput.setNativeProps({ text: ' ' });
    //   // this.PasswordInput.setNativeProps({ text: ' ' });

    //   // this.NameInput.current.value = " ";
    //   // this.PasswordInput.current.value = " ";
    // }
    renderInvalidText(){

      if(this.state.isValid == 0)
        return(
          <Text style={{color:"red", marginBottom:10}}>* Invalid mobile number or password</Text>
        )
      else
        return(<></>)
    }

    renderSpinner(){
      if(this.state.displaySpinner == 1)
        return(
          <Spinner color="blue"/>
        )
      else
        return(<></>)
    }
    render(){

      return(
        <Container>
          <ImageBackground source={require('./assets/Images/bg.jpg')} style={styles.backgroundImage}>
            <Content style={{paddingTop:170, width:270, marginBottom:0}}>
              {this.renderInvalidText()}
              <Input keyboardType="numeric" maxLength={11} placeholder='Mobile number' style={styles.text} /*ref={input => this.NameInput = input}*/
                value={this.state.phone}
                onChangeText={(text) => this.setState({phone: text, isValid:1})}/>
              <Input secureTextEntry={true} placeholder='Password' style={styles.text} /*ref={input => this.PasswordInput = input}*/
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text, isValid:1})}/>
                
                {this.renderSpinner()}
              
              <Button success style={{justifyContent:'center', marginTop:150, borderRadius:25}} disabled={this.state.buttonDisabled}
                onPress={() => this.onLoginPressed()}>
                <Text style={{fontSize:18, fontStyle:this.state.buttonTextStyle}}>{this.state.buttonText}</Text>
              </Button>
              <TouchableHighlight underlayColor={'transparent'} style={{marginTop: 10, backgroundColor:'transparent', alignItems:'center'}}
                // onPress={() => this.props.navigation.navigate("RegisterRole", {"Login": this})}>
                onPress={() => this.onSignupPressed()}>
                <Text style={{textDecorationLine:'underline'}}>No Account? SignUp Now</Text>
              </TouchableHighlight>

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
    // paddingLeft:130
    paddingLeft:80
  },
  text:{
      fontSize: 16,
      color:'black', 
      fontWeight:'bold',
      // borderColor: 'grey',
      // borderWidth: 1,
      // backgroundColor:'transparent',
      width:270,
      borderRadius:25,
      marginBottom: 10,
      backgroundColor:'white',
      
  }
});