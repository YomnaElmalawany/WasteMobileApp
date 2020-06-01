import React from 'react'
import { Content, Container, Text, Header, Left, Right, Spinner,Card, CardItem } from 'native-base'
import { TouchableHighlight ,StyleSheet, Linking, Platform} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons'

import AsyncStorage from'@react-native-community/async-storage'

export default class ClientList extends React.Component {
   
    state = {
        Data: null,
        textLine:'none'
    }
    componentDidMount() {
        this.getDataFromJson();
        
    }
    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else {phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
     };
    async getDataFromJson() {
             let CollectorID=JSON.parse(await AsyncStorage.getItem("UserId"));
             console.log("ID: ", CollectorID);
       fetch(`http://10.0.2.2:7777/api/Collector/ClientList?CollectorID=${CollectorID}`
  
        ).then((res) => res.json())
         .then((res) => {
            console.log(res);
            this.setState({
                Data: res
            })
        })
         .catch((error) => console.log("Error", error))
    }

    render() {

        if (this.state.Data == null) {
            return (
                <Container>
                    <Content>
                        {/* <Text>Loading.....</Text> */}
                        <Spinner/>
                    </Content>
                </Container>
            )
        }
        else {
            return (

                <ScrollView style={{backgroundColor: 'white'}}>

                
                {/* <Card> */}
                    {
                        this.state.Data.map((item) => {
                            console.log("::: ", item.nonOrganicWeight);
                            
                            if(item.nonOrganicWeight == null)
                               this.state.textLine = 'none'
                            else
                               this.state.textLine = 'line-through'
                            return(
                                <Card style={styles.card}>
                                    <CardItem style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#d1eaa3'}} key={1}>
                                    <Left>
                                        <TouchableHighlight underlayColor={'transparent'} onPress={()=>this.props.navigation.navigate("اضافة الوزن",{ListScreen:item.clientID,schedual:item.scheduleID,"ClientScreen":this})}>
                                        <Icon name="ios-paper" size={30} color='#2E8B57'/>
                                        </TouchableHighlight>
                                    </Left>
                                    
                                    <Right>
                                    <Text style={{fontWeight:'bold', fontSize:18, textDecorationLine:this.state.textLine}}>{" الاسم: "}{item.clientFirstName}{" "}{item.clientLastName}</Text>
                                    </Right>
                                    </CardItem>
                                    <CardItem style={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: '#d1eaa3'}} key={2}>
                                        <Left>
                                        <TouchableHighlight underlayColor={'transparent'} onPress={()=> this.dialCall(item.clientPhoneNumber)}>
                                        <Icon name="ios-call" size={30} color='#00FA9A'/>
                                        </TouchableHighlight>
                                        </Left>                                    
                                       <Right>
                                        <Text style={{fontSize:16}}>{" شارع "}{item.clientStreetName}</Text>
                                        <Text style={{textDecorationLine:'underline'}}>{" عمارة "}{item.clientBuildingNumber} - {" شقة "}{item.clientApartmentNumber}</Text>
                                       </Right>
                                    </CardItem>
                                </Card>
                            )
                        })
                    }
                {/* </Card> */}
                </ScrollView>
    
            )
        }
    }
}

const styles = StyleSheet.create({
    button1: {
        width:100,
        height: 35,
        // backgroundColor: '#4f83cc',
        borderRadius: 35,
        // marginVertical: 10,
        // paddingVertical: 5
        justifyContent:'center',
        backgroundColor:'lightgreen'
    },
    button2: {
        width:100,
        height: 35,
        // backgroundColor: '#4f83cc',
        borderRadius: 30,
        // marginVertical: 10,
        // paddingVertical: 5
        justifyContent:'center',
        backgroundColor:'lightcyan'
    },
    buttonText: {
        fontSize: 20,
        fontWeight:'bold',
        color: '#000000',
        textAlign: 'center'
    },
    card:{
        borderRadius:20,
        marginLeft:10,
        marginRight:10,
        // backgroundColor: '#d1eaa3'
    }
});