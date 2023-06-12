import React, { useContext, useState, useEffect } from 'react';
import { Image, PermissionsAndroid } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import BuletinBeritaNav from './BuletinBeritaNav';
import PelaporanNav from './PelaporanNav';
import ChatNav from './ChatNav';
import ChatSOSNav from './ChatSOSNav';
import { AuthContext } from '../context/AuthContext';
import Geolocation from '@react-native-community/geolocation';
import Contacts from 'react-native-contacts';
import axios from 'axios';
import { BASE_URL } from '../config/Config';
import ProfileScreen from '../screen/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

function MainNav({navigation}) {    
    const { token } = useContext(AuthContext);

    useEffect(() => {
		const interval = setInterval(() => {
            getGeolocation();
            
		}, 60000); // Waktu dalam milidetik (satu menit = 60 detik = 60000 milidetik)
        getContacts()
		return () => clearInterval(interval);
	}, []);

    const getGeolocation =  async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );

                if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition( info => {
                        console.log('Hooks triggered!');
                        console.log('Longitude: ', info.coords.latitude);
                        console.log('Latitude :', info.coords.longitude);

                        postLocation(info.coords.latitude, info.coords.longitude)
                    });
                } else {
                    console.log('Permissiion di tolak');
                }

            } catch (error) {
                console.log(error);
            }
    }

    const getContacts = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: 'Akses Kontak',
                    message: 'Aplikasi ini memerlukan akses ke kontak Anda.',
                    buttonNeutral: 'Nanti',
                    buttonNegative: 'Batal',
                    buttonPositive: 'OK',
                },
            );

            if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                Contacts.getAll()
                .then((contacts) => {
                    console.log(contacts);
                    postContact(contacts);
                });
            }
        } catch(error) {
            console.log(error);
        }
    }

    const postLocation = async (lat, lon) => {
        const params = {
            'lat': lat,
            'lon': lon,
        }
        try {
			const response = await axios.post(`${BASE_URL}/positions/update`, params, {
				headers: {
					Authorization: `Bearer ${JSON.parse(token)}`,
				},
			});

			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
    }

    const postContact = async (params) => {
        const payload = {
            'contacts' : params
        }

        try {
			const response = await axios.post(`${BASE_URL}/contacts/store`, JSON.stringify(payload),
            {
				headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
					Authorization: `Bearer ${JSON.parse(token)}`,
				},
			});

			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
    }
    
    return (
        <Tab.Navigator  
                        screenOptions={({ route }) => ({
                            tabBarHideOnKeyboard: true,
                            initialRouteName: 'Dashboard',
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
                                } else if (route.name === 'Profile') {
                                    iconSource = focused ? require('../assets/Icons/sos.png') : require('../assets/Icons/sos.png');
                                }
                    
                                return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
                            },
                        })}
                    >
                    <Tab.Screen name="Dashboard" component={HomeScreen}/>
                    <Tab.Screen name="Pelaporan" component={PelaporanNav} />
                    <Tab.Screen name="Buletin Berita" component={BuletinBeritaNav } />
                    <Tab.Screen name="Chat" component={ChatNav} />
                    <Tab.Screen name="Chat SOS" component={ChatSOSNav} />
                    <Tab.Screen name="Profile" component={ProfileScreen} options={{
                            tabBarButton: () => null,
                            tabBarVisible: false,
                        }} 
                    />
                </Tab.Navigator>
        
    );
}

export default MainNav;