import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions} from 'react-native';

const HomeScreen = ({ navigation }) => {

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
					<Image
						style={styles.profileImage}
						source={require('../assets/Icons/avatar.png')}
					/>
					<View style={styles.profileName}>
						<Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 25 }}>Ady Santoso</Text>
						<Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 20 }}>534088</Text>
						<Text style={{ color: '#00cea6', fontWeight: 'bold', fontSize: 20 }}>Kodim 1306, Kota Palu</Text>
					</View>
				</View>
				<SafeAreaView style={styles.newsListContainer}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#00826e', padding: 8, borderTopRightRadius: 3, borderTopLeftRadius: 3 }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>BULETIN BERITA</Text>
						<TouchableOpacity
							onPress={() => navigation.navigate('Buletin Berita')}
						>
							<Text style={{ fontSize: 17, color: 'black'  }}>Lihat Semua </Text>
						</TouchableOpacity>
					</View>
					<View style={styles.newsContainer}>
						<Image
							style={styles.newsImage}
							source={require('../assets/Images/banner.jpg')}
						/>
						<View style={{ flex:3, flexDirection: 'column' }}>
							<View style={styles.newsDescription}>
								<Text style={{ flex: 1, color: '#ffffff' }}>05 Mei 2023</Text>
								<Text style={{ color: '#ffffff'}}>Oleh : Administrator</Text>
							</View>
							<View style={styles.newsTitle}>
								<Text style={{ flex: 1, color: '#ffffff', fontWeight: 'bold', textAlign: 'left' }}>Lepas Sambut komandan kodim 1306 Kota Palu</Text>
							</View>
						</View>
					</View>
					<View style={styles.newsContainer}>
						<Image
							style={styles.newsImage}
							source={require('../assets/Images/banner.jpg')}
						/>
						<View style={{ flex:3, flexDirection: 'column' }}>
							<View style={styles.newsDescription}>
								<Text style={{ flex: 1, color: '#ffffff' }}>05 Mei 2023</Text>
								<Text style={{ color: '#ffffff'}}>Oleh : Administrator</Text>
							</View>
							<View style={styles.newsTitle}>
								<Text style={{ flex: 1, color: '#ffffff', fontWeight: 'bold', textAlign: 'left' }}>Lepas Sambut komandan kodim 1306 Kota Palu</Text>
							</View>
						</View>
					</View>
				</SafeAreaView>
				<SafeAreaView style={styles.newsListContainer}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#00826e', padding: 8, borderTopRightRadius: 3, borderTopLeftRadius: 3 }}>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>PELAPORAN</Text>
						<TouchableOpacity
							onPress={() => navigation.navigate('Pelaporan')}
						>
							<Text style={{ fontSize: 17, color: 'black'  }}>Lihat Semua </Text>
						</TouchableOpacity>
					</View>
					<View style={styles.newsContainer}>
						<Image
							style={styles.newsImage}
							source={require('../assets/Images/banner.jpg')}
						/>
						<View style={{ flex:3, flexDirection: 'column' }}>
							<View style={styles.newsDescription}>
								<Text style={{ flex: 1, color: '#ffffff' }}>05 Mei 2023</Text>
								<Text style={{ color: '#ffffff'}}>Oleh : Administrator</Text>
							</View>
							<View style={styles.newsTitle}>
								<Text style={{ flex: 1, color: '#ffffff', fontWeight: 'bold', textAlign: 'left' }}>Lepas Sambut komandan kodim 1306 Kota Palu</Text>
							</View>
						</View>
					</View>
					<View style={styles.newsContainer}>
						<Image
							style={styles.newsImage}
							source={require('../assets/Images/banner.jpg')}
						/>
						<View style={{ flex:3, flexDirection: 'column' }}>
							<View style={styles.newsDescription}>
								<Text style={{ flex: 1, color: '#ffffff' }}>05 Mei 2023</Text>
								<Text style={{ color: '#ffffff'}}>Oleh : Administrator</Text>
							</View>
							<View style={styles.newsTitle}>
								<Text style={{ flex: 1, color: '#ffffff', fontWeight: 'bold', textAlign: 'left' }}>Lepas Sambut komandan kodim 1306 Kota Palu</Text>
							</View>
						</View>
					</View>
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