import React from 'react'
import { Container, Header, Form, Content, Item, Label, Input, Button, Body, Text,Icon , CheckBox,ListItem} from 'native-base'
import {StyleSheet} from 'react-native'
// import axios from 'axios'
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
        this.props.route.params.ClientScreen.setState({textLine:'line-through'})
        console.log(this.state);
        if(this.validate_field()){
    alert("تم الاستلام بنجاح")
        let id=this.props.route.params.ListScreen;
        let schedualid=this.props.route.params.schedual;
        fetch(`http://10.0.2.2:7777/api/Collector/Weight?ClientID=${id}&OrgaincWeight=${this.state.orgaincWeight}&NonOrganicWeight=${this.state.nonOrganicWeight}&ScheduleID=${schedualid}&isSeparated=${this.state.checked}`
    
      
            ).then((res) => res.json())
             .then((res) => {
                console.log(res);
               
            })
             .catch((error) => console.log("Error in add Weight Response: ", error))
             this.props.navigation.navigate("العملاء");
    }}
    render() {
        console.log(this.props);
        return (
            <>
                <Container>
                   
                    <Content>
                       
                               <Label style = {styles.LabelText}>  وزن القمامه العضويه </Label>
                               <Item stackedLabel>
                            <Input onChangeText={(orgaincWeight) => this.setState({ orgaincWeight })} />
                        </Item>
                       
                               <Label style = {styles.LabelText}> وزن القمامه الغير عضويه </Label>
                               <Item stackedLabel>
                            <Input onChangeText={(nonOrganicWeight) => this.setState({ nonOrganicWeight })} />
                        </Item>
                        <Label style = {styles.LabelText}> حالة القمامة   </Label>
                         <Body> 
                           <Text  style =  {styles.LabelText}>مفصولة</Text>
                                   
                           </Body> 
                           <Item stackedLabel>
                             <CheckBox
                               
                                 color="green"
                                 checked={this.state.checked}
                                 onPress={() => this.setState({checked: !this.state.checked})}
                                 />
                                 </Item>
                        {/* <Item stackedLabel>
                            <Label>Address</Label>
                            <Input onChangeText={(St_Address) => this.setState({ St_Address })} />
                        </Item> */}
                       
                      <Item>
                            <Button success style = {styles.button} onPress={this.Add}>
                                <Text style = {styles.buttonText}>ارسال</Text>
                                <Icon name="ios-arrow-forward" />
                            </Button>
                            </Item>
                    </Content>
                   
                                     
                </Container>
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
        fontSize: 22,
        // fontWeight: '500',
        // color: '#ffffff',
       
    }
    
});
export default AddWeight