import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NewsScreen from '../screen/NewsScreen';
import NewsDetailScreen from '../screen/NewsDetailScreen';

const ChatSOSStack = createNativeStackNavigator();

const ChatSOSNav = () => {
    return(
        <ChatSOSStack.Navigator 
            initialRouteName="NewsScreen"
            screenOptions={{ headerShown: false}}
        >
            <ChatSOSStack.Screen name="NewsScreen" component={NewsScreen} />
            <ChatSOSStack.Screen name="NewsDetailScreen" component={NewsDetailScreen} />
        </ChatSOSStack.Navigator>
    );
};

export default ChatSOSNav;