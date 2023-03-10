import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Axios from 'axios'
function ChatInput({ user, chatName }) {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            Axios.post(`https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/data-kxsej/service/exampleApi/incoming_webhook/insertMessage?secret=insertMessage&name=${chatName}&usr=${user}&type=text&content=${message}`)
            setMessage('');
        }
    };

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}
            style={styles.container}
            extraHeight={100}
        >
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message"
                    multiline
                    value={message}
                    onChangeText={text => setMessage(text)}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Icon name="send" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        display: 'flex',
        position: 'absolute',
        bottom: 20,
        width: '90%',
        left: '5%',
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: '#000'
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 8,
        maxHeight: 120,
        fontSize: 16,
        lineHeight: 24,
    },
    sendButton: {
        backgroundColor: '#11d',
        borderRadius: 24,
        padding: 8,
    },
});

export default ChatInput;