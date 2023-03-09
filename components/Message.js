import Axios from 'axios';
import { ScrollView, View, StyleSheet, Alert, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import ChatInput from './ChatInput';

export default function Messages({ route }) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        Axios.get(`https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/data-kxsej/service/exampleApi/incoming_webhook/getAll?secret=getAll&database=Chats&collection=global`)
            .then(function (response) {
                setMessages(response.data);
                console.table(response.data);
                console.table(messages);
            })
            .catch(function (err) { Alert.alert("There was an error!", err.message) })

    }, [route.params.chatName]);
    return (
        <ScrollView style={styles.container}>
            {messages.length == 0 ? <Text>There aren't any messages yet...</Text> : (messages.map((message, index) => {
                const Hours = new Date(message.date)
                return (
                    <Message key={index}
                        text={message.content}
                        sender={route.params.user === message.user}
                        user={message.user}
                        isGroup={route.params.isGroup}
                        date={Hours.getHours() + ":" + Hours.getMinutes()} />)
            }))}
            <ChatInput user={route.params.user} chatName={route.params.chatName} />
        </ScrollView>
    )
}
const Message = ({ text, sender, isGroup, user, date }) => {
    const isMessageFromMe = sender;
    const isMessageLong = text.length > 30;

    return (
        <View style={styles.container}>
            <View
                style={isMessageFromMe ? styles.meContainer : styles.otherContainer}
            >
                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text style={isMessageFromMe ? styles.meName : styles.otherName}>
                        {user}
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxWidth: 500, alignItems: 'flex-end' }}>
                        <Text style={isMessageFromMe ? styles.meText : styles.otherText}>{text}</Text>
                        <Text style={styles.messageInfoText}>{' ' + date}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        color: '#fff',
        position: 'relative'
    },
    meContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#113',
        borderRadius: 8,
        padding: 8,
        margin: 8,
        maxWidth: '80%',
    },
    otherContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#111',
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
        color: '#fff',
        fontSize: 16,
    },
    meName: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 4,
    },
    otherName: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 4,
    },
    senderText: {
        color: '#ccc',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 8,
    },
    messageInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    messageInfoText: {
        color: '#ccc',
        fontSize: 12,
        marginLeft: 8,
    },
});