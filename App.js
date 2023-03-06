import { StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react'
import RegisterForm from './components/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Axios from 'axios';

import Chats from './components/Chats';
import LoginForm from './components/Login';
import Messages from './components/Message'

const Stack = createStackNavigator();

export default function App() {
    const [isLogged, setIsLogged] = useState(false);
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        Axios.get(`https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/data-kxsej/service/exampleApi/incoming_webhook/getChatList?secret=getChatList&usr=marco`)
            .then(function (response) {
                setChats(response.data.chat);
            })
            .catch(function (error) {
                Alert.alert("Error!", error.message)
            })
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Register" component={RegisterForm} />
                <Stack.Screen name="Login" component={LoginForm} />
                <Stack.Screen name="Chats" component={Chats} />
                <Stack.Screen name="global" component={Chats}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#000'
    }
});