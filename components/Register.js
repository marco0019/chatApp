import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Axios from 'axios';

const RegisterForm = ({ navigation, setUser, setChats }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleRegister = () => {
        Axios.put(`https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/data-kxsej/service/exampleApi/incoming_webhook/insertUser?secret=insertUser&usr=${name}&email=${email}&pass=${password}`)
        .then(function(){
            setUser(name)
            Axios.get("https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/data-kxsej/service/exampleApi/incoming_webhook/getChatList?secret=getChatList&usr=marco")
            .then(function(response){
                setChats(response.data.chat)
                console.table(response.data.chat)
            })
            .catch(function(err){
                console.log();
            })
        })
        .catch(function(err){})
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={text => setName(text)}
                value={name}
            />
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
            <Text style={styles.error & error != ""}>{error}</Text>
            {name == "" | email == "" | password == "" ?
                <Button title="Register" disabled onPress={handleRegister} /> :
                <Button title="Register" onPress={handleRegister} />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
    },
    error: {
        width: 200,
        padding: 10,
        borderColor: 'red',
        color: 'red',
        fontWeight: 'bold',
        borderWidth: 1,
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 8,
        width: 200
    },
});

export default RegisterForm;