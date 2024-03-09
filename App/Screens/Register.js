//import liraries
import { useRoute } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast'
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setuser } from '../Redux/reducer/User';
import AuthService from '../Services/Auth';
import  database  from '@react-native-firebase/database';

// create a component
const Register = ({navigation}) => {
    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
   
    const [loader,setLoader] = useState('')
    const route = useRoute()

    const OnRegister = ()=>{
        let pattern =
        /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;
        let emailresult = pattern.test(email);
        if(email == '' || password == ''){
            SimpleToast.show('Please fill out all the fields.',SimpleToast.SHORT)
            return false
        }

        if(emailresult != true){
            SimpleToast.show('Invalid Email Id.',SimpleToast.SHORT)
            return false
        }

        if(password.length < 6){
            SimpleToast.show('Password should be minimum of 6 characters',SimpleToast.SHORT)
            return false
        }


        setLoader(true)
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            console.log('ress>>>',JSON.stringify(res));
            setLoader(false)
            // AuthService.setToken(res.user.uid)
           
            AuthService.setAccount({_id: res.user.uid, email: res.user.email,name : email})
            dispatch(setuser({ _id: res.user.uid, email: res.user.email , name : email }))
            SimpleToast.show('Registered Successfully',SimpleToast.SHORT)
            FireBaseHit(res.user.uid)

        })
        .catch(error => {
            console.log('errr>>',error);
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                SimpleToast.show('That email address is already in use!', SimpleToast.SHORT, SimpleToast.BOTTOM)
                setLoader(false)
                setEmail('')
                setPassword('')
               
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
           placeholderTextColor={'grey'}
       />

        <TextInput
           style={[styles.input,{
               marginBottom:40
           }]}
           placeholderTextColor={'grey'}
           onChangeText={(val)=>setPassword(val)}
           value={password}
           placeholder="Enter Password"
           
           secureTextEntry={true}
       />

       <TouchableOpacity
       onPress={()=>OnRegister()}
       style={styles.btn}>
               <Text
               style={[styles.textStyle,{
                marginRight:loader ? 6 : 0
               }]}
               >Register</Text>
               {
                   loader ?
                   <ActivityIndicator size={'small'} color={'white'}/>
                   :
                   null

               }
       </TouchableOpacity>
       <Text
       onPress={()=>navigation.navigate('Login')}
        style={[styles.textStyle,{
           color:'black',
           fontSize:14
        }]}
       >Login</Text>
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
        borderRadius:5,
        color:'black'
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
export default Register;
