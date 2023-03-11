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

    }, [route.params.chatName, messages]);
    return (
        <View style={styles.viewContainer}>
            <ScrollView style={styles.containerScroll}>
                {messages.length == 0 ? <Text>There aren't any messages yet...</Text> : (messages.map((message, index) => {
                    const Hours = new Date(message.date)
                    return (
                        <Message key={index}
                            text={message.content}
                            sender={route.params.user === message.user}
                            user={message.user}
                            isGroup={route.params.isGroup}
                            date={Hours.getHours() + ":" + Hours.getMinutes()}
                            isLast={index == messages.length - 1} />)
                }))}
            </ScrollView>
            <ChatInput user={route.params.user} chatName={route.params.chatName} />
        </View>
    )
}
const Message = ({ text, sender, isGroup, user, date, isLast }) => {
    const isMessageFromMe = sender;

    return (
        <View style={[styles.containerMessage, {marginBottom: isLast ? 65 : 0}]}>
            <View
                style={isMessageFromMe ? styles.meContainer : styles.otherContainer}
            >
                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    {sender ?
                        null :
                        <Text style={isMessageFromMe ? styles.meName : styles.otherName}>
                            {user}
                        </Text>
                    }
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
    viewContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        backgroundColor: '#000'
    },
    containerScroll: {
        height: '100%',
        backgroundColor: '#000',
    },
    meContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#113',
        borderRadius: 8,
        padding: 8,
        margin: 2,
        maxWidth: '80%',
    },
    otherContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#111',
        borderRadius: 8,
        padding: 8,
        margin: 2,
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