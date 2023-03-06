import React, { useState, useEffect } from 'react'
import { ScrollView, Text, StyleSheet, View, Alert, TouchableOpacity, Image } from "react-native"
import Axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ContactImage } from './ContactImage'

export default function Chats({ navigation }) {
    const [chats, setChats] = useState([{ name: "", private: false }]);
    useEffect(() => {
        Axios.get(`https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/data-kxsej/service/exampleApi/incoming_webhook/getChatList?secret=getChatList&usr=marco`)
            .then(function (response) {
                setChats(response.data.chat);
            })
            .catch(function (error) {
                Alert.alert("Error!", error.message)
            });
    }, [])
    return (
        <ScrollView style={styles.view}>
            {chats == null ? <Text>There aren't any chat yet</Text> : chats.map((chat, index) => (
                <TouchableOpacity key={chat.name} onPress={() => { navigation.navigate("Login", { transition: 'slideFromRight' }) }}>
                    <View style={styles.container}>
                        <View style={styles.detailsContainer}>
                            <View style={styles.row}>
                                <Text style={styles.name}>{chat.name}</Text>
                                <Text style={styles.timestamp}>{"19:00"}</Text>
                            </View>
                            <View style={styles.row}>
                                <Icon name="check-all" size={16} color="#666" />
                                <Text style={styles.preview}>{"message"}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

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
        color: '#000'
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
    box: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#777'
    }
})