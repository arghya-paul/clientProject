//import liraries
import { useRoute } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput, StatusBar, TouchableOpacity } from 'react-native';


// create a component
const SingleChatPage = ({navigation}) => {
    const route = useRoute()
    const [msgInputArea , setMsgInputArea] = useState('')
    const Roomid = route.params.ROOMID
    const Remoteid = route.params.REMOTEID
    const RemoteDetails = route.params.DETAILS




    const SendMessage = ()=>{
        
    }

    return (
        <View style={styles.container}>
            <StatusBar
            backgroundColor={'blue'}
            barStyle={'light-content'}
            />
            <View
            style={styles.headerView}
            >
                <Pressable
                onPress={()=>navigation.goBack()}
                style={styles.iconView}
                >
                    <Image source={require('../Assets/back.png')}
                    style={styles.backIcon}
                    />
                </Pressable>
                <Text
                style={styles.headerText}
                >SingleChatPage</Text>
            </View>




            <View
            style={{backgroundColor:"#DEDEDE",
                position:"absolute",
                bottom:0,
                width:'100%',
                flexDirection:'row',
                alignItems:"center"
                }}
            >
            <TextInput
               
                placeholder="Write something"
                onChangeText={val => setMsgInputArea(val)}
                value={msgInputArea}
                style={styles.input}
            />
                <TouchableOpacity
                onPress={()=>SendMessage()}
                >

            
                    <Image source={require('../Assets/send.png')}
                    style={styles.sendIcon}
                    />
             </TouchableOpacity>
            
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    backIcon:{
        height:30,
        width:30,
        tintColor:"white"
    },
    headerView:{
        flexDirection:"row",
        paddingHorizontal:15,
        backgroundColor:'blue',
        paddingVertical:20
    },
    iconView:{
        width:"26%"
    },
    headerText:{
        fontSize:20,
        color:"white"
    },
    input: {
        height: 40,
        width:"80%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:5
      },
      sendIcon:{
        height:30,
        width:30
      }
});

//make this component available to the app
export default SingleChatPage;
