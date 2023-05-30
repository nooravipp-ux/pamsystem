import React, { useState, useEffect,useRef } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  Button
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

const ChatList = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  useEffect(() => {
    // Menambahkan efek samping untuk menscroll ke bagian bawah daftar pesan
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messages.length > 0) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowDatePicker(false);
		setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
          <View style={{flexDirection: 'row', paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#adbcb1',}}>
          <Image
            style={{ width: 35, height: 35, marginRight: 5, tintColor: '#ffffff'}}
            source={require('../../assets/Icons/title.png')}
          />
          <Text style={{fontWeight: 'bold',fontSize: 35, color: '#ffffff'}}>Chat</Text>
          <View>
		{/* Tambahkan tombol untuk memperlihatkan DateTimePicker */}
		<Button
			title="Pilih Tanggal"
			onPress={() => setShowDatePicker(true)}
		/>

		{/* Tampilkan DateTimePicker jika showDatePicker bernilai true */}
		{showDatePicker && (
			<DateTimePicker
			value={date}
			mode="date"
			is24Hour={true}
			display="spinner"
			onChange={handleDateChange}
			/>
		)}

		{/* Tampilkan tanggal yang dipilih */}
		<Text>Tanggal dipilih: {date.toLocaleDateString()}</Text>
		</View>
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
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10
    },
    profileImage: {
        flex: 1,
        width: 40,
        height: 60,
        borderRadius: 5,
        borderWidth: 2,
        marginRight: 8,
    },
    profileName: {
        flex: 3,
        paddingLeft: 7,
    },
    messageContainer: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    messageText: {
        fontSize: 16,
        color: 'black'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 3,
        paddingHorizontal: 10,
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: 'white'
    },
    sendButton: {
        marginLeft: 10,
        paddingHorizontal: 6,
        paddingVertical: 10
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default ChatList;
