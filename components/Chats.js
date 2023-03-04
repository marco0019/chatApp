import React, { useState } from 'react'
import { ScrollView } from "react-native-web"
import Axios from 'axios';

export default function Chats({ ...prop }) {
    const [chats, setChats] = useState([{name:"", private:false}]);
    Axios.get(`https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/data-kxsej/service/exampleApi/incoming_webhook/getChatList?secret=getChatList&usr=marco`)
        .then(function (response) { setChats(response.data.chat); console.log(response.data.chat); })
        .catch(function (error) {
            console.log(error);
        });
    return (
        <ScrollView>
            {chats}
        </ScrollView>
    )
}