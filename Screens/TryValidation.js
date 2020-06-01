import React from 'react'
import {Image, StyleSheet, ImageBackground,TextInput, TouchableHighlight, TouchableOpacity } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button, Text, Picker, Header, Title, Subtitle, Left, Right, Body, View } from 'native-base';
import ValidationComponent from 'react-native-form-validator'

export default class ValidTest extends ValidationComponent{

    constructor(props) {
        super(props);
        this.state = {
        //   username:"",
          firstname:"",
          firstnameValidate:true,
          lastname:"",
          password:"",
          phone:"",
          phoneValidate:true,
          email:"",
          emailValidate:true
        };
    }

    _onPressButton(){
        // Call ValidationComponent validate method
        this.validate({
            firstname: {minlength:3, maxlength:7, required: true},
            lastname: {minlength:3, maxlength:7, required: true},
            email: {email: true},
            phone: {numbers: true},
            password: {date: 'YYYY-MM-DD'}
        });
    }

    validate(txt, type){
        let num=/^[0-9]+$/
        if(type == 'phone'){
            if(num.test(txt)){
                console.log("Phone True")                
                this.setState({phoneValidate:true, phone:txt})
            }
            else{
                console.log("Phone False")
                this.setState({phoneValidate:false})
            }
        }
        else if(type == 'email'){
            if(txt == ''){
                this.setState({emailValidate:false})
                console.log("Email False");
                
            }
            else{
                this.setState({emailValidate:true, email:txt})
                console.log("Email True");
            }
        }
        else if(type == 'firstname'){
            // console.log("firstname: ", txt);
            
            if(this.state.firstname==''){
                this.setState({firstnameValidate:false})
                console.log("Firstname False");
                
            }
            else{
                this.setState({firstnameValidate:true})
                console.log("Firstname True");
            }
        }
    }
    render(){
        return(
            <Container>
                <Content>
                <Form>
                    <Item stackedLabel>
                    <Label style={styles.label}>Firstname</Label>
                    <Input style={!this.state.firstnameValidate? styles.error:null}
                    onBlur={()=> this.validate('', 'firstname')}
                    onChangeText={(text)=> this.setState({firstname:text})}/>
                    {/* <Input onChangeText={(text)=> this.setState({firstname:text})} ref="firstname"/> */}
                    </Item>
                    <Item stackedLabel>
                    <Label style={styles.label}>Lastname</Label>
                    <Input onChangeText={(text)=> this.setState({lastname:text})}  ref="lastname"/>
                    </Item>
                    <Item stackedLabel>
                    <Label>Password</Label>
                    <Input secureTextEntry={true} onChangeText={(text)=> this.setState({password:text})}  ref="password"/>
                    </Item>
                    <Item stackedLabel>
                    <Label style={{marginBottom:5}}>Mobile Phone</Label>
                    {/* <Icon style={{marginLeft:14}} active name='mobile' /> */}
                    {/* <Input style={!this.state.phoneValidate? styles.error:null}
                    onChangeText={(text)=> this.validate(text, 'phone')}/> */}
                    <Input keyboardType="numeric" maxLength={11}
                    onChangeText={(text)=> this.setState({phone:text})}/>
                    </Item>
                    <Item stackedLabel last> 
                    <Label style={styles.label}>Email</Label>
                    <Input style={!this.state.emailValidate? styles.error:null}
                    onChangeText={(text)=> this.validate(text, 'email')}/>
                    </Item>
                </Form>
                <Button success style={{justifyContent:'center', marginTop:50}}
                onPress={this._onPressButton}>
                    <Text style={{fontSize:18}}>Next</Text>
                </Button>

                <Text>
                    {this.getErrorMessages()}
                </Text>

                </Content>
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
    paddingLeft:100
  },
  text:{
      fontSize: 16,
      color:'black', 
      fontWeight:'bold',
      // borderColor: 'grey',
      // borderWidth: 1,
      // backgroundColor:'transparent',
      // width:250,
      // borderRadius:50,
      marginBottom: 10,
      backgroundColor:'white',
  },
  error:{
      borderWidth:1,
      borderColor:'red'
  }
});