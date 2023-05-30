import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import { DataContext  } from '../context/DataContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function ReportFormStep3({ navigation }) {
	const [imageCamera, setImageCamera] = useState(null);
	const [imageGalery, setImageGalery] = useState(null);

	const { token } = useContext(AuthContext);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const { formData, updateFormData } = useContext(DataContext);

	const { userInfo } = useContext(AuthContext);
	const user = JSON.parse(userInfo);

	const handleImgCamera = (value1, value2, value3) => {
		updateFormData({ file: value1 });
		updateFormData({ user_id: value2 });
		updateFormData({ kodam_id: value3 });
	};

	const cleanFormData = () => {
		updateFormData({ date: "" });
		updateFormData({ hour: "" });
		updateFormData({ title: "" });
		updateFormData({ province_id: "" });
		updateFormData({ regency_id: "" });
		updateFormData({ district_id: "" });
		updateFormData({ village_id: "" });
		updateFormData({ desc: "" });
		updateFormData({ keterangan: "" });
		updateFormData({ file: []});
		updateFormData({ user_id: "" });
		updateFormData({ kodam_id: "" });
	}

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

	const requestExternalWritePermission = async () => {
		if (Platform.OS === 'android') {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
				{
					title: 'External Storage Write Permission',
					message: 'App needs write permission',
				},
				);
				// If WRITE_EXTERNAL_STORAGE Permission is granted
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} catch (err) {
				console.warn(err);
				alert('Write permission err', err);
			}
			return false;
			} else return true;
	  };
	
	const captureImage = async () => {
		let options = {
			mediaType: 'photo', 
			quality: 1,
			includeBase64: true
		
			
		};
		
		let isCameraPermitted = await requestCameraPermission();

		if (isCameraPermitted) {
			launchCamera(options, (response) => {
				// console.log('Response = ', response);
		
				if (response.didCancel) {
					alert('User cancelled camera picker');
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
					console.log(data)
					setImageCamera(data);
					handleImgCamera(response.assets, user.id, user.id)
				}
			});
		}
	};	

	function openGalery() {
		let options = {
			mediaType: 'photo', 
			quality: 1
		};

		launchImageLibrary(options, (response) => {
			console.log('Response = ', response);
	
			if (response.didCancel) {
				alert('User cancelled camera picker');
				return;
			}if (response.errorCode == 'camera_unavailable') {
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
				setImageGalery(data, formData.user_id, formData.kodam_id);
				console.log(data);
			}
		});
	}

	const handlePressSubmit = () => {
		setIsModalVisible(true);
	};
	
	const handleCancel = () => {
		setIsModalVisible(false);
	};
	
	const handleConfirm = () => {
		// Lakukan tindakan setelah pengguna mengonfirmasi
		// Post Data ke server
		// close modal dan kembali ke halaman list pelaporan
		setIsModalVisible(false);
		console.log(formData)
		// navigation.navigate('ReportScreen');
		postData();
		navigation.navigate('ReportScreen');
		cleanFormData();
	};

	const postData = async () => {
		try {
			const response = await axios.post('http://103.176.44.189/pamsystem-api/api/reports/insert', formData, {
				headers: {
					'Content-Type' : 'multipart/form-data',
					Authorization: `Bearer ${JSON.parse(token)}`,
				},
			});

			console.log('Upload Response : ', response.data);
		} catch(error){
			console.log('Error sending data : ', error);
		}
	}


	const ConfirmationModal = ({ visible, onCancel, onConfirm }) => {
		return (
		  <Modal
			visible={visible}
			animationType="fade"
			transparent={true}
			onRequestClose={onCancel}
		  >
			<View style={styles.modalContainer}>
			  <View style={styles.modalContent}>
				<Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>Apakah Anda Ingin Menyelesaikan Laporan ?</Text>
				<View style={{}}>
					<TouchableOpacity
						style={{backgroundColor: '#00cea6', paddingVertical: 17, marginTop: 30, marginBottom: 10}}
						onPress={handleConfirm}
					>
					<Text style={styles.buttonText}>SIMPAN & KIRIM</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{borderWidth: 1, borderColor: '#00cea6', paddingVertical: 17}}
						onPress={handleCancel}
					>
					<Text style={{color: 'black', textAlign: 'center'}}>KEMBALI</Text>
					</TouchableOpacity>
				</View>
			  </View>
			</View>
		  </Modal>
		);
	};

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#adbcb1',}}>
				<Image
					style={{ width: 35, height: 35, marginRight: 5, tintColor: '#ffffff'}}
					source={require('../assets/Icons/title.png')}
				/>
				<Text style={{fontWeight: 'bold',fontSize: 35, color: '#ffffff'}}>Laporan</Text>
			</View>
            <Text style={styles.welcomeText}>Tambah Pelaporan</Text>
            <Text style={styles.inputLabel}>FOTO, VIDEO, DOKUMEN</Text>
			<TouchableOpacity 
                onPress={ () => captureImage() } 
                style={styles.btnPicker}
            >
            	<Text style={styles.buttonText}>AMBIL FOTO</Text>
            </TouchableOpacity>

            <TouchableOpacity 
				onPress={ () => openGalery() }
				style={styles.btnPicker}
			>
              	<Text style={styles.buttonText}>AMBIL DATA DARI PONSEL</Text>
            </TouchableOpacity>
			{imageCamera !== null ? (
                <>
                    <Image
						source={{ uri:imageCamera.uri }}
						style={styles.profileImage}
			  		/>
                </>
                ) : (
                <>
                    <Image
						source={require('../assets/Icons/avatar.png')}
						style={styles.profileImage}
					/>
                </>
            )}
           
            <Text style={{ alignItems: 'center' }}></Text>
			<ConfirmationModal
				visible={isModalVisible}
				onCancel={handleCancel}
				onConfirm={handleConfirm}
			/>
            
            <View style={styles.btnContainer}>
				<TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate('ReportScreen')}
                >
                  <Text style={styles.buttonText}>BATAL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate('ReportFormStep2')}
                >
                  <Text style={styles.buttonText}>KEMBALI</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => handlePressSubmit()}
                >
                  <Text style={styles.buttonText}>SIMPAN & KIRIM</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: '#29352e'
	},
	heading: {
		fontWeight: 'bold',
		fontSize: 35,
		color: '#ffffff',
		paddingBottom: 5,
		borderBottomWidth: 1,
		borderBottomColor: '#adbcb1',
	},
	welcomeText: {
		fontWeight: 'bold',
		fontSize: 25,
		color: '#ffffff',
		paddingTop: 10,
		marginBottom: 30
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	btnPicker : {
		backgroundColor: '#00cea6',
		paddingHorizontal: 20,
    	paddingVertical: 20,
		marginVertical: 5,
		borderRadius: 5
	},
	btn: {
		flex: 1,
		backgroundColor: '#00cea6',
		justifyContent: 'center',
		paddingHorizontal: 28,
		paddingVertical: 12,
		marginHorizontal: 5,
		borderRadius: 2,
		marginTop: 12,
		height: 50,
	},
	buttonText: {
		textAlign: 'center',
		color: '#ffff',
		fontWeight: '700',
	},
	inputLabel: {
		color: '#00cea6',
		fontSize: 15,
		fontWeight: 'bold',
		paddingBottom: 5
	},
	profileImage: {
		width: '100%',
		height: '50%',
		borderRadius: 5,
		borderWidth: 2,
		marginRight: 8,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 2,
	},
	buttonContainer: {
		marginTop: 20,
		padding: 50
	},
});

export default ReportFormStep3;
