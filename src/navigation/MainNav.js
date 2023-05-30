import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import BuletinBeritaNav from './BuletinBeritaNav';
import PelaporanNav from './PelaporanNav';
import ChatNav from './ChatNav';
import ChatSOSNav from './ChatSOSNav';
import ChatSOS from '../screen/chat/ChatSOS';

const Tab = createBottomTabNavigator();

function MainNav({navigation}) {    
    return (
        <Tab.Navigator  
                        screenOptions={({ route }) => ({
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
                    {/* <Tab.Screen name="SplashScreen" component={LoginScreen} options={{ tabBarButton: (props) => null, }}/>  */}
                    
                    {/* <Tab.Screen name="Login" component={() => <LoginScreen tokenState={token} setTokenState={setToken}/>} options={{ tabBarButton: (props) => null, }} /> */}
                    <Tab.Screen name="Dashboard" component={HomeScreen}/>
                    <Tab.Screen name="Pelaporan" component={PelaporanNav} />
                    <Tab.Screen name="Buletin Berita" component={BuletinBeritaNav } />
                    <Tab.Screen name="Chat" component={ChatNav} />
                    <Tab.Screen name="Chat SOS" component={ChatSOSNav} />
                </Tab.Navigator>
        
    );
}

export default MainNav;