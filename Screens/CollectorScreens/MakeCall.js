import React, { Component } from "react";
import {Linking,Platform,TouchableOpacity,Text} from "react-native";
export default class MakeCall extends Component {

 dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
 };

 render(){
  console.log("Client Phone Number: ",this.props.route.params.PhoneNumber);
  
  return(
                <TouchableOpacity
                   style={{
                   height: 90,
                   width: 100,
                   backgroundColor: "#329df4",
                   alignItems: "center",
                   justifyContent: "center",
                   borderRadius: 5
                   }}
                 onPress={()=>{this.dialCall(this.props.route.params.PhoneNumber)}}
                >
                <Text>Phone</Text>
                </TouchableOpacity>
              );
  }

}