import React, { useState, useEffect, useContext} from 'react';
import { View, Text, Image, StyleSheet,ScrollView } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Loading } from '../components/Loading';

const ReportDetailScreen = ({route}) => {
    const { token } = useContext(AuthContext);
    const [report, setReport] = useState(null);

    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [desc, setDesc] = useState();
    const [keterangan, setKeterangan] = useState();
    const [province, setProvince] = useState();
    const [regency, setRegency] = useState();
    const [district, setDistrict] = useState();
    const [village, setVillage] = useState();

	useEffect(() => {
		console.log('Token :', token);

        const { reportId } = route.params;

        console.log('Report Id :', reportId);

		const getReportById = async () => {
			try {
				const response = await axios.get(`http://103.176.44.189/pamsystem-api/api/reports/26`, {
					headers: {
						Authorization: `Bearer ${JSON.parse(token)}`,
					},
				});

                console.log(response.data.response);
				if(response){
					setReport(response.data.response);

                    setDate(response.data.response.date);
                    setHour(response.data.response.hour);
                    setDesc(response.data.response.desc);
                    setKeterangan(response.data.response.keterangan);
                    setProvince(response.data.response.province_id);
                    setRegency(response.data.response.regency_id);
                    setDistrict(response.data.response.district_id);
                    setVillage(response.data.response.village_id);

					console.log('berhasil fetch data: ', report)
	
				}else{
					console.log('gagal fetch data')
				}
			} catch (error) {
				console.error(error);
			}				
		}

		getReportById();
	}, []);

	return (
		<View style={styles.container}>
			<View style={{flexDirection: 'row', paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#adbcb1',}}>
				<Image
					style={{ width: 35, height: 35, marginRight: 5, tintColor: '#ffffff'}}
					source={require('../assets/Icons/title.png')}
				/>
				<Text style={{fontWeight: 'bold',fontSize: 35, color: '#ffffff'}}>Pelaporan</Text>
			</View>
			<Text style={styles.welcomeText}>Lihat Pelaporan</Text>
			<ScrollView style={styles.newsListContainer}>
				<View style={{backgroundColor: '#00cea6', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30, padding: 5}}>
                    <Text style={{fontSize: 20, color:'#ffffff', fontWeight:'bold', padding: 6}}>PELAPORAN</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, padding: 5}}>
                    <Text style={{flex: 1, color:'black', fontSize: 10, fontWeight:'bold', padding: 6}}>15 April 2023 | 09:32</Text>
                    <Text style={{flex:1, color:'black', fontSize: 10, fontWeight:'bold', padding: 6}}>Desa Lombuk, Kec. Tingginambut, KabPuncak Jaya, Papua</Text>
                </View>
                <View style={{flex: 1, marginTop: 25, padding: 5}}>
                    <Text style={{flex: 1, color:'#ffffff', backgroundColor: '#00cea6', fontSize: 10, fontWeight:'bold', padding: 6}}>URAIAN KEJADIAN</Text>
                    <Text style={{flex: 1, color:'black', fontSize: 10, padding: 6}}>
                        Telah terjadi penembakan yang dilakukan oleh anggota KKBpada 2 pengendara objek di Desa Lombok, mengakibatkan salah satunya meninggal dunia.
                    </Text>
                    <Text style={{flex: 1, color:'black', fontSize: 10, padding: 6}}>
                        Saat perjalanan pulang setelah mengantarkan penumpangnya, kedua korban hendak kembali ke Mulia melalui Tingginambut.Lalu di tengah perjalanan mereka dicegatdan di tembak oleh anggota KKB.
                    </Text>
                </View>

                <View style={{flex: 1, marginTop: 25, padding: 5}}>
                    <Text style={{flex: 1, color:'#ffffff', backgroundColor: '#00cea6', fontSize: 10, fontWeight:'bold', padding: 6}}>KETERANGAN / TINDAKAN</Text>
                    <Text style={{flex: 1, color:'black', fontSize: 10, padding: 6}}>
                        Dua korban tersebut yaitu Soleno Lolo (37 Thn) tertembak pada bagian dada saat ini kondisinya masih kritis dan sudah dilarikan ke RSUD Mulia, sedangkan rekannya Sauku Dg Paewa (53 Thn) tertembak di bagian kepala langsung meninggal di tempat dan sedang dilarikan ke rumah duka.
                    </Text>
                    <Text style={{flex: 1, color:'black', fontSize: 10, padding: 6}}>
                        Saat ini anggota kami masih mencari petunjuk melalui saksi di TKP untuk mendalami asal dari kelompok KKB tersebut.
                    </Text>
                </View>

                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, padding: 5}}>
                    <Image style={styles.imgContainer} source={require('../assets/Images/banner.jpg')} />
                    <Image style={styles.imgContainer} source={require('../assets/Images/banner.jpg')} />
                </View>
			</ScrollView>
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
		fontSize: 26,
		color: '#ffffff',
		paddingTop: 10,
		paddingBottom: 10,
	},
	newsListContainer: {
		borderRadius: 3,
		backgroundColor: '#ffffff',
		marginTop: 10,
		marginBottom: 10,
	},
	newsContainer: {
		flexDirection: 'row',
		padding: 8
	},
	imgContainer: {
		width: 160,
		height: 160,
		alignItems: 'stretch',
        margin: 5
	},
	newsDescription: {
		flexDirection: 'row', 
		justifyContent: 'space-between',
		paddingLeft: 7
	},
	newsTitle: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingLeft: 7,
		paddingTop: 5,
	},

});

export default ReportDetailScreen;