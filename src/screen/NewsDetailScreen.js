import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, useWindowDimensions, ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';


const NewsDetailScreen = () => {
	const { width } = useWindowDimensions();
	const source = {
		html: `
			<p style="text-align: justify;font-size: 15px;">
				Pangdam IX / Udayana Mayjen TNI Sony Apriyanto mencanangkan miniatur program binter unggulan TNI AD tahun 2023 <br/><br/>
				Dalam miniatur program binter unggulan TNI AD yang dicanangkan Pangdam IX / Udayana tersebut diharapkan dapat memberikan dampak nyata kehadiran TNI AD bagi masyarakat Desa Sumili, Kecamatan Kupang 
				Barat, Kabupaten Kupang <br/><br/>
				Dalam miniatur program binter unggulan TNI AD yang dicanangkan Pangdam IX / Udayana tersebut diharapkan dapat memberikan dampak nyata kehadiran TNI AD bagi masyarakat Desa Sumili, Kecamatan Kupang 
				Barat, Kabupaten Kupang<br/><br/>
				Dalam miniatur program binter unggulan TNI AD yang dicanangkan Pangdam IX / Udayana tersebut diharapkan dapat memberikan dampak nyata kehadiran TNI AD bagi masyarakat Desa Sumili, Kecamatan Kupang 
				Barat, Kabupaten Kupang<br/><br/>
				Dalam miniatur program binter unggulan TNI AD yang dicanangkan Pangdam IX / Udayana tersebut diharapkan dapat memberikan dampak nyata kehadiran TNI AD bagi masyarakat Desa Sumili, Kecamatan Kupang 
				Barat, Kabupaten Kupang<br/><br/>
				Dalam miniatur program binter unggulan TNI AD yang dicanangkan Pangdam IX / Udayana tersebut diharapkan dapat memberikan dampak nyata kehadiran TNI AD bagi masyarakat Desa Sumili, Kecamatan Kupang 
				Barat, Kabupaten Kupang
			</p>
			`,
	};

	const title = {
		html: `<h2 style="text-align: justify;"> Bentuk TNI Hadir Untuk Masyarakat, Ini Tujuh Kegiatan Korem 161 / Wira Sakti di Desa Sumili Kabupaten Kupang </h2> `
	}

	return (
		<View style={styles.container}>
			<View style={{flexDirection: 'row', paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#adbcb1',}}>
				<Image
					style={{ width: 35, height: 35, marginRight: 5, tintColor: '#ffffff'}}
					source={require('../assets/Icons/title.png')}
				/>
				<Text style={{fontWeight: 'bold',fontSize: 35, color: '#ffffff'}}>Buletin Berita</Text>
			</View>
			<Text style={styles.welcomeText}>Baca</Text>
			<ScrollView style={styles.newsListContainer}>
				<View style={styles.newsContainer}>
					<View style={{ flex: 3, flexDirection: 'column' }}>
						<View style={styles.newsDescription}>
							<Text style={{ flex: 1, color: '#ffffff' }}>05 Mei 2023</Text>
							<Text style={{ color: '#ffffff'}}>Oleh : Administrator</Text>
						</View>
						<RenderHtml
							contentWidth={width}
							source={title}
						/>
						<Image
							style={styles.newsImage}
							source={require('../assets/Images/banner.jpg')}
						/>
						<RenderHtml
							contentWidth={width}
							source={source}
						/>
					</View>
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
		backgroundColor: '#304038',
		marginTop: 10,
		marginBottom: 10,
	},
	newsContainer: {
		flexDirection: 'row',
		padding: 8
	},
	newsImage: {
		width: '100%',
		height: 250,
		alignItems: 'stretch'
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

export default NewsDetailScreen;