//import liraries
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { Component } from 'react';
import HomePage from '../Screens/HomePage';

const Stack = createStackNavigator();
// create a component
const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='HomePage'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='HomePage' component={HomePage} />
            
        </Stack.Navigator>
    );
};

export default AppStack;
