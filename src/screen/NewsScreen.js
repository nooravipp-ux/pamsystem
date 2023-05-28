import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsScreen = ( {navigation} ) => {

	useEffect(() => {
		removeToken();
    }, []);

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
			title: 'Second Item',
		},
		{
			id: '8',
			title: 'First Item',
		},
		{
			id: '10',
			title: 'Second Item',
		}
	];

	const removeToken = async () => {
        try {
            await AsyncStorage.removeItem('token')
        } catch (error) {
            console.log(error);
        }
    };

	const Item = ({ title }) => (
		<TouchableOpacity 
			style={styles.newsContainer}
			onPress={() => navigation.navigate('NewsDetailScreen')}
		>
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
		</TouchableOpacity >
	);

	return (
		<View style={styles.container}>
			<View style={{flexDirection: 'row', paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#adbcb1',}}>
				<Image
					style={{ width: 35, height: 35, marginRight: 5, tintColor: '#ffffff'}}
					source={require('../assets/Icons/title.png')}
				/>
				<Text style={{fontWeight: 'bold',fontSize: 35, color: '#ffffff'}}>Buletin Berita</Text>
			</View>
			<Text style={styles.welcomeText}>Daftar Berita</Text>
			<SafeAreaView style={styles.newsListContainer}>
				<FlatList
					data={DATA}
					renderItem={({ item }) => <Item title={item.title} />}
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
		color: '#ffffff',
		paddingTop: 10,
		paddingBottom: 10,
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
		borderTopWidth: 1,
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

export default NewsScreen;