import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Axios from 'axios';
import React, { useState } from 'react'
import RegisterForm from './components/Register';
import ChangeMode from './components/ChangeMode';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Chats from './components/Chats';

const Stack = createStackNavigator();
export default function App() {
    const [user, setUser] = useState("");
    const [theme, setTheme] = useState(false);
    console.log(user);
    const chat = <Chats name={user}/>
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="ScreenA" component={RegisterForm} />
                <Stack.Screen name="ScreenB" component={Chats} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
/*

        <View style={styles.container}>
            <Users/>
            <ChangeMode dark={theme} action={()=>setTheme(!theme)}/>
            <RegisterForm/>
            <Text style={styles.text}>{user}</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
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