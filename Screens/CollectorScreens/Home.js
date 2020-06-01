import React from 'react'
import { Content, Container, Button, Thumbnail, Icon, Header, Left, Right, Body, List, ListItem, Item, Spinner, Card, CardItem } from 'native-base'
import { TouchableHighlight ,StyleSheet,Text,
    View,
    Image,} from 'react-native'
import AsyncStorage from'@react-native-community/async-storage'

export default class Home extends React.Component {
   
    state = {
        Data: null
    }
    componentDidMount() {
        this.getDataFromJson();
    }
    async getDataFromJson() {
        let CollectorID=JSON.parse(await AsyncStorage.getItem("UserId"));

        fetch(`http://10.0.2.2:7777/api/Collector/profile?CollectorID=${CollectorID}`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            this.setState({
                Data: res,
               
               
            })
         
        })
        .catch((error) => console.log("Error", error))
        //alert(this.state.Data);
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

        <View style={styles.container}>
               <View style={styles.header}>
                      <View style={styles.headerContent}>

                        <Image style={styles.avatar}
                         source={require("../assets/Images/1.jpg")}/>
                    </View>
                    </View>
          
                    {/* <View style={styles.body}>    */}
                    {this.state.Data.map((item) => {
                            return (
                                <Card style={{width:400, height:500,backgroundColor: "#a1dd70", margin:5}}>
                                    <CardItem style={{backgroundColor: "#a1dd70"}}>
                                    <Left><Text style={styles.name}>Name: </Text></Left>
                                    <Body>
                                    <Text style={styles.name}>{item.userName}</Text>
                                    </Body>
                                    </CardItem>
                                    <CardItem style={{backgroundColor: "#a1dd70"}}>
                                    <Left><Text style={styles.name}>Email: </Text></Left>
                                    <Body>
                                    <Text style={styles.name}>{item.email}</Text>
                                    </Body>
                                    </CardItem>
                                    <CardItem style={{backgroundColor: "#a1dd70"}}>
                                    <Left><Text style={styles.name}>Phone: </Text></Left>
                                    <Body>
                                    <Text style={styles.name}>{item.phoneNumber}</Text>
                                    </Body>
                                    </CardItem>
                                   {/* <Text>{item.ClientID}</Text> */}
                                     
                                </Card>
                            )
                        })}
                    {/* </View> */}
                </View> 
            );
        }
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#d1eaa3",
      },
      headerContent:{
        padding:30,
        alignItems: 'center',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
      },
      name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'900',
        marginLeft:60,
       
      },
      userInfo:{
        marginLeft:50,
        fontSize:17,
        color:"#717D7E",
        fontWeight:'900',
       
      },
      body:{
        backgroundColor: "#a1dd70",
        height:500,
        alignItems:'center',
      },
      container:{
        backgroundColor: "#a1dd70"
      }
    //   item:{
    //     flexDirection : 'row',
    //   },
    //   infoContent:{
    //     flex:1,
    //     alignItems:'flex-start',
    //     paddingLeft:5
    //   },
    //   iconContent:{
    //     flex:1,
    //     alignItems:'flex-end',
    //     paddingRight:5,
    //   },
    //   icon:{
    //     width:30,
    //     height:30,
    //     marginTop:20,
    //   },
    //   info:{
    //     fontSize:18,
    //     marginTop:20,
    //     color: "#FFFFFF",
    //   }
});