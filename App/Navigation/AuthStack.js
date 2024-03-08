//import liraries
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { Component } from 'react';
import Login from '../Screens/Login';
import Register from '../Screens/Register';

const Stack = createStackNavigator();
// create a component
const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false,
            }}
        >
             <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Register' component={Register}/>
            
        </Stack.Navigator>
    );
};

export default AuthStack;
