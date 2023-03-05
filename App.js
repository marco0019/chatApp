import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react'
import RegisterForm from './components/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Chats from './components/Chats';
import LoginForm from './components/Login';

const Stack = createStackNavigator();
export default function App() {
    const [isLogged, setIsLogged] = useState(false);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginForm} />
                <Stack.Screen name="Register" component={RegisterForm} />
                <Stack.Screen name="ScreenB" component={Chats} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
/*
*/
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
/*


*/