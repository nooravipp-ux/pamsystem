import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { DataProvider } from './src/context/DataContext';
import AppNav from './src/navigation/AppNav';

function App() {
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