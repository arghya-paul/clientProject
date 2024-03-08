//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SimpleToast from 'react-native-simple-toast'
import AuthService from '../Services/Auth';
import { logout, setuser } from '../Redux/reducer/User';
import  database  from '@react-native-firebase/database';


// create a component
const HomePage = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state => state.User);
    
    useEffect(()=>{
        getAccountDetails()
        GetAllUsers()
      },[])

    const getAccountDetails = () => {
        AuthService.getAccount()
          .then(result => {
            if (result != null) {
              dispatch(setuser(result));
            }
          })
          .catch(err => {
          })
      }

      const GetAllUsers = ()=>{
        database()
        .ref('/users/')
        .once('value')
        .then(res=>{
          
            if(res.exists()){
                let data = Object.values(res.val())
                console.log('dattt>>',data);
            }
        })
      }

    const LogOutFunc = ()=>{
            SimpleToast.show('Logged Out Successfully ', SimpleToast.LONG);
            AuthService.logout();
            dispatch(logout());

    }



    return (
        <ScrollView style={styles.container}>
            <View
            style={styles.headerView}
            >
                <Text 
                style={[styles.textStyle,{
                    textAlign:"center"
                }]}
                >Welcome to homepage</Text>
            </View>
            <TouchableOpacity>
                <View
                style={styles.chatView}
                >
                    <Text
                    style={styles.textStyle}
                    >Your chats</Text>
                </View>
            </TouchableOpacity>

            <Text>Other Users</Text>




            <TouchableOpacity
            onPress={()=>LogOutFunc()}
            >
                <View
                style={[styles.chatView,{
                   marginTop:60
                }]}
                >
                    <Text
                    style={styles.textStyle}
                    >Log Out</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    textStyle:{
        fontSize:18,
        color:'white'
       },

       headerView:{
        backgroundColor:"blue",
        width:"70%",
        alignSelf:"center",
        marginVertical:40,
        borderRadius:5,
        height:40,
        alignItems:'center',
        justifyContent:'center'
       },
       chatView:{
        height:30,
        width:'40%',
        alignItems:'center',
        backgroundColor:"blue",
        marginHorizontal:20,
        justifyContent:'center',
        alignSelf:"center",
        borderRadius:5
       }

});

//make this component available to the app
export default HomePage;
