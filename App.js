
import React from 'react';
import {
  
  View,
  StyleSheet,
  Text
 
} from 'react-native';

import MapView ,{ PROVIDER_GOOGLE ,Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

const GM_API_KEY='2Gs3WBhIUHcYZ0WcYg3j00C78FWSXt2T';
//navigator.geolocation=require('@react-native-community/geolocation');
export default class App extends  React.Component {
  
  constructor(props){
    super(props);
    this.state={
      latitude:0,
      longitude:0,
      error: null
    };
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
  }
  /*
  constructor(){
    super();
    this.state={
      ready:false,
      where:{lat: null,lng: null},
      error: null
    }
  }
componentDidMount(){
  let geoOptions={
    enableHighAccuracy: true,
    timeOut: 20000,
    maximumAge: 60*60*24
  };
  this.setState({ready: false, error: null});
  navigator.geolocation.getCurrentPosition(this.geoSuccess,this.geoFailure,geoOptions);
}
geoSuccess=(position)=>{
  console.log(position);
 this.setState({ready:true});
}
geoFailure=(err)=>{
this.setState({error: err.message});
}
*/
  
  areas=[{   
  "lat": 30.07708, 
  "lng": 31.285909},
  { 
    "lat": 31.215645, 
  "lng": 29.955266},
  {
    "lat": 30.459065, 
  "lng": 31.178577},
  {
    "lat": 31.114304, 
    "lng": 30.940116}]
  render(){
   // Geolocation.getCurrentPosition(data=>console.warn(data.coords.longitude));
   // console.warn("Geolocation");
   console.warn(this.state.latitude);
   console.warn(this.state.longitude);
    return (
    <View style={styles.container}>
      <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps*/
        style={styles.map}
       initialRegion={{
         latitude:  26.8206,//this.state.latitude,//26.8206, 
         longitude:  30.8025,//this.state.longitude, //30.8025,
         latitudeDelta: 2.7,
         longitudeDelta: 2.9,
       }}
     >
       <Marker title="current location" coordinate={this.state}/>
       {this.areas.map((location)=>{
         const lat=location.lat;
         const lng=location.lng;
         return(
           <Marker title="hi" coordinate={{latitude:lat,longitude:lng}} >


           </Marker>
           
         );
        
       })}
        <MapViewDirections 
        origin={this.areas[0]}
        destination={this.areas[2]}
        apikey={GM_API_KEY}
        strokeWidth={3}
        strokeColor="hotpink"/>
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

