import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Axios from 'axios';
import { useReducer, useContext } from 'react/cjs/react.development';

export const [user, setUser] = useContext("")
export default function App() {
    Axios.get(`https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/data-kxsej/service/exampleApi/incoming_webhook/insert?secret=exampleApi`).then(function (response) { setUser(response.data); console.log(response.data); })
        .catch(function (error) {
            console.log(error);
        });
        console.log(user);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{user}</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#000'
    }
});
/*


*/