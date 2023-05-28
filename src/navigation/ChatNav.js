import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NewsScreen from '../screen/NewsScreen';
import NewsDetailScreen from '../screen/NewsDetailScreen';

const ChatStack = createNativeStackNavigator();

const ChatNav = () => {
    return(
        <ChatStack.Navigator 
            initialRouteName="NewsScreen"
            screenOptions={{ headerShown: false}}
        >
            <ChatStack.Screen name="NewsScreen" component={NewsScreen} />
            <ChatStack.Screen name="NewsDetailScreen" component={NewsDetailScreen} />
        </ChatStack.Navigator>
    );
};

export default ChatNav;