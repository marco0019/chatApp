import Axios from 'axios';
import { View, StyleSheet, Alert } from 'react-native-web';
import React, { useState, useEffect } from 'react';

export default function Messages({ ...prop }) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        Axios.get(``)
            .then(function (response) { setMessages(response.data) })
            .catch(function (err) { Alert.alert("There was an error!", err.message) })
    }, [messages]);
    return (
        <View>
            {messages.map((index, message) => {
                <Message text={message.content} sender={prop.user === message.user}/>
            })}
        </View>
    )
}


const Message = ({ text, sender }) => {
    return (
        <View style={sender ? styles.meContainer : styles.otherContainer}>
            <Text style={sender ? styles.meText : styles.otherText}>
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    meContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#5e5',
        borderRadius: 8,
        padding: 8,
        margin: 8,
        maxWidth: '80%',
    },
    otherContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#eee',
        borderRadius: 8,
        padding: 8,
        margin: 8,
        maxWidth: '80%',
    },
    meText: {
        color: '#fff',
        fontSize: 16,
    },
    otherText: {
        color: '#000',
        fontSize: 16,
    },
});