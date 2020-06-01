import React from 'react';
import {  TouchableHighlight,ActivityIndicator,StyleSheet,View} from 'react-native';
import{Container,Header,List,ListItem,Text,Content, Body, Right, Left, Thumbnail, Button} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from'@react-native-community/async-storage'

const ACCESS_TOKEN = 'access_token';

export default class getDriverSchedule extends React.Component{
    state={
        Data:null,
    }
    componentDidMount () {
        fetch("http://10.0.2.2:7777/api/driver/getDriverSchedule/1002")
        .then((res)=>res.json())
        .then((res)=>{
         // console.log(res);
          this.setState({Data:res});})
          .catch((error)=>console.log("Error",error));
    }
    async deleteToken(){
      try {
        await AsyncStorage.removeItem(ACCESS_TOKEN)
        let token = await AsyncStorage.getItem(ACCESS_TOKEN)
        if(token == null)
          console.log("token removed successfully");
          
      } catch(error) {
          console.log("Something went wrong, Error Details: ", error);
      }
  }

  onLogoutPressed(){
      this.deleteToken();
      
      this.props.navigation.navigate('Login');
  }

    render(){
        console.log("in driver home");
        
          if(this.state.Data==null)
            {console.log("load...");
              return(
              <View>
                <ActivityIndicator />
              </View>
             )}
         else{
           console.log(this.state.Data);
          return(
      <Container>
        <Header style={{backgroundColor:'lightgreen'}}>
            
            <Left>
              <Button style={{width:70}} transparent={true} onPress={() => this.onLogoutPressed()}>
              <Text style={{color: 'white', fontSize:18, textDecorationLine:'underline'}}>خروج</Text>
              </Button>
            </Left>
            <Body style={{marginLeft:120}}>
            <Text style={{color: 'white', fontWeight:'bold', fontSize:24, fontStyle:'italic'}}>WasteApp</Text>
            </Body>
            <Right>
            <Thumbnail style={{width:35,height:40}} source={require('../assets/Images/LogoIcon.png')}/>
                
            </Right>
        </Header>
        <View style={{marginRight:25, marginTop: 15, marginBottom:10}}>
          <Text style={{color: 'green', fontWeight:'bold', fontSize:22, textDecorationLine:'underline'}}>عناوين اليوم</Text>
        </View>
        <Content>
          <List>
              {this.state.Data.map((item)=>{
                  return(
                    <>
                                       
                       <ListItem>
                           <Left>
                               <Icon name="ios-pin" size={40} color="green" onPress={()=>this.props.navigation.navigate("map",{"stInfo":{lat:item.latitude,lng:item.longitude,BNo:item.buildingNo}})} />
                           </Left>
                         <Body>
                          <Text> {item.streetNameArabic +"-"}{item.regionInfo[0].nameArabic}</Text>

                         </Body>
                         <Right>
                            <Icon name="md-business" size={20}/>
                         </Right>
                        </ListItem>
                  </>
                  )
              })}
            
         
          </List>
        </Content>
      </Container>
           
            
            
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
                            
//                         <Thumbnail style={{width:25,height:40}} source={require('../Images/road.png')}/>  
