import React, { useState, useContext } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native'; 
import { BASE_URL } from '../../config/Config';
import { AuthContext } from '../../context/AuthContext';
import { launchCamera } from 'react-native-image-picker';
import Exif from 'react-native-exif';
import axios from 'axios';

const ProfileScreen = ({navigation}) => {
    const [imageCamera, setImageCamera] = useState(null);
	const { token, setUserInfo, userInfo } = useContext(AuthContext);

	const user = JSON.parse(userInfo);

    const requestCameraPermission = async () => {
		if (Platform.OS === 'android') {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.CAMERA, 
					{
						title: 'Camera Permission',
						message: 'App needs camera permission',
					},
				);
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} catch (err) {
				console.warn(err)
				return false;
			}
		} else return true;
	}

    const captureImage = async () => {
		let options = {
			mediaType: 'photo', 
			quality: 0.5,
		};
		
		let isCameraPermitted = await requestCameraPermission();

		if (isCameraPermitted) {
			launchCamera(options, (response) => {		
				if (response.didCancel) {
					return;
				} else if (response.errorCode == 'camera_unavailable') {
					alert('Camera not available on device');
					return;
				} else if (response.errorCode == 'permission') {
					alert('Permission not satisfied');
					return;
				} else if (response.errorCode == 'others') {
					alert(response.errorMessage);
				    return;
				} else {
					const data = response.assets[0];
					if(data.fileSize < 2000000){
						console.log(data);
						setImageCamera(data);
					}else{
						setImageCamera(null);
						alert('Foto / Gambar harus kurang atau sama dengan 2 MB !')
					}
				}
			});
		}
	};

	const fixImageOrientation = async (imageUri) => {
		try {
			const exifData = await Exif.getExif(imageUri);
			const orientation = exifData.orientation;
			const fixedImageUri = await Exif.rotate(imageUri, orientation);

			return fixedImageUri;
		} catch(error) {
			console.log('Error', error)
			return imageUri;
		}
	}

	const updateProfile = async () => {
		let payload = new FormData();

		// console.log("Image After fixed: ", fixImageOrientation(imageCamera.uri));
		payload.append("file", {
			uri: imageCamera.uri,
			type: imageCamera.type,
			name: imageCamera.fileName
		});
		
        try {
			const response = await axios.post(`${BASE_URL}/user/update`, payload,
            {
				headers: {
                    "Content-Type" : "multipart/form-data",
					Authorization: `Bearer ${JSON.parse(token)}`,
				},
			});

			console.log(response.data.response);
			setUserInfo(JSON.stringify(response.data.response));
			navigation.navigate('Dashboard');
			setImageCamera(null);
		} catch (error) {
			console.error(error);
		}
	}

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}> 
                {imageCamera !== null ? (
						<>
							<Image
								source={{ uri:imageCamera.uri }}
								style={styles.img}
							/>
						</>
						) : (
						<>
							<Image
								source={require('../../assets/Icons/avatar.png')}
								style={styles.img}
							/>
						</>
				)}
                <Text style={styles.text}>Silahkan ambil gambar swafoto anda untuk melanjutkan</Text>
                <TouchableOpacity 
                    onPress={ () => captureImage() }
                    style={styles.button}>
                    <Text style={styles.btnText}>AKTIFKAN KAMERA</Text>
                </TouchableOpacity>
				{imageCamera !== null ? (
						<TouchableOpacity 
							onPress={ () => updateProfile() }
							style={styles.buttonSimpan}>
							<Text style={styles.btnText}>SIMPAN PERUBAHAN</Text>
						</TouchableOpacity>
						) : (
						<>
						</>
				)}
            </View>
		</View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: '#29352e',
	},
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    img: {
        width: 250,
        height: 250, 
        borderWidth: 2, 
        borderColor: '#00cea6', 
        borderRadius: 5
    },
    text: {
        color: '#00cea6',
        marginTop: 20,
        fontWeight: 'bold'
    },
    button: {
		backgroundColor: '#00cea6',
		justifyContent: 'center',
		paddingHorizontal: 70,
		borderRadius: 2,
		marginTop: 50,
		height: 50,
    },
	buttonSimpan: {
		backgroundColor: '#00cea6',
		justifyContent: 'center',
		paddingHorizontal: 65,
		borderRadius: 2,
		marginTop: 10,
		height: 50,
	},
    btnText: {
        textAlign: 'center',
		color: '#ffff',
		fontWeight: '700',
    }

});

export default ProfileScreen;