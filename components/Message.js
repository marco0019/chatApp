import Axios from 'axios';
import { ScrollView, View, StyleSheet, Alert, Text } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import ChatInput from './ChatInput';
import colors from './Styles';

export default function Messages({ route }) {
    const [messages, setMessages] = useState([]);
    const styles = stylesheet(route.params.theme);
    const scrollViewRef = useRef(null);
    useEffect(() => {
        Axios.get(`https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/data-kxsej/service/exampleApi/incoming_webhook/getAll?secret=getAll&database=Chats&collection=global`)
            .then(function (response) {
                setMessages(response.data);
            })
            .catch(function (err) { Alert.alert("There was an error!", err.message) })

    }, [route.params, styles, messages]);
    const handleContentSizeChange = (contentWidth, contentHeight) => {
        scrollViewRef.current.scrollToEnd({ animated: true }); // Imposta la posizione verticale alla fine
    };
    return (
        <View style={styles.viewContainer}>
            <ScrollView ref={scrollViewRef} style={styles.containerScroll} onContentSizeChange={handleContentSizeChange}>
                {messages.length == 0 ? <Text>There aren't any messages yet...</Text> : (messages.map((message, index) => {
                    const Hours = new Date(message.date)
                    return (
                        <Message key={index}
                            text={message.content}
                            sender={route.params.user === message.user}
                            user={message.user}
                            isGroup={route.params.isGroup}
                            date={Hours.getHours() + ":" + Hours.getMinutes()}
                            isLast={index == messages.length - 1}
                            theme={route.params.theme} />)
                }))}
            </ScrollView>
            <ChatInput user={route.params.user} chatName={route.params.chatName} theme={route.params.theme} />
        </View>
    )
}
const Message = ({ text, sender, isGroup, user, date, isLast, theme }) => {
    const styles = stylesheet(theme)
    return (
        <View style={[styles.containerMessage, { marginBottom: isLast ? 70 : 0 }]}>
            <View
                style={sender ? styles.meContainer : styles.otherContainer}
            >
                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    {!isGroup ? (sender ?
                        null :
                        <Text style={sender ? styles.meName : styles.otherName}>
                            {user}
                        </Text>) : null
                    }
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxWidth: 500, alignItems: 'flex-end' }}>
                        <Text style={sender ? styles.meText : styles.otherText}>{text}</Text>
                        <Text style={styles.messageInfoText}>{' ' + date}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const stylesheet = theme => {
    return {
        viewContainer: {
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
        },
        containerScroll: {
            height: '100%',
            backgroundColor: colors.backSecondary[Number(theme)],//'#FFF'
        },
        meContainer: {
            alignSelf: 'flex-end',
            backgroundColor: colors.secondary[Number(theme)],
            borderRadius: 8,
            padding: 8,
            margin: 2,
            maxWidth: '80%',
        },
        otherContainer: {
            alignSelf: 'flex-start',
            backgroundColor: colors.backPrimary[Number(theme)],
            borderRadius: 8,
            padding: 8,
            margin: 2,
            maxWidth: '80%',
        },
        meText: {
            color: colors.textPrimary[Number(theme)],
            fontSize: 16,
        },
        otherText: {
            color: colors.textPrimary[Number(theme)],
            fontSize: 16,
        },
        otherName: {
            color: colors.textPrimary[Number(theme)],
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
            color: colors.textPrimary[Number(theme)],
            fontSize: 12,
            marginLeft: 8,
        },
    }
};