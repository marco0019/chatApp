import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Axios from 'axios';

const LoginForm = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleRegister = () => {
        Axios.get(`https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/data-kxsej/service/exampleApi/incoming_webhook/getUser?secret=getUser&usr=${email}`).then(function (response) { })
            .catch(function (error) {
                console.log(error);
            });
        navigation.navigate('ScreenB', {
            transition: 'slideFromCenter'
        })
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
            <Button title='Have already an account?' color='#000' onPress={()=>navigation.navigate('Register')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 8,
        width: 200,
    },
});

export default LoginForm;