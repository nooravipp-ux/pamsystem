import React, { useState, useEffect, useContext} from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, useWindowDimensions, ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Loading } from '../components/Loading';
import moment from 'moment';
import { BASE_URL, BASE_IMG_URL } from '../config/Config';


const NewsDetailScreen = ({route}) => {
	const { token } = useContext(AuthContext);
    const [ news, setNews] = useState(null);

	const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
	const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
	const [files, setFiles] = useState([]);

	const { width } = useWindowDimensions();
	const newsDesc = {
		html: `${desc}`,
	};

	const newsTitle = {
		html: `${title}`
	}

	useEffect(() => {
        const { newsId } = route.params;

        console.log('Report Id :', newsId);

		const getNewsById = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/news/${newsId}`, {
					headers: {
						Authorization: `Bearer ${JSON.parse(token)}`,
					},
				});

				const data = response.data.response;
                console.log(data.photos);
				if(response){
					setNews(response.data.response);
                    setDate(data.date);
                    setHour(data.hour);
                    setDesc(data.desc);
                    setTitle(data.title);
					setFiles(data.photos)
				}else{
					console.log('gagal fetch data')
				}
			} catch (error) {
				console.error(error);
			}				
		}

		getNewsById();
	}, []);

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
				<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, padding: 5}}>
                    <Text style={{flex: 1, color:'#ffffff', fontSize: 15, fontWeight:'bold', padding: 6}}>{moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY')}</Text>
                    <Text style={{flex:1, color:'#ffffff', fontSize: 15, fontWeight:'bold', padding: 6, textAlign: 'right'}}>Oleh : Admin</Text>
                </View>
				<View style={{flex: 1, flexDirection: 'row', padding: 5}}>
                    <Text style={{flex: 1, color:'#ffffff', fontSize: 25, textAlign: 'justify', fontWeight:'bold', padding: 6}}>{title}</Text>
                </View>
				<View style={{flex: 1, flexDirection: 'row', marginTop: 10, padding: 6}}>
					{files?.map((val, index) => {
						return (
							<>
								<Image 
									key={index.toString()}
									style={styles.imgContainer} 
									source={{ uri: `${BASE_IMG_URL}${val.file}`}} 
								/>
							</>							
						)
					})}
                </View>
				<View style={{flex: 1, flexDirection: 'row', marginTop: 5, padding: 5}}>
                    <Text style={{flex: 1, color:'#ffffff', fontSize: 16, textAlign: 'justify', padding: 6}}>{desc}</Text>
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
		backgroundColor: '#3e4c42',
		marginTop: 10,
		marginBottom: 10,
	},
	newsContainer: {
		flexDirection: 'row',
		padding: 8
	},
	imgContainer: {
		width: 330,
		height: 300,
		borderRadius: 2,
		marginBottom: 5

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