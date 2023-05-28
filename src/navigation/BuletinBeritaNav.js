import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NewsScreen from '../screen/NewsScreen';
import NewsDetailScreen from '../screen/NewsDetailScreen';

const BuletinStack = createNativeStackNavigator();

const BuletinBeritaNav = () => {
    return(
        <BuletinStack.Navigator 
            initialRouteName="NewsScreen"
            screenOptions={{ headerShown: false}}
        >
            <BuletinStack.Screen name="NewsScreen" component={NewsScreen} />
            <BuletinStack.Screen name="NewsDetailScreen" component={NewsDetailScreen} />
        </BuletinStack.Navigator>
    );
};

export default BuletinBeritaNav;