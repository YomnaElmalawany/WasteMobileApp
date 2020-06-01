import React from 'react'
import AdaptiveCard from 'adaptivecards-reactnative'
import {Button, Text, View, Left, Right,Body, Card, CardItem} from 'native-base'
export default class TryAdaptiveCard extends React.Component{
    
    state={
        cardColor:""
    }

    render(){
        var templatePayload = {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
                {
                    "type": "Container",
                    "containerStyles":{
                        "default":{
                            "backgroundColor":"#000"
                        }
                    },
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "Publish Adaptive Card schema",
                            "weight": "bolder",
                            "size": "medium",
                            "horizontalAlignment": "Right"
                        },
                        {
                            "type": "TextBlock",
                            "spacing": "none",
                            "text": "Created Tuesday, Feb 14, 2017",
                            "isSubtle": true,
                            "wrap": true,
                            "horizontalAlignment": "Right"
                        },
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "Name:",
                                            "wrap": true,
                                            "horizontalAlignment": "Right"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "Date:",
                                            "wrap": true,
                                            "horizontalAlignment": "Right"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "auto",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "رقم العمارة: ",
                                            "weight": "bolder",
                                            "wrap": true,
                                            "horizontalAlignment": "Right"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "رقم الشقة: ",
                                            "weight": "bolder",
                                            "wrap": true,
                                            "horizontalAlignment": "Right"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            // "actions": [
            //     {
            //         "type": "Action.ShowCard",
            //         "title": "اتصال",
            //         "card": {
            //             "version": "1.0",
            //             "type": "AdaptiveCard",
            //             "body": [
            //                 {
            //                     "type": "Input.Date",
            //                     "id": "dueDate",
            //                     "title": "Select due date"
            //                 }
            //             ],
            //             "actions": [
            //                 {
            //                     "type": "Action.Submit",
            //                     "title": "OK"
            //                 }
            //             ]
            //         }
            //     },
            //     {
            //         "type": "Action.ShowCard",
            //         "title": "استلام",
            //         "card": {
            //             "version": "1.0",
            //             "type": "AdaptiveCard",
            //             "body": [
            //                 {
            //                     "type": "Input.Text",
            //                     "id": "comment",
            //                     "isMultiline": true,
            //                     "placeholder": "Enter your comment"
            //                 }
            //             ],
            //             "actions": [
            //                 {
            //                     "type": "Action.Submit",
            //                     "title": "OK"
            //                 }
            //             ]
            //         }
            //     },
            //     // {
            //     //     "type": "Action.OpenUrl",
            //     //     "title": "View",
            //     //     "url": "http://adaptivecards.io"
            //     // }
            // ]
        }
        return(
            <>
            {/* <Card onTouchStart={() => console.log("kj")}><Text>j</Text></Card> */}
            <View onTouchStart={() => console.log("1")}>
            <AdaptiveCard payload={templatePayload} 
            
            //    hostConfig={}
            //    themeConfig={}
            //    onExecuteAction={} 
            //    onParseError={} 
               containerStyle={{
                   margin:10,
                //    shadowColor: '#333',
                //    shadowOffset: {width: 1, height: 3},
                //    shadowOpacity: 0.3
                    // width:100, 
                    // height: 100, 
                    // flexGrow:1, 
                    // backgroundColor:'lightblue'
               }}
            //    contentHeight={500} 
            //    ref="referenceVariable"
               />
               
              </View>
              <View onTouchStart={() => console.log("2")}>
              <AdaptiveCard payload={templatePayload} 
            
            containerStyle={{
                margin:10,
            }}
            />
              </View>
               {/* <AdaptiveCard payload={templatePayload} 
               containerStyle={{
                   margin:10,
               }}
               /> */}
            </>
               
        )
    }
} 