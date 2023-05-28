import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screen/SplashScreen';
import LoginScreen from './src/screen/LoginScreen';
import MainNav from './src/navigation/MainNav'

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();


function App({navigation}) {
    return (
		<MainNav />
    );
}

export default App;