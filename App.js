import React, { useRef, useEffect, useState } from 'react';
import {AppState, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import GeoLocation from '@react-native-community/geolocation';
import { AuthProvider } from './src/context/AuthContext';
import { DataProvider } from './src/context/DataContext';
import AppNav from './src/navigation/AppNav';

function App() {
	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppSatateVisible] = useState(appState.current)

	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			if(appState.current.match(/inactive|background/) && nextAppState === 'active') {
				console.log('App has become to the foreground')
			}

			appState.current = nextAppState;
			setAppSatateVisible(appState.current);
			console.log('AppState', appState.current);
		});

		return () => {
			subscription.remove();
		}
	});
    return (
		<AuthProvider>
			<DataProvider>
				<NavigationContainer>
					<AppNav />
				</NavigationContainer>
			</DataProvider>
		</AuthProvider>
    );
}

export default App;