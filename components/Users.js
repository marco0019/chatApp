import { View, Text, StyleSheet } from 'react-native'
import Axios from 'axios';
import React, { useState } from 'react'

export default function Users() {
    const [users, setUsers] = useState([{}]);
    Axios.get("https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/data-kxsej/service/exampleApi/incoming_webhook/getAll?secret=getAll&database=Users&collection=users").then(function (response) { setUsers(response.data); })
        .catch(function (error) {
            console.log(error);
        });
    return (
        <View>
            {users.map(usr=><Text>{usr.name}</Text>)}
        </View>
    )
}