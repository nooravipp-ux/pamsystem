import React, { useState } from 'react';
import { View, Button, Text, TextInput,StyleSheet, TouchableOpacity, Image, Pressable, InputAccessoryView} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const ReportFormStep1 = ( {navigation} ) => {
	const [tanggal, setTanggal] = useState('');
	const [waktu, setWaktu] = useState('');

	const [provinsi, setProvinsi] = useState('');
	const [kabKota, setKabKota] = useState('');
	const [kecamatan, setKecamatan] = useState('');
	const [kelDesa, setKelDesa] = useState('');
	const [alamat, setAlamat] = useState('');

	const [date, setDate] = useState(new Date());

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setDate(currentDate);
		setTanggal(date.toLocaleDateString())
		setWaktu(date.toLocaleTimeString())
	};

	const showMode = (currentMode) => {
		DateTimePickerAndroid.open({
			value: date,
			display: 'spinner',
			onChange,
			mode: currentMode,
			is24Hour: true,
		});
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');
	};


	let data = [{
		value: 'Sosial Budaya',
	}]

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
						value={tanggal}
					/>
					<TouchableOpacity onPress={showDatepicker} style={{padding: 5}}>
						<Image
							onPress={showDatepicker}
							source={require('../assets/Icons/kalender.png')}
							style={{ width: 20, height: 20}}
						/>
					</TouchableOpacity> 
				</View>

				<Text style={styles.inputLabel}>WAKTU</Text>
				<View style={styles.pickerContainer}>
					<TextInput 
						style={styles.input}
						editable={false}
						value={waktu}
					/>
					<TouchableOpacity onPress={showTimepicker} style={{padding: 5}}>
						<Image
							onPress={showDatepicker}
							source={require('../assets/Icons/kalender.png')}
							style={{ width: 20, height: 20}}
						/>
					</TouchableOpacity> 
				</View>

				<Text style={styles.inputLabel}>TEMPAT</Text>
				<SelectList 
					setSelected={(val) => setProvinsi(val)} 
					data={data} 
					save="value"
					placeholder= 'Provinsi'
					boxStyles={{borderRadius:0, borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0,borderBottomColor: '#00cea6'}}
				/>

				<SelectList 
					setSelected={(val) => setKecamatan(val)} 
					data={data} 
					save="value"
					placeholder= 'Kabupaten / Kota'
					boxStyles={{borderRadius:0, borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0,borderBottomColor: '#00cea6'}}
				/>

				<SelectList 
					setSelected={(val) => setKecamatan(val)} 
					data={data} 
					save="value"
					placeholder= 'Kecamatan'
					boxStyles={{borderRadius:0, borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0,borderBottomColor: '#00cea6'}}
				/>

				<SelectList 
					setSelected={(val) => setKelDesa(val)} 
					data={data} 
					save="value"
					placeholder= 'Kelurahan / Desa'
					boxStyles={{borderRadius:0, borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0,borderBottomColor: '#00cea6', marginBottom: 15}}
				/>
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
		marginBottom: 20
    },
	pickerContainer: {
		flexDirection: 'row', 
		alignItems: 'center' 
	}
});

export default ReportFormStep1;