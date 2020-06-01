
import React from 'react';
import {View,StyleSheet,Text,ActivityIndicator} from 'react-native';
import MapView ,{ PROVIDER_GOOGLE ,Marker} from 'react-native-maps';


export default class getApiInfo extends React.Component{
    addresses=["Al Marghani, Al Attarin, Alexandria Governorate","Kom Ad Dakah ,Gharb, Al Attarin, Alexandria ",]
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            dataSource: null,
        }
    }
    //https://www.mapquestapi.com/directions/v2/route?key=KEY&from=Denver%2C+CO&to=Boulder%2C+CO&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false
        componentDidMount(){
            return fetch('http://www.mapquestapi.com/geocoding/v1/address?key=2Gs3WBhIUHcYZ0WcYg3j00C78FWSXt2T&location=AlMarghani,AlAttarin,Alexandria')
            .then((response)=> response.json)
            .then((responseJson)=>{
                console.log(responseJson.locations);
               this.setState({
                   isLoading: false,
                   dataSource: responseJson.locations.latLng,
               })
            }).catch((error)=>{
                console.log(error)
            });

        }
        render(){
            if(this.state.isLoading){
                return (
                    <View style={styles.container}>
                        <ActivityIndicator style={styles.load}/>

                    </View>
                );
            }
            else{
            return(
                <View style={styles.container}>
                    <MapView 
                     provider={PROVIDER_GOOGLE} // remove if not using Google Maps*/
                     style={styles.map}
                    initialRegion={{
                      latitude:  26.8206,//this.state.latitude,//26.8206, 
                      longitude:  30.8025,//this.state.longitude, //30.8025,
                      latitudeDelta: 2.7,
                      longitudeDelta: 2.9,
                    }}>
                     <Marker title="current location" coordinate={this.state.dataSource}/>
                    </MapView>
                </View>
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
        map: {
          ...StyleSheet.absoluteFillObject,
        },
        load:{
            alignItems: 'center',
        }
       });

//http://www.mapquestapi.com/directions/v2/route?key=2Gs3WBhIUHcYZ0WcYg3j00C78FWSXt2T&from=Clarendon Blvd,Arlington,VA&to=2400+S+Glebe+Rd,+Arlington,+VA