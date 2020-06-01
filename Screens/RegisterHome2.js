import React from 'react'
import { Container, Content, Form, Item, Input, Label, Button, Text, Picker, Header, Title, Subtitle, Left, Right, Body } from 'native-base';
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

let regions=[];
// let regions=[];
let regionsItems;
let addressesItems=[];

export default class RegisterHome2 extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          region:"",
        //   regionid:"",
          regions:[],
          address:"",
          buildingnumber:"",
          buildingnumberValidate:true,
          apartmentnumber:"",
          apartmentnumberValidate:true,
          addressid:0,
          addresses:[],
          error:""
        };
      }
      
      validate(type){
        let num=/^[0-9]+$/;
        if(type == 'BuildingNo'){
            if(num.test(this.state.buildingnumber)){
                console.log("BuildingNo True")                
                this.setState({buildingnumberValidate:true})
            }
            else{
                console.log("BuildingNo False")
                this.setState({buildingnumberValidate:false})
            }
        }
        if(type == 'ApartmentNo'){
            if(num.test(this.state.apartmentnumber)){
                console.log("ApartmentNo True")                
                this.setState({apartmentnumberValidate:true})
            }
            else{
                console.log("ApartmentNo False")
                this.setState({apartmentnumberValidate:false})
            }
        }
    }
    async onRegionChange(value, index) {
        this.setState({
          region: value
        });
        // console.log("addr: ",this.state.regions[index].id);
        console.log("addr: ",regions[index].id);
        
        let response = await fetch(`http://10.0.2.2:7777/api/address/addrsbyreg?regionId=${regions[index].id}`, {
            method: 'GET',
            headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
        });
        // console.log("addr response: ",response);
        
        let addresses = JSON.parse(await response.text());
        console.log("addr response: ",addresses);

        addressesItems = addresses.map( (s) => {
            return <Picker.Item key={s.id} value={s.streetName} label={s.streetName} />
        });

        this.setState({addresses}); // = addresses:addresses
    }
    onAddressChange(value,index) {
        this.setState({
        //   selected2: value
          address: value,
          addressid: this.state.addresses[index].id
        });
        
    }

    async onRegisterPressed() {
        console.log("in register");
        if(this.state.buildingnumber!="" && this.state.apartmentnumber!=""){
                try {
                    console.log("addressid: ", this.state.addressid);
                    let response = await fetch('http://10.0.2.2:7777/api/default/registration', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        "FirstName": this.props.route.params.personaldata.firstname,
                        "LastName": this.props.route.params.personaldata.lastname,
                        "ClientName": this.props.route.params.personaldata.firstname +" "+ this.props.route.params.personaldata.lastname,
                        "Password": this.props.route.params.personaldata.password,
                        "Mobile": this.props.route.params.personaldata.phone,
                        "Email": this.props.route.params.personaldata.email,
                        "BuildingNumber": this.state.buildingnumber,
                        "ApartmentNumber": this.state.apartmentnumber,
                        "AddressId": this.state.addressid,
                        // "CategoryId":1 // set in the api
                      })
                    });
                    let res = await response.text();
                    if (response.status >= 200 && response.status < 300) {
                        
                        console.log("registered successfully");
                        this.props.navigation.navigate("LoginRedirected");
                        
                    } else {
                        //Handle error
                        let error = res;
                        // throw error;
                        console.log("error: "+ error);
                        
                    }
                } catch(error) {
                    // this.setState({error: error});
                    console.log("error " + error);
                    // this.setState({showProgress: false});
                }
            }
        else
            this.setState({error:"Some fields may not be filled right"})
        
    }

    render(){
        console.log(">>",this.props.route.params.regions);
        
        regions = JSON.parse(this.props.route.params.regions);
        console.log("regions: ", regions);
        // this.setState({regions}); // regions:regions

        regionsItems = regions.map( (s) => {
            return <Picker.Item key={s.id} value={s.name} label={s.name} />
        });

        return(
            <Container>
                <Header style={{backgroundColor:'green'}}>
                <Left>
                    <Button transparent onPress={()=>this.props.navigation.navigate("RegisterHome1")}>
                    <Icon name='md-arrow-round-back'/>
                    </Button>
                </Left>
                <Body>
                    <Title>Register For Home</Title>
                    {/* <Subtitle>For Home</Subtitle> */}
                </Body>
                <Right />
                </Header>
                <Content>
                <Form style={{marginBottom:30}}>
                <Item picker style={{paddingBottom:15, paddingTop:4}}>
                    <Label style={{marginLeft:14}}>Region <Text style={{color:'red'}}>*</Text></Label>
                    {/* <Icon style={{marginLeft:14}} active name='home' /> */}
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your region"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        // selectedValue={this.state.selected2}
                        selectedValue={this.state.region}
                        onValueChange={(value, index) => this.onRegionChange(value, index)}
                    >
                        {regionsItems}
                    </Picker>
                    </Item>

                    <Item picker style={{paddingBottom:15, paddingTop:4}}>
                    <Label style={{marginLeft:14}}>Address <Text style={{color:'red'}}>*</Text></Label>
                    {/* <Icon style={{marginLeft:14}} active name='home' /> */}
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your address"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        // selectedValue={this.state.selected2}
                        selectedValue={this.state.address}
                        // onValueChange={this.onAddressChange.bind(this)}
                        onValueChange={(value, index)=> this.onAddressChange(value,index)}
                    >
                        {addressesItems}
                    </Picker>
                    </Item>

                    <Item stackedLabel> 
                    <Label style={styles.label}>Building Number <Text style={{color:'red'}}>*</Text></Label>
                    <Input style={!this.state.buildingnumberValidate? styles.error:null}
                    onBlur={()=> this.validate('BuildingNo')}
                    onChangeText={(text)=> this.setState({buildingnumber:text})}/>
                    </Item>
                    <Item stackedLabel> 
                    <Label style={styles.label}>Appartment Number <Text style={{color:'red'}}>*</Text></Label>
                    <Input style={!this.state.apartmentnumberValidate? styles.error:null}
                    onBlur={()=> this.validate('ApartmentNo')}
                    onChangeText={(text)=> this.setState({apartmentnumber:text})}/>
                    </Item>

                </Form>
                <Text style={{color:'red', alignSelf:'center', fontStyle:'italic'}}>{this.state.error}</Text>
                <Button success style={{justifyContent:'center', marginTop:10}}
                    // onPress={() => this.props.navigation.navigate("ClientApp", {"Login": this.props.route.params.Login})}>
        onPress={() => this.onRegisterPressed()}>
                    <Text style={{fontSize:18}}>Register</Text>
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