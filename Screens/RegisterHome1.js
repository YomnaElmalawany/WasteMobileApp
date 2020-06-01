import React from 'react'
import { Container, Content, Form, Item, Input, Label, Button, Text, Picker, Header, Title, Subtitle, Left, Right, Body } from 'native-base';
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class RegisterHome1 extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          username:"",
          firstname:"",
          firstnameValidate:true,
          lastname:"",
          lastnameValidate:true,
          password:"",
          passwordValidate:true,
          phone:"",
          phoneValidate:true,
          email:"",
        //   emailValidate:""  // no need to validate if it's empty or not bec. it is not mandatory
          error:""
        };
      }

      validate(txt, type){
        let num=/^[0-9]+$/
        if(type == 'phone'){
            // if(num.test(txt)){
            if(this.state.phone == "" || !num.test(this.state.phone)){
                console.log("Phone False")                
                this.setState({phoneValidate:false})
            }
            else{
                console.log("Phone True")
                this.setState({phoneValidate:true})
            }
        }else if(type == 'password'){
            // if(num.test(txt)){
            if(this.state.password == ""){
                console.log("Password False")                
                this.setState({passwordValidate:false})
            }
            else{
                console.log("Password True")
                this.setState({passwordValidate:true})
            }
        }else if(type == 'firstname'){
            if(this.state.firstname==''){
                this.setState({firstnameValidate:false})
                console.log("Firstname False");
                
            }else{
                this.setState({firstnameValidate:true})
                console.log("Firstname True");
            }
        }else if(type == 'lastname'){
            if(this.state.lastname==''){
                this.setState({lastnameValidate:false})
                console.log("Lastname False");
                
            }else{
                this.setState({lastnameValidate:true})
                console.log("Lastname True");
            }
        }
    }

    onNextPressed(){
        if(this.state.firstname!="" && this.state.lastname!="" && 
            this.state.password!="" && this.state.phone!="")
            this.props.navigation.navigate("RegisterHome2",{"personaldata":this.state, "regions":this.props.route.params.regions})
        else
            this.setState({error:"Some fields may not be filled right"})
    }

    render(){
        console.log("Home1: ",this.props.route.params.regions);
        
        return(
            <Container>
                <Header style={{backgroundColor:'green'}}>
                <Left>
                    <Button transparent onPress={()=>this.props.navigation.navigate("RegisterRole")}>
                    <Icon name='md-arrow-round-back'/>
                    </Button>
                </Left>
                <Body>
                    <Title>Personal data</Title>
                    {/* <Subtitle>For Home</Subtitle> */}
                </Body>
                <Right />
                </Header>
                <Content>
                <Form style={{marginBottom:30}}>
                    <Item stackedLabel>
                    <Label style={styles.label}>Firstname <Text style={{color:'red'}}>*</Text></Label>
                    <Input style={!this.state.firstnameValidate? styles.error:null}
                    onBlur={()=> this.validate('','firstname')}
                    onChangeText={(text)=> this.setState({firstname:text})}/>
                    </Item>
                    <Item stackedLabel>
                    <Label style={styles.label}>Lastname <Text style={{color:'red'}}>*</Text></Label>
                    <Input style={!this.state.lastnameValidate? styles.error:null}
                    onBlur={()=> this.validate('','lastname')}
                    onChangeText={(text)=> this.setState({lastname:text})}/>
                    </Item>
                    <Item stackedLabel>
                    <Label style={styles.label}>Password <Text style={{color:'red'}}>*</Text></Label>
                    <Input secureTextEntry={true} style={!this.state.passwordValidate? styles.error:null}
                    onBlur={()=> this.validate('','password')}
                    onChangeText={(text)=> this.setState({password:text})}/>
                    </Item>
                    {/* <Item stackedLabel>
                    <Label style={styles.label}>Confirm Password</Label>
                    <Input />
                    </Item> */}
                    <Item stackedLabel>
                    <Label style={styles.label}>Mobile Phone <Text style={{color:'red'}}>*</Text></Label>
                    {/* <Icon style={{marginLeft:14}} active name='mobile' /> */}
                    <Input keyboardType="numeric" maxLength={11} style={!this.state.phoneValidate? styles.error:null}
                    onBlur={()=> this.validate('','phone')}
                    onChangeText={(text)=> this.setState({phone:text})}/>
                    {/*onChangeText={(text)=> {this.setState({phone:text}); this.validate('','phone')}}/> */}
                    </Item>
                    <Item stackedLabel last> 
                    <Label style={styles.label}>Email</Label>
                    <Input onChangeText={(text)=> this.setState({email:text})}/>
                    </Item>
                </Form>
                <Text style={{color:'red', alignSelf:'center', fontStyle:'italic'}}>{this.state.error}</Text>
                <Button success style={{justifyContent:'center', marginTop:10}}
                    onPress={() => this.onNextPressed()}>
                    <Text style={{fontSize:18}}>Next</Text>
                </Button>
                </Content>
            </Container>
        )
    }
}

let styles = StyleSheet.create({
    label:{
        color: 'black',
        marginBottom:5
    },
    item:{
        paddingTop:30
    },
    error:{
        borderWidth:1,
        borderColor:'red'
    }
})