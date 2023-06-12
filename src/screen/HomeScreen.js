import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';
import { BASE_URL, BASE_IMG_URL } from '../config/Config';

const HomeScreen = ({ navigation }) => {
	const { userInfo } = useContext(AuthContext);
	const { token } = useContext(AuthContext);
	const [reports, setReports] = useState(null);
	const [news, setNews] = useState(null);
	const [ reportRefreshing, setReportRefreshing]  = useState(false);
	const [ newsRefreshing, setNewsRefreshing]  = useState(false);

	const user = JSON.parse(userInfo);


	useEffect(() => {
		const interval = setInterval(() => {
			getNews();
			getReports();
			console.log('Data User: ', user);
			}, 10000);	
		return() => {
			clearInterval(interval);
		}

	}, []);

	const getReports = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/reports?perPage=2&page=1&search=&orderBy=created_at&sortBy=desc`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(token)}`,
				},
			});

			if(response){
				setReports(response.data.response.data);
			}else{
				console.log('gagal fetch data')
			}
		} catch (error) {
			console.error(error);
		}				
	}

	const getNews = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/news?perPage=2&page=1&search=&orderBy=date&sortBy=desc`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(token)}`,
				},
			});

			if(response){
				setNews(response.data.response.data);
			}else{
				console.log('gagal fetch data')
			}
		} catch (error) {
			console.error(error);
		}				
	}

	const handleNewsRefresh = () => {
		if (newsRefreshing) return;
	  
		setNewsRefreshing(true);
		getNews();
	 };

	 const handleReportRefresh = () => {
		if (reportRefreshing) return;

		setReportRefreshing(true);
		getReports();
	 }

	const Item = ({ id, desc, date , hour, image}) => (
		<View
			style={styles.newsContainer}
			// onPress={() => {
			// 	navigation.navigate('Pelaporan', { 
			// 		screen: 'ReportDetailScreen',
			// 		params: { reportId: id } 
			// 	});
			// }}
		>
			{image !== undefined ? 
				<Image
					style={styles.newsImage}
					source={{ uri: `${BASE_IMG_URL}${image.file}` }}
				/>
				:
				<Image
					style={styles.newsImage}
					source={require('../assets/Icons/kamera.png')}
				/>
			}
			<View style={{ flex:3, flexDirection: 'column' }}>
				<View style={styles.newsDescription}>
					<Text style={{ flex: 1, color: '#ffffff' }}>{moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY')}</Text>
						<Text style={{ color: '#ffffff'}}>{hour.substring(0, 5)}</Text>
					</View>
					<View style={styles.newsTitle}>
						<Text style={{ flex: 1, color: '#ffffff', fontWeight: 'bold', textAlign: 'left' }}>{desc.substring(0, 120)} ... </Text>
					</View>
			</View>
		</View>
	);
	
	const NewsItem = ({ id, title, date , hour, image}) => (
		<View
			style={styles.newsContainer}
			// onPress={() => {
			// 	navigation.navigate('Buletin Berita', { 
			// 		screen: 'NewsDetailScreen',
			// 		params: { newsId: id } 
			// 	});
			// }}
		>
			{image !== undefined ? 
				<Image
					style={styles.newsImage}
					source={{ uri: `${BASE_IMG_URL}${image.file}` }}
				/>
				:
				<Image
					style={styles.newsImage}
					source={require('../assets/Icons/kamera.png')}
				/>
			}
			<View style={{ flex:3, flexDirection: 'column' }}>
				<View style={styles.newsDescription}>
					<Text style={{ flex: 1, color: '#ffffff' }}>{moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY')}</Text>
						<Text style={{ color: '#ffffff'}}>Oleh: Admin</Text>
					</View>
					<View style={styles.newsTitle}>
						<Text style={{ flex: 1, color: '#ffffff', fontWeight: 'bold', textAlign: 'left' }}>{title}</Text>
					</View>
			</View>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={{flexDirection: 'row', paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#adbcb1',}}>
				<Image
					style={{ width: 35, height: 35, marginRight: 5, tintColor: '#ffffff'}}
					source={require('../assets/Icons/title.png')}
				/>
				<Text style={{fontWeight: 'bold',fontSize: 35, color: '#ffffff'}}>Dashboard</Text>
			</View>
			<Text style={styles.welcomeText}>Selamat Datang</Text>
				<View style={styles.profileContainer}>
					<TouchableOpacity 
						onPress={ () => {
							navigation.navigate('Profile');
						}}
					>
						{user? 
							<Image
								style={styles.profileImage}
								source={{ uri: `${BASE_IMG_URL}${user.avatar}` }}
							/>
							:
							<Image
								style={styles.profileImage}
								source={require('../assets/Icons/kamera.png')}
							/>
						}
					</TouchableOpacity>
					<View style={styles.profileName}>
						<Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 25 }}>{ user ? user.name : '' }</Text>
						<Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 15 }}>Kodam { user ? user.kodam_name : '' }</Text>
						<Text style={{ color: '#00cea6', fontSize: 15 }}>{user ? user.regency_name : '' }</Text>
					</View>
				</View>
				<SafeAreaView style={styles.newsListContainer}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#00826e', padding: 8, borderTopRightRadius: 3, borderTopLeftRadius: 3 }}>
						<Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>BULETIN BERITA</Text>
						<TouchableOpacity
							onPress={() => navigation.navigate('Buletin Berita')}
						>
							<Text style={{ fontSize: 17, color: 'black'  }}>Lihat Semua </Text>
						</TouchableOpacity>
					</View>
					<FlatList
						data={news}
						renderItem={({ item }) => <NewsItem id={item.id} title={item.title} date={item.date} hour={item.hour} image={item.photos[0]} />}
						keyExtractor={item => item.id}
					/>
				</SafeAreaView>
				<SafeAreaView style={styles.newsListContainer}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#00826e', padding: 8, borderTopRightRadius: 3, borderTopLeftRadius: 3 }}>
						<Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>PELAPORAN</Text>
						<TouchableOpacity
							onPress={() => navigation.navigate('Pelaporan')}
						>
							<Text style={{ fontSize: 17, color: 'black'  }}>Lihat Semua </Text>
						</TouchableOpacity>
					</View>
					<FlatList
						data={reports}
						renderItem={({ item }) => <Item id={item.id} desc={item.desc} date={item.date} hour={item.hour} image={item.photos[0]} />}
						keyExtractor={item => item.id}
					/>
				</SafeAreaView>
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
		fontSize: 25,
		color: '#00cea6',
		paddingTop: 10,
		paddingBottom: 10,
	},
	profileContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 20,
		marginBottom: 16,
		borderBottomWidth: 2,
		borderBottomColor: '#00cea6',
	},
	profileImage: {
		width: 70,
		height: 70,
		borderRadius: 5,
		borderColor: '#00cea6',
		borderWidth: 2,
		marginRight: 8,
	},
	profileName: {
		paddingLeft: 7,
	},
	newsListContainer: {
		flex: 1,
		borderRadius: 3,
		backgroundColor: '#304038',
		marginTop: 10,
		marginBottom: 10,
	},
	newsContainer: {
		flex: 1,
		flexDirection: 'row',
		padding: 8,
		borderTopWidth: 2,
		borderTopColor: '#adbcb1',
	},
	newsImage: {
		flex: 1,
		width: 70,
		height: 70,
		marginRight: 8,
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

export default HomeScreen;