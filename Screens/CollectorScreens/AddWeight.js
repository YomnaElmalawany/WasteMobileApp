import React from 'react'
import { Container, Header, Form, Content, Item, Label, Input, Button, Body,Icon , CheckBox,ListItem} from 'native-base'
import {StyleSheet,TextInput,View ,TouchableHighlight,Text} from 'react-native'

class AddWeight extends React.Component {
    state = {
       
        "orgaincWeight": '',
        "nonOrganicWeight":'',
        "checked":true
    }
validate_field=()=>{

    const{orgaincWeight,nonOrganicWeight,checked}=this.state
    if(orgaincWeight=="")
    {
        alert("ادخل الوزن")
       return false
    }
    else if(nonOrganicWeight=="")
    {
        alert("ادخل الوزن")
       return false
    }
    else if(nonOrganicWeight==0&&orgaincWeight==0)
    {
        alert("ادخل الوزن")
       return false
    }
     return true
}
    Add = () => {
        console.log(this.state);
        if(this.validate_field()){
    alert("تم الاستلام بنجاح")
        let id=this.props.route.params.ListScreen;
        let schedualid=this.props.route.params.schedual;
        fetch(`http://10.0.2.2:8585/api/Collector/AddWeight?ClientID=${id}&OrgaincWeight=${this.state.orgaincWeight}&NonOrganicWeight=${this.state.nonOrganicWeight}&ScheduleID=${schedualid}&isSeparated=${this.state.checked}`
    
      
            ).then((res) => res.json())
             .then((res) => {
                console.log(res);
               
            })
             .catch((error) => console.log("Error", error))
             this.props.navigation.navigate("العملاء");
    }}
    render() {
        console.log(this.props);
        return (
            <>
                <View style={styles.container}>
        <View style={styles.inputContainer}>
                       
                               {/* <Label style = {styles.LabelText}>  وزن القمامه العضويه </Label> */}
                               {/* <Item stackedLabel> */}
                            <TextInput   style={styles.inputs} placeholder="وزن القمامه  العضويه" onChangeText={(orgaincWeight) => this.setState({ orgaincWeight })} />
                            </View>
                        {/* </Item> */}
                       
                               {/* <Label style = {styles.LabelText}> وزن القمامه الغير عضويه </Label> */}
                               {/* <Item stackedLabel> */}
                               <View style={styles.inputContainer}>
                            <TextInput  style={styles.inputs} placeholder="وزن القمامه الغير عضويه" onChangeText={(nonOrganicWeight) => this.setState({ nonOrganicWeight })} />
                        {/* </Item> */}
                        </View>
                        <View style={styles.inputContainer}>
                        {/* <Label style = {styles.LabelText}> حالة القمامة   </Label> */}
                        <CheckBox
                               
                               color="green"
                               checked={this.state.checked}
                               onPress={() => this.setState({checked: !this.state.checked})}
                               />
                        <TextInput  style={styles.inputs} placeholder="مفصولة" onChangeText={(nonOrganicWeight) => this.setState({ nonOrganicWeight })} />

                           {/* <TextInput  style =  {styles.LabelText}>مفصولة/</TextInput>> */}
                                   
                           
                           {/* <Item stackedLabel> */}
                           
                                 {/* </Item> */}
                        {/* <Item stackedLabel>
                            <Label>Address</Label>
                            <Input onChangeText={(St_Address) => this.setState({ St_Address })} />
                        </Item> */}
                       </View>
                  
                      <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.Add}>
                      <Text style={styles.signUpText}>ارسال</Text>
   
                                 {/* <Icon name="ios-arrow-forward" />  */}
                                </TouchableHighlight>
                       
                            </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        width:410,
        height: 40,
    
        textAlign: "center"
        
    
        // backgroundColor: '#4f83cc',
        // borderRadius: 25,
        // marginVertical: 10,
        // paddingVertical: 12
    },
    buttonText: {
        fontSize: 22,
        // fontWeight: '500',
        // color: '#ffffff',
        textAlign: 'center'
    },
    LabelText: {
        fontSize: 18,
        color: '#C3C3BD'
        // fontWeight: '500',
        // color: '#ffffff',
       
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d1eaa3',
      },
      inputContainer: {
          borderBottomColor: '#F5FCFF',
          backgroundColor: '#FFFFFF',
          borderRadius:30,
          borderBottomWidth: 1,
          width:250,
          height:45,
          marginBottom:20,
          flexDirection: 'row',
          alignItems:'center'
      },
      buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
      },
      signupButton: {
        backgroundColor: "#249C07",
      },
      signUpText: {
        color: 'white',
        fontSize: 20,
      }
    
});
export default AddWeight