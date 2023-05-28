import React, { useState, useEffect } from 'react';
import { Image, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screen/HomeScreen';
import BuletinBeritaNav from './BuletinBeritaNav';
import PelaporanNav from './PelaporanNav';
import ChatNav from './ChatNav';
import ChatSOSNav from './ChatSOSNav';

import SplashScreen from '../screen/SplashScreen';
import LoginScreen from '../screen/LoginScreen';

const Tab = createBottomTabNavigator();

function MainNav({navigation}) {    

    const [isSignedIn, setSignedIn] = useState(false);
	const [token, setToken] = useState('');

    useEffect(() => {
		const checkStatusLogin =  async () => {
			try {
				const token = await AsyncStorage.getItem('token');
				console.log("token", JSON.parse(token));

				if (token) {
					setSignedIn(true);
					setToken(token);
					console.log('State isChanged ......')
                    console.log(isSignedIn);
					// AsyncStorage.removeItem('token')
				}
			} catch (error) {
				console.log(error);
			}
		}

		checkStatusLogin();
    }, [token]);

    return (
        <NavigationContainer>
            <Tab.Navigator  
                    screenOptions={({ route }) => ({
                        initialRouteName:"Login",
                        tabBarHideOnKeyboard: true,
                        headerShown: false,
                        tabBarStyle: { backgroundColor: '#02170a', height: 54 },
                        tabBarLabelStyle: { paddingBottom: 5 },
                        tabBarActiveTintColor: '#00cea6',
                        tabBarInactiveTintColor: 'gray',
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconSource;
                            if (route.name === 'Dashboard') {
                                iconSource = focused ? require('../assets/Icons/dashboard.png') : require('../assets/Icons/dashboard.png');
                            } else if (route.name === 'Pelaporan') {
                                iconSource = focused ? require('../assets/Icons/pelaporan.png') : require('../assets/Icons/pelaporan.png');
                            } else if (route.name === 'Buletin Berita') {
                                iconSource = focused ? require('../assets/Icons/buletin-berita.png') : require('../assets/Icons/buletin-berita.png');
                            } else if (route.name === 'Chat') {
                                iconSource = focused ? require('../assets/Icons/chat.png') : require('../assets/Icons/chat.png');
                            } else if (route.name === 'Chat SOS') {
                                iconSource = focused ? require('../assets/Icons/sos.png') : require('../assets/Icons/sos.png');
                            } else if (route.name === 'InitScreen') {
                                iconSource = focused ? require('../assets/Icons/sos.png') : require('../assets/Icons/sos.png');
                            }
                
                            return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
                        },
                    })}
                >
                {/*<Tab.Screen name="SplashScreen" component={SplashScreen} options={{ tabBarButton: (props) => null, }}/>  */}
                
                <Tab.Screen name="Login" component={LoginScreen} options={{ tabBarButton: (props) => null, }} />
                <Tab.Screen name="Dashboard" component={HomeScreen}/>
                <Tab.Screen name="Pelaporan" component={PelaporanNav} />
                <Tab.Screen name="Buletin Berita" component={BuletinBeritaNav } />
                <Tab.Screen name="Chat" component={ChatNav} />
                <Tab.Screen name="Chat SOS" component={ChatSOSNav} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainNav;