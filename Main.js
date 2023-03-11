import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, useColorScheme, StatusBar } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Messages from './components/Message';
import colors from './components/Styles';

const Stack = createStackNavigator();
const pr = StyleSheet.create({
    prove: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    }
})

export default function Main({ user, chatList }) {
    const [theme, setTheme] = useState(useColorScheme() === 'dark');
    const styles = stylesheet(theme)
    useEffect(() => {
    }, [chatList, user])
    const ChatList = ({ navigation }) => {
        return (
            <View style={styles.viewContainer}>
                <ScrollView style={styles.container}>
                    {chatList == null ?
                        <Text style={styles.noChats}>You don't have any chats yet.</Text> :
                        chatList.map((chat) =>
                            <TouchableOpacity key={chat.name} onPress={() => { navigation.navigate("global") }}>
                                <View style={styles.chatContainer}>
                                    <View style={styles.avatarContainer}>
                                        <Text style={styles.avatarText}>{chat.name.toUpperCase().charAt(0)}</Text>
                                    </View>
                                    <View style={styles.detailsContainer}>
                                        <Text style={styles.nameText}>{chat.name}</Text>
                                        <View style={styles.row}>
                                            <Icon name="check-all" size={18} color={colors.primary[Number(theme)]} />
                                            <Text style={styles.previewText}>message</Text>
                                            <Text style={styles.timestampText}>prova</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    <StatusBar barStyle='auto' />
                </ScrollView>
                <TouchableOpacity onPress={()=>{}} style={styles.newChatButton}>
                    <Icon name="chat-plus" size={30} color={'#BDBDBD'}/>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.backSecondary[Number(theme)],
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: colors.textPrimary[Number(theme)],
                    },
                    headerTintColor: colors.backSecondary[Number(theme)],
                }}>
                <Stack.Screen
                    name="Chats"
                    component={ChatList}
                    options={{
                        headerRight: () => (
                            <TouchableOpacity onPress={() => setTheme(!theme)} style={{ marginRight: 20 }}>
                                <Icon name={theme ? "brightness-2" : "brightness-7"} size={24} color={colors.textSecondary[Number(theme)]} />
                            </TouchableOpacity>
                        ),

                        title: 'Chats',
                        headerStyle: {
                            backgroundColor: colors.backSecondary[Number(theme)],
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: colors.textPrimary[Number(theme)],
                        },
                        headerTintColor: colors.backSecondary[Number(theme)],
                    }} />
                {chatList.map(chat => {
                    return (
                        <Stack.Screen
                            key={chat.name}
                            name={chat.name}
                            component={Messages}
                            initialParams={{ user: user, chatName: chat.name, isGroup: chat.private, theme: theme }}
                            options={{
                                headerRight: () => (
                                    <TouchableOpacity onPress={() => setTheme(!theme)} style={{ marginRight: 20 }}>
                                        <Icon name={theme ? "brightness-2" : "brightness-7"} size={24} color={colors.textSecondary[Number(theme)]} />
                                    </TouchableOpacity>
                                ),
                                title: chat.name.toString(),
                            }} />)
                })}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const stylesheet = theme => {
    return {
        viewContainer: {
            width: '100%',
            height: '100%',
            flex: 1,
            backgroundColor: colors.backSecondary[Number(theme)]
        },
        container: {
            backgroundColor: colors.backSecondary[Number(theme)],//theme ? '#bbb' : "#121212"
        },
        noChats: {
            paddingVertical: 20,
            textAlign: 'center',
            fontSize: 16,
            color: colors.textPrimary[Number(theme)],
        },
        newChatButton: {
            width: 40,
            height: 50,
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            backgroundColor: '#128C7E',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 20,
            right: 0
        },
        chatContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.backTernary[Number(!theme)],
        },
        avatarContainer: {
            backgroundColor: colors.backSecondary[Number(theme)],
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            borderWidth: 2,
            borderColor: colors.backSecondary[Number(!theme)],
        },
        avatarText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.backSecondary[Number(!theme)],
        },
        detailsContainer: {
            flex: 1,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 5,
        },
        nameText: {
            fontWeight: 'bold',
            fontSize: 16,
            color: colors.textPrimary[Number(theme)],
            marginBottom: 5,
        },
        timestampText: {
            fontSize: 12,
            color: colors.textPrimary[Number(theme)],
            marginLeft: 10,
        },
        previewText: {
            fontSize: 14,
            color: colors.textPrimary[Number(theme)],
            marginLeft: 10,
            flex: 1,
        },
    }
};