import React, { useState, useContext } from 'react';
import { View, Text, TextInput,StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList,Pressable, Modal} from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { DataContext  } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';
import axios from 'axios';

const ReportFormStep1 = ( {navigation} ) => {

	const [modalProvVisible, setModalProvVisible] = useState(false);
	const [modalKabVisible, setModalKabVisible] = useState(false);
	const [modalKecVisible, setModalKecVisible] = useState(false);
	const [modalKelVisible, setModalKelVisible] = useState(false);

	const [prov, setProv] = useState(null);
	const [kab, setKab] = useState(null);
	const [kec, setKec] = useState();
	const [kel, setKel] = useState();

	const { token } = useContext(AuthContext);
	const { formData, updateFormData } = useContext(DataContext);

	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());

	const onDateChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setDate(currentDate);
		console.log(selectedDate);
		handleInputDate(date.toLocaleDateString())
	};

	const onTimeChange = (event, selectedDate) => {

		console.log('time change')
		const currentDate = selectedDate;
		setTime(currentDate);
		handleInputHour(time.toLocaleTimeString())
	};

	const showDateMode = (currentMode) => {
		DateTimePickerAndroid.open({
			value: date,
			display: 'spinner',
			onChange: onDateChange,
			mode: currentMode,
		});
	};

	const showTimeMode = (currentMode) => {
		DateTimePickerAndroid.open({
			value: date,
			display: 'spinner',
			onChange: onTimeChange,
			mode: currentMode,
			is24Hour: true,
		});
	};

	// Handle Showing modal Date Picker
	const showDatepicker = () => {
		showDateMode('date');
	};

	const showTimepicker = () => {
		showTimeMode('time');
	};

	// Handle Change data and time
	const handleInputDate = (value) => {
		updateFormData({ date: moment(value, 'YYYY/MM/DD').format('DD-MM-YYYY')});
	};

	const handleInputHour= (value) => {
		updateFormData({ hour: moment(value, 'HH.mm.ss').format('HH:mm')});
	};

	//Handle onChange Tempat
	const handleInputProvince = (value) => {
		updateFormData({ province_id: value });
	};

	const handleInputRegency = (value) => {
		updateFormData({ regency_id: value });
	};

	const handleInputDistrict = (value) => {
		updateFormData({ district_id: value });
	};

	const handleInputVillage = (value) => {
		updateFormData({ village_id: value });
	};

	//Handle Request Data Master
	const getDataProv = async () => {
		try {
			const url = 'http://103.176.44.189/pamsystem-api/api/regional/list/provinces?perPage=20&page=1&search='; // Replace with your API endpoint
		
			const response = await axios.get(url, {
				headers: {
					'Content-Type' : 'multipart/form-data',
					Authorization: `Bearer ${JSON.parse(token)}`,
				},
			});

			if(response){
				setProv(response.data.response.data);
				console.log('berhasil fetch data: ', prov)

			}else{
				console.log('gagal fetch data')
			}
			
		  } catch (error) {
			// Handle any errors here
			console.error(error);
		  }
	}

	const getDataKab = async () => {
		try {
			const url = `http://103.176.44.189/pamsystem-api/api/regional/list/regency/${formData.province_id}?perPage=20&page=1&search=`; // Replace with your API endpoint
		
			const response = await axios.get(url, {
				headers: {
					'Content-Type' : 'multipart/form-data',
					Authorization: `Bearer ${JSON.parse(token)}`,
				},
			});

			if(response){
				setKab(response.data.response.data);
				console.log('berhasil fetch data: ', kab)

			}else{
				console.log('gagal fetch data')
			}
			
		  } catch (error) {
			// Handle any errors here
			console.error(error);
		  }
	}

	const getDataKec = async () => {
		try {
			const url = `http://103.176.44.189/pamsystem-api/api/regional/list/district/${formData.regency_id}?perPage=20&page=1&search=`; // Replace with your API endpoint
		
			const response = await axios.get(url, {
				headers: {
					'Content-Type' : 'multipart/form-data',
					Authorization: `Bearer ${JSON.parse(token)}`,
				},
			});

			if(response){
				setKec(response.data.response.data);
				console.log('berhasil fetch data: ', kec)

			}else{
				console.log('gagal fetch data')
			}
		  } catch (error) {
			// Handle any errors here
			console.error(error);
		  }
	}

	const getDataKel = async () => {
		try {
			const url = `http://103.176.44.189/pamsystem-api/api/regional/list/villages/${formData.district_id}?perPage=20&page=1&search=`; // Replace with your API endpoint
		
			const response = await axios.get(url, {
				headers: {
					'Content-Type' : 'multipart/form-data',
					Authorization: `Bearer ${JSON.parse(token)}`,
				},
			});

			if(response){
				setKel(response.data.response.data);
				console.log('berhasil fetch data: ', kec)

			}else{
				console.log('gagal fetch data')
			}
			console.log(response.data.response.data);
		  } catch (error) {
			// Handle any errors here
			console.error(error);
		  }
	}

	const DATA = [
		{
			id: '0',
			title: 'First Item',
		},
		{
			id: '1',
			title: 'Second Item',
		},
		{
			id: '2',
			title: 'First Item',
		},
		{
			id: '3',
			title: 'Second Item',
		},
		{
			id: '4',
			title: 'First Item',
		},
		{
			id: '5',
			title: 'Second Item',
		},
		{
			id: '6',
			title: 'First Item',
		},
		{
			id: '7',
			title: 'First Item',
		},
		{
			id: '8',
			title: 'Second Item',
		},
		{
			id: '9',
			title: 'First Item',
		},
		{
			id: '10',
			title: 'Second Item',
		},
		{
			id: '11',
			title: 'First Item',
		},
		{
			id: '12',
			title: 'Second Item',
		},
		{
			id: '13',
			title: 'First Item',
		}
	];

	const ItemProv = ({ id, title }) => (
		<View style={styles.newsContainer}>
			<View style={{ flex:3, flexDirection: 'column' }}>
				<View style={styles.newsDescription}>
					<TouchableOpacity
						onPress={() => {
							handleInputProvince(id);
							setModalProvVisible(false);
						}}>
						<View style={styles.newsTitle}>
							<Text style={{ flex: 1, color: 'black',fontSize: 20, fontWeight: 'bold', textAlign: 'left', paddingBottom: 20 }}> {title}</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);

	const ItemKab = ({ id, title }) => (
		<View style={styles.newsContainer}>
			<View style={{ flex:3, flexDirection: 'column' }}>
				<View style={styles.newsDescription}>
					<TouchableOpacity
						onPress={() => {
							handleInputRegency(id)
							setModalKabVisible(false)
						}}>
						<View style={styles.newsTitle}>
							<Text style={{ flex: 1, color: 'black',fontSize: 20, fontWeight: 'bold', textAlign: 'left', paddingBottom: 20 }}> {title}</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);

	const ItemKec = ({ id, title }) => (
		<View style={styles.newsContainer}>
			<View style={{ flex:3, flexDirection: 'column' }}>
				<View style={styles.newsDescription}>
					<TouchableOpacity
						onPress={() => {
							handleInputDistrict(id)
							setModalKecVisible(false)
						}}>
						<View style={styles.newsTitle}>
							<Text style={{ flex: 1, color: 'black',fontSize: 20, fontWeight: 'bold', textAlign: 'left', paddingBottom: 20 }}> {title}</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);

	const ItemKel = ({ id, title }) => (
		<View style={styles.newsContainer}>
			<View style={{ flex:3, flexDirection: 'column' }}>
				<View style={styles.newsDescription}>
					<TouchableOpacity
						onPress={() => {
							handleInputVillage(id)
							setModalKelVisible(false)
						}}>
						<View style={styles.newsTitle}>
							<Text style={{ flex: 1, color: 'black',fontSize: 20, fontWeight: 'bold', textAlign: 'left', paddingBottom: 20 }}> {title}</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);

    return(
        <View style={styles.container}>
			<View style={{flexDirection: 'row', paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#adbcb1',}}>
				<Image
					style={{ width: 35, height: 35, marginRight: 5, tintColor: '#ffffff'}}
					source={require('../assets/Icons/title.png')}
				/>
				<Text style={{fontWeight: 'bold',fontSize: 35, color: '#ffffff'}}>Laporan</Text>
			</View>
			<Text style={styles.welcomeText}>Tambah Pelaporan</Text>
			<View>
				<Text style={styles.inputLabel}>TANGGAL</Text>
				<View style={styles.pickerContainer}>
					<TextInput 
						style={styles.input}
						editable={false}
						value={formData.date}
						onChangeText={handleInputDate}
					/>
					<TouchableOpacity onPress={showDatepicker} style={{padding: 5}}>
						<Image
							onPress={showDatepicker}
							source={require('../assets/Icons/kalender.png')}
							style={{ width: 20, height: 20, marginBottom: 17}}
						/>
					</TouchableOpacity> 
				</View>

				<Text style={styles.inputLabel}>WAKTU</Text>
				<View style={styles.pickerContainer}>
					<TextInput 
						style={styles.input}
						editable={false}
						value={formData.hour}
						onChangeText={handleInputHour}
					/>
					<TouchableOpacity onPress={showTimepicker} style={{padding: 5}}>
						<Image
							onPress={showTimepicker}
							source={require('../assets/Icons/kalender.png')}
							style={{ width: 20, height: 20, marginBottom: 17}}
						/>
					</TouchableOpacity> 
				</View>

				<Text style={styles.inputLabel}>TEMPAT</Text>
				
				<View style={styles.pickerContainer}>
					<TextInput
						editable={false} 
						style={styles.input}
						placeholder='Provinsi'
						value={formData.province_id}
						onChangeText={handleInputProvince}
					/>
					<TouchableOpacity
						onPress={() => {
							setModalProvVisible(true)
							getDataProv();
						} } 
						style={{padding: 5}}>
						<Image
							source={require('../assets/Icons/dropdown.png')}
							style={{ width: 13, height: 13, marginBottom: 17}}
						/>
					</TouchableOpacity> 
				</View>
				<View style={styles.pickerContainer}>
					<TextInput
						editable={false} 
						style={styles.input}
						placeholder='Kabupaten/Kota'
						value={formData.regency_id}
						onChangeText={handleInputRegency}
					/>
					<TouchableOpacity o
						onPress={() => {
							setModalKabVisible(true)
							getDataKab();
						}} 
						style={{padding: 5}}>
						<Image
							source={require('../assets/Icons/dropdown.png')}
							style={{ width: 13, height: 13, marginBottom: 17}}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.pickerContainer}>
					<TextInput
						editable={false} 
						style={styles.input}
						placeholder='Kecamatan'
						value={formData.district_id}
						onChangeText={handleInputDistrict}
					/>
					<TouchableOpacity 
						onPress={() => {
							setModalKecVisible(true)
							getDataKec()
						}} 
						style={{padding: 5}}>
						<Image
							source={require('../assets/Icons/dropdown.png')}
							style={{ width: 13, height: 13, marginBottom: 17}}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.pickerContainer}>
					<TextInput
						editable={false} 
						style={styles.input}
						placeholder='Kelurahan/Desa'
						value={formData.village_id}
						onChangeText={handleInputVillage}
					/>
					<TouchableOpacity 
						onPress={() => {
							setModalKelVisible(true)
							getDataKel()
						}} 
						style={{padding: 5}}>
						<Image
							source={require('../assets/Icons/dropdown.png')}
							style={{ width: 13, height: 13, marginBottom: 17}}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.buttonContainer}>
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
						<Text style={styles.buttonText}>LANJUT</Text>
					</TouchableOpacity>
            	</View>
				<View style={{marginTop: 20}}>
					<View style={styles.centeredView}>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalProvVisible}
							onRequestClose={() => {
								alert('Modal has been closed.');
								setModalProvVisible(!modalProvVisible);
							}}>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<Text style={styles.modalText}>Cari Provinsi</Text>
									<SafeAreaView style={styles.newsListContainer}>
										<FlatList
											data={prov}
											renderItem={({ item }) => <ItemProv id={item.code} title={item.name} />}
											keyExtractor={item => item.code}
										/>
									</SafeAreaView >
								</View>
							</View>
						</Modal>
					</View>
				</View>

				<View style={{marginTop: 20}}>
					<View style={styles.centeredView}>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalKabVisible}
							onRequestClose={() => {
								alert('Modal has been closed.');
								setModalKabVisible(!modalKabVisible);
							}}>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<Text style={styles.modalText}>Cari Kabupaten/Kota</Text>
									<SafeAreaView style={styles.newsListContainer}>
										<FlatList
											data={kab}
											renderItem={({ item }) => <ItemKab id={item.code} title={item.name} />}
											keyExtractor={item => item.code}
										/>
									</SafeAreaView >
								</View>
							</View>
						</Modal>
					</View>
				</View>

				<View style={{marginTop: 20}}>
					<View style={styles.centeredView}>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalKecVisible}
							onRequestClose={() => {
								alert('Modal has been closed.');
								setModalKecVisible(!modalKecVisible);
							}}>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<Text style={styles.modalText}>Cari Kecamatan</Text>
									<SafeAreaView style={styles.newsListContainer}>
										<FlatList
											data={kec}
											renderItem={({ item }) => <ItemKec id={item.code} title={item.name} />}
											keyExtractor={item => item.code}
										/>
									</SafeAreaView >
								</View>
							</View>
						</Modal>
					</View>
				</View>

				<View style={{marginTop: 20}}>
					<View style={styles.centeredView}>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalKelVisible}
							onRequestClose={() => {
								alert('Modal has been closed.');
								setModalKelVisible(!modalKelVisible);
							}}>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<Text style={styles.modalText}>Cari Kelurahan/Desa</Text>
									<SafeAreaView style={styles.newsListContainer}>
										<FlatList
											data={kel}
											renderItem={({ item }) => <ItemKel id={item.code} title={item.name} />}
											keyExtractor={item => item.id}
										/>
									</SafeAreaView >
								</View>
							</View>
						</Modal>
					</View>
				</View>
			</View>
		</View>
    );
};

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
		fontSize: 20,
		color: '#ffffff',
		paddingTop: 10,
		marginBottom: 30
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	btn: {
		flex: 1,
		backgroundColor: '#00cea6',
		justifyContent: 'center',
		paddingHorizontal: 28,
		paddingVertical: 10,
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
    textArea: {
        width: '100%',
        borderColor: '#00cea6',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 12,
        paddingHorizontal: 10,
        color: 'white',
    },
    input: {
		width: '100%',
		flex: 1,
		borderBottomWidth: 1,
		borderColor: '#00cea6',
		height: 40,
		color: 'white',
		marginBottom: 20
    },
	pickerContainer: {
		flexDirection: 'row', 
		alignItems: 'center' 
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 300,
	  },
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 5,
		width: '100%',
		height: '100%',
		padding: 30,
		shadowColor: '#000',
		shadowOffset: {
		  width: 0,
		  height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
 	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
	},
	modalText: {
		marginBottom: 15,
		borderBottomWidth: 2,
		borderBottomColor: 'black',
		paddingBottom: 10,
		fontWeight: 'bold',
		fontSize: 20,
		color: 'black'
	},
});

export default ReportFormStep1;