import React, { useState, useContext } from 'react';
import { View, Text, TextInput,StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { DataContext  } from '../context/DataContext';

const ReportFormStep2 = ( {navigation} ) => {
	const { formData, updateFormData } = useContext(DataContext);

	const handleInputUraianKejadian = (value) => {
		updateFormData({ desc: value });
	};

	const handleInputTindakan = (value) => {
		updateFormData({ keterangan: value });
	};

    return(
        <SafeAreaView style={styles.container}>
			<View style={{flexDirection: 'row', paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#adbcb1',}}>
				<Image
					style={{ width: 35, height: 35, marginRight: 5, tintColor: '#ffffff'}}
					source={require('../assets/Icons/title.png')}
				/>
				<Text style={{fontWeight: 'bold',fontSize: 35, color: '#ffffff'}}>Laporan</Text>
			</View>
			<Text style={styles.welcomeText}>Tambah Pelaporan</Text>
			<ScrollView>
				<Text style={styles.inputLabel}>URAIAN KEJADIAN</Text>
				<TextInput
					style={styles.textArea}
					value={formData.desc}
					onChangeText={handleInputUraianKejadian}
					multiline={true}
					numberOfLines={4}
				/>
				<Text style={styles.inputLabel}>KETERANGAN / TINDAKAN</Text>
				<TextInput
					style={styles.textArea}
					value={formData.keterangan}
					onChangeText={handleInputTindakan}
					multiline={true}
					numberOfLines={4}
				/>
			</ScrollView>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate('ReportScreen')}
                >
                  <Text style={styles.buttonText}>BATAL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate('ReportFormStep1')}
                >
                  <Text style={styles.buttonText}>KEMBALI</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate('ReportFormStep3')}
                >
                  <Text style={styles.buttonText}>LANJUT</Text>
                </TouchableOpacity>
            </View>
		</SafeAreaView>
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
		fontSize: 25,
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
    input: {
        width: '100%',
        height: 40,
        borderColor: '#00cea6',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 12,
        paddingHorizontal: 10,
        color: 'white',
    },
	textArea: {
        width: '100%',
        height: 150,
        borderColor: '#00cea6',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 12,
        paddingHorizontal: 10,
        color: 'white',
		textAlignVertical: 'top', 
		marginBottom: 30
    },
	selectBox: {
		borderBottomWidth: 0,
		paddingBottom: 10,
	},

});

export default ReportFormStep2;