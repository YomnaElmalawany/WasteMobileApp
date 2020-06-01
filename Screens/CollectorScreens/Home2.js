import React from 'react'
import { Content, Container, Button, Thumbnail, Icon, Header, Left, Right, Body, List, ListItem, Item } from 'native-base'
import { TouchableHighlight ,StyleSheet,Text,
    View,
    Image,} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import jwt_decode from 'jwt-decode'
// import axios from 'axios'
import AsyncStorage from'@react-native-community/async-storage'


export default class Home extends React.Component {
   
    state = {
        Data: null
    }
    componentDidMount() {
        this.getDataFromJson();
    }
    async getDataFromJson() {
        // let decodedToken=jwt_decode(accessToken);
        // let CollectorID=decodedToken.UserId;
        let CollectorID=JSON.parse(await AsyncStorage.getItem("UserId"));
     //   alert("Wait until All Departments Loaded");
        // fetch("https://jsonplaceholder.typicode.com/posts")
        //     .then((res) => res.json())
        //     .then((res) => {
        //         console.log(res);
        //         this.setState({
        //             Data: res
        //         })
        //     })
        //     .catch((error) => console("Error", error))

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
                        <Text>Loading.....</Text>
                    </Content>
                </Container>
            )
        }
        else {
         //   <Thumbnail source={require("./1.jpg")} />
            // return (
            //     <View style={styles.container}>
            //         <View style={styles.header}>
            //           <View style={styles.headerContent}>
            //               <Image style={styles.avatar}
            //                 source={require("./1.jpg")}/>
          
            //               <Text style={styles.name}>{this.state.Data.userName}</Text>
            //               <Text style={styles.userInfo}>{this.state.Data.email} </Text>
            //               <Text style={styles.userInfo}>{this.state.Data.phoneNumber} </Text>
            //           </View>
            //         </View>
          
            //         <View style={styles.body}>
                      
          
                     
          
                     
                     
          
            //         </View>
            //     </View>
            //   );
            return (

        <View style={styles.container}>
               <View style={styles.header}>
                      <View style={styles.headerContent}>

                        <Image style={styles.avatar}
                         source={require("../assets/Images/1.jpg")}/>

                   
                        {this.state.Data.map((item) => {
                            return (
                                <View >
                                   
                                  
                                        {/* <Text>{item.ClientID}</Text> */}
                                       
                                        <Text style={styles.name}>{item.userName}</Text>
                                     
                                        
                                        <Text style={styles.userInfo}>{item.email}</Text>
                                        
                                        
                                        <Text style={styles.userInfo}>{item.phoneNumber}</Text>
                                 
                                   
                                </View>
                            )
                        })}

                 
                
                    </View>
                    </View>
          
            <View style={styles.body}>   
               </View>
                </View> 
            );
        }
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#DCDCDC",
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
        fontSize:20,
        color:"#000000",
        fontWeight:'600',
        marginLeft:60,
       
      },
      userInfo:{
        marginLeft:50,
        fontSize:16,
        color:"#717D7E",
        fontWeight:'600',
       
      },
      body:{
        backgroundColor: "#778899",
        height:500,
        alignItems:'center',
      },
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