//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './App/Screens/Register';
import Login from './App/Screens/Login';
import { useDispatch, useSelector } from 'react-redux';
import AuthStack from './App/Navigation/AuthStack';
import AppStack from './App/Navigation/AppStack';
import AuthService from './App/Services/Auth';
import { setuser } from './App/Redux/reducer/User';

// create a component

const Stack = createStackNavigator()
const App = () => {
  const dispatch = useDispatch()
  const [initLoader , seinitLoader] = useState(true)

  useEffect(()=>{
    getAccountDetails()
    setTimeout(() => {
      seinitLoader(false)
    }, 1000);
  },[])
  const getAccountDetails = () => {
 
    AuthService.getAccount()
      .then(result => {
        // console.log('result>>>>>>>>>>>>>>>>>>>>>>>', result)
        if (result != null) {
          dispatch(setuser(result));
        
        }
      })
      .catch(err => {
        console.log('err>>>', err)
     
      })
  }

  
  const login_status = useSelector(state => state.User.login_status)


  return (
    <NavigationContainer style={styles.container}>
      {
        initLoader ?
        <View
        style={{flex:1,
        alignItems:"center",
        justifyContent:'center'
        }}
        >
          <ActivityIndicator size={'large'} color={'blue'}/>
        </View>
        :
        <Stack.Navigator
        initialRouteName='AuthStack'
        screenOptions={{
          headerShown: false,
        }}
        >
          {
              login_status == true ?
              <Stack.Screen name='AppStack' component={AppStack}/>
              :
              <Stack.Screen name='AuthStack' component={AuthStack}/>
          }
           
           
        </Stack.Navigator>
}
    </NavigationContainer>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default App;
