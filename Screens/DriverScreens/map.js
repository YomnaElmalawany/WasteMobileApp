
import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import MapView ,{ PROVIDER_GOOGLE ,Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

//const GM_API_KEY='2Gs3WBhIUHcYZ0WcYg3j00C78FWSXt2T';
export default class map extends  React.Component {
  
  constructor(props){
    super(props);
    this.state={
      latitude:0,
      longitude:0,
      error: null,
      streets:[],
      
    };
    
  }
  
  addNewSt=(newobj)=>{
    
    let newarr=[...this.state.streets,newobj];
     
    this.setState(
      {
        streets:newarr
      }
      )

  }
   
  componentDidMount(){
    Geolocation.getCurrentPosition(position=>{
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error:null
      });
    }, error => this.setState({error: error.message}),
    {enableHighAccuracy: true,timeout: 20000,maximumAge: 20000}
    );
    this.addNewSt(this.props.route.params.stInfo);
  }

  render(){
   
console.log(this.state.streets);
    //console.log(this.props.route.params.stInfo);
  // console.warn("current position coordinates:");
   //console.warn(this.state.latitude);
   //console.warn(this.state.longitude);
    return (
    <View style={styles.container}>
      <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps*/
        style={styles.map}
       initialRegion={{
         latitude:  26.8206,//this.state.latitude,
         longitude:  30.8025,//this.state.longitude, 
         latitudeDelta: 2.7,
         longitudeDelta: 2.9,
       }}
     >
       <Marker title="current location" coordinate={{latitude:this.state.latitude,longitude:this.state.longitude}}/>
       {this.state.streets.map((location)=>{
         const lat=location.lat;
         const lng=location.lng;
         return(
           <Marker title={`مبنى رقم:${location.BNo}`} coordinate={{latitude:lat,longitude:lng}} >


           </Marker>
           
         );
        
       })}
       
      </MapView>
    </View>
      );
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

