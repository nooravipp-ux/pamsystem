import React, { useEffect } from 'react';
import { Image, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            handleGetToken();
        }, 3000);
    });

    const handleGetToken = async () => {
        const dataToken = await AsyncStorage.getItem('token');
        if(!dataToken){
            navigation.replace('Login');
        }else{
            navigation.replace('MainNav');
        }
    };

    return(
        <ImageBackground source={ require('../assets/Images/camouflage.png') } style={ styles.imgBackground }>
            <Image
				style={styles.logo}
				source={require('../assets/Icons/splash-logo.png')}
			/>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imgBackground: {
        flex: 1,
        resizeMode: 'over',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 250,
        height: 85
    }
});

export default SplashScreen;
