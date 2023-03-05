import React, { useState, useEffect } from 'react'
import { ScrollView, Text, StyleSheet, View, Alert, Image, TouchableOpacity } from "react-native"
import Axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatCell = ({ name, avatarUrl, preview, timestamp }) => {
    return (
        <TouchableOpacity onPress={()=>Alert.alert("errore")}>
            <View style={styles.container} onPress={() => { Alert.alert("Errore") }}>
                <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                <View style={styles.detailsContainer}>
                    <View style={styles.row}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.timestamp}>{timestamp}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="check-all" size={16} color="#666" />
                        <Text style={styles.preview}>{preview}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default function Chats() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        Axios.get(`https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/data-kxsej/service/exampleApi/incoming_webhook/getChatList?secret=getChatList&usr=marco`)
            .then(function (response) {
                setChats(response.data.chat);
            })
            .catch(function (error) {
                Alert.alert("Error!", error)
            });
    }, []);

    return (
        <ScrollView style={styles.view}>
            {chats == null ? null : chats.map((index, chat) => (
                <ChatCell name={chat.name} avatarUrl={'../assets/favicon.png'} preview={'message'} timestamp={'19:00'} key={index}/>
            ))}
        </ScrollView>
    )
}

//<Text style={styles.text}>{chat.name}</Text>
const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
        display: 'flex'
    },
    text: {
        color: '#000',
        backgroundColor: '#fff',
        position: 'absolute',
        top: '50%',
        fontSize: 100,
        left: '50%'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    detailsContainer: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
    },
    timestamp: {
        color: '#666',
        fontSize: 12,
        marginLeft: 8,
    },
    preview: {
        color: '#666',
        fontSize: 14,
        marginLeft: 8,
        flex: 1,
    },
})