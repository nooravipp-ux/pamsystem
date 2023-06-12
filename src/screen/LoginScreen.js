import React, { useState, useContext, useEffect }  from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, ActivityIndicator} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [imei, setImei] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { setToken, setUserInfo } = useContext(AuthContext);

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
            console.log(res.data)
            if(data.status == 200 && data.result == true){
                setToken(JSON.stringify(res.data.response.token));
                setUserInfo(JSON.stringify(res.data.response.data));
                navigation.navigate('MainNav', { screen: 'Dashboard' });
                setIsLoading(false);
            }else{
                alert(data.message);
                setIsLoading(false)
            }
        })
        .catch(error => {
            console.log(error)
        })
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
                    secureTextEntry={true}
                    onChangeText={ (text) => setPassword(text)}
                    value={password}
                />
                <TouchableOpacity 
                    style={styles.buttonContainer} 
                    // onPress={() => login(username, password, imei)}
                    onPress={() => {
                        setIsLoading(true)
                        handleLogin()
                    }}
                >
                    {isLoading ? (<ActivityIndicator size="small" color="#ffff" />) : (<Text style={styles.buttonText}>LOGIN</Text>)}
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