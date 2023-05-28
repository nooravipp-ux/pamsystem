import React, { useState }  from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [imei, setImei] = useState('');

    DeviceInfo.getAndroidId().then((uniqueId) => {
        console.log(uniqueId);
        setImei(uniqueId);
    });

    const handleLogin = async () => {
		await axios.post('http://103.176.44.189/pamsystem-api/api/authentication/login', {
            username: username,
            password: password,
            imei: imei,
        })
        .then(res => {
            let data = res.data;
            console.log('Status : ', data.status);
            console.log('Message: ', data.message);
            console.log('Data: ', data.response.data);
            console.log('Token: ', data.response.token);

            if(data.status == 200 && data.result == true){
                alert(data.message)
                AsyncStorage.setItem("token", JSON.stringify(data.response));
                setTokenState(JSON.stringify(data.response));

                // navigation.navigate('Dashboard');
            }else{
                alert('Login Gagal')
            }
        })
        .catch( error => {
            alert(error)
        })
        // navigation.replace('Dashboard');
	};

    return(
        <ImageBackground source={ require('../assets/Images/camouflage-optional.png') } style={ styles.imgBackground }>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    placeholderTextColor='white'
                    onChangeText={ (text) => setUsername(text)}
                    value={username}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    placeholderTextColor='white'
                    secureTextEntryrepla
                    onChangeText={ (text) => setPassword(text)}
                    value={password}
                />
                <TouchableOpacity 
                    style={styles.buttonContainer} 
                    onPress={() => handleLogin()}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 400,
        padding: 40,
    },
    imgBackground: {
        flex: 1,
        resizeMode: 'over',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#00cea6',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 12,
        paddingHorizontal: 10,
        color: 'white',
    },
    buttonContainer: {
        backgroundColor: '#00cea6',
        paddingVertical: 15,
        borderRadius: 2,
        width: '100%',
        marginTop: 30,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700',
    }
});

export default LoginScreen;