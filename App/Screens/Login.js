//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthService from '../Services/Auth';
import { setuser } from '../Redux/reducer/User';
import { useDispatch } from 'react-redux';
import SimpleToast from 'react-native-simple-toast'
import  database  from '@react-native-firebase/database';

// create a component
const Login = ({navigation}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loader,setLoader] = useState('')
    const dispatch = useDispatch()

    const route = useRoute()

    const OnLoginFunc = ()=>{
        let pattern =
        /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;
        let emailresult = pattern.test(email);
        if(email == '' || password == ''){
            SimpleToast.show('Please fill out all the fields',SimpleToast.SHORT)
            return false
        }
        if(emailresult != true){
            SimpleToast.show('Invalid Email Id.',SimpleToast.SHORT)
            return false
        }
        setLoader(true)
        auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {

            AuthService.setAccount({_id: res.user.uid, email: res.user.email ,name : email})
            dispatch(setuser({ _id: res.user.uid, email: res.user.email ,name : email}))
            setLoader(false)
            SimpleToast.show('Logged In Successfully',SimpleToast.SHORT)
            FireBaseHit(res.user.uid)
    
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                SimpleToast.show('That email address is already in use!', SimpleToast.SHORT, SimpleToast.BOTTOM)
                setLoader(false)
            }
    
            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                SimpleToast.show('That email address is invalid!', SimpleToast.SHORT, SimpleToast.BOTTOM)
                setLoader(false)
            }
            setLoader(false)
            // console.error(error);
            SimpleToast.show('The supplied auth credential is incorrect', SimpleToast.SHORT, SimpleToast.BOTTOM)
        });
    }

    const FireBaseHit = (id)=>{
        let data = {
            email_id : email,
            user_id:id,
            name:email
        }
        database()
        .ref('/users/' + id)
        .set(data)

    }

   
    return (
        <View style={styles.container}>
             <TextInput
                style={styles.input}
                onChangeText={(val)=>setEmail(val)}
                value={email}
                placeholder="Enter Email"
                keyboardType='email-address'
                autoCapitalize='none'
            />

             <TextInput
                style={[styles.input,{
                    marginBottom:40
                }]}
                onChangeText={(val)=>setPassword(val)}
                value={password}
                placeholder="Enter Password"
                secureTextEntry={true}
            />

            <TouchableOpacity
            onPress={()=>OnLoginFunc()}
            style={styles.btn}>
                    <Text
                    style={[styles.textStyle,{
                        marginRight:loader ? 6 : 0
                    }]}
                    >Login</Text>
                    {
                        loader ?
                        <ActivityIndicator size={'small'} color={'white'}/>
                        :
                        null

                    }
            </TouchableOpacity>
            <Text
            onPress={()=>navigation.navigate('Register')}
             style={[styles.textStyle,{
                color:'black',
                fontSize:14
             }]}
            >Register</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },
    input: {
        height: 40,
        width:"80%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:5
      },
      btn:{
        width:"80%",
        height:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"blue",
        borderRadius:5,
        flexDirection:'row',
        marginBottom:20
      },
      textStyle:{
       fontSize:18,
       color:'white'
      }
});

//make this component available to the app
export default Login;
