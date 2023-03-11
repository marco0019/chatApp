import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, Text, View, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Messages from './components/Message';

const Stack = createStackNavigator();

export default function Main({ user, chatList }) {
    const [theme, setTheme] = useState(false);
    useEffect(() => {
    }, [chatList, user])
    const ChatList = ({ navigation }) => {
        return (
            <ScrollView style={[styles.container, {backgroundColor: theme ? "#ddd" : "#222", color: theme ? "#000" : "#fff"}]}>
                {chatList == null ?
                    <Text style={[styles.noChats, {backgroundColor: theme ? "#ddd" : "#222", color: theme ? "#000" : "#fff"}]}>You don't have any chats yet.</Text> :
                    chatList.map((chat) =>
                        <TouchableOpacity key={chat.name} onPress={() => { navigation.navigate("global") }}>
                            <View style={[styles.chatContainer, {backgroundColor: theme ? "#ddd" : "#222", color: theme ? "#000" : "#fff"}]}>
                                <View style={[styles.avatarContainer, {backgroundColor: theme ? "#ddd" : "#222", color: theme ? "#000" : "#fff"}]}>
                                    <Text style={[styles.avatarText, {backgroundColor: theme ? "#ddd" : "#222", color: theme ? "#000" : "#fff"}]}>{chat.name.toUpperCase().charAt(0)}</Text>
                                </View>
                                <View style={[styles.detailsContainer, {backgroundColor: theme ? "#ddd" : "#222", color: theme ? "#000" : "#fff"}]}>
                                    <Text style={[styles.nameText, {backgroundColor: theme ? "#ddd" : "#222", color: theme ? "#000" : "#fff"}]}>{chat.name}</Text>
                                    <View style={styles.row}>
                                        <Icon name="check-all" size={18} color="#2f9bff" />
                                        <Text style={[styles.previewText, {backgroundColor: theme ? "#ddd" : "#222", color: theme ? "#000" : "#fff"}]}>message</Text>
                                        <Text style={[styles.timestampText, {backgroundColor: theme ? "#ddd" : "#222", color: theme ? "#000" : "#fff"}]}>prova</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
            </ScrollView>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#fff',
                    },
                    headerTintColor: '#fff',
                }}>
                <Stack.Screen
                    name="Chats"
                    component={ChatList}
                    options={{
                        headerRight: () => (
                            <TouchableOpacity onPress={() => setTheme(!theme)}>
                                <Icon name={theme ? "brightness-2" : "brightness-7"} size={24} color="#fff" />
                            </TouchableOpacity>
                        ),
                        title: 'Chats',
                    }} />
                {
                    chatList.map(chat => {
                        console.log(chat);
                        return (
                            <Stack.Screen
                                key={chat.name}
                                name={chat.name}
                                component={Messages}
                                initialParams={{ user: user, chatName: chat.name, isGroup: chat.private }}
                                options={{
                                    headerRight: () => (
                                        <TouchableOpacity onPress={() => console.log('Pressed')}>
                                            <Icon name="bell" size={24} color="#fff" />
                                        </TouchableOpacity>
                                    ),
                                    title: 'Home',
                                }} />
                        )
                    })
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = {
    theme: false,
    container: {
        flex: 1,
        backgroundColor: this.theme ? '#f5f5f5' : "#121212",
    },
    noChats: {
        paddingVertical: 20,
        textAlign: 'center',
        fontSize: 16,
        color: this.theme ? '#000' : '#fff',
    },
    chatContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatarContainer: {
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#2f9bff',
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2f9bff',
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
        color: '#000',
        marginBottom: 5,
    },
    timestampText: {
        fontSize: 12,
        color: '#000',
        marginLeft: 10,
    },
    previewText: {
        fontSize: 14,
        color: '#000',
        marginLeft: 10,
        flex: 1,
    },
};