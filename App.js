import React, { useState } from 'react'
import Messages from './components/Message';
import RegisterForm from './components/Register'
import Main from './Main';
import styles from './components/Styles';
import { ScrollView } from 'react-native';
export default function App() {
    const [chatList, setChatList] = useState([{ name: "pr", private: false }])
    const [user, setUser] = useState("");
    return user == "" ? <RegisterForm setUser={setUser} setChats={setChatList}/> : <Main user={user} chatList={chatList} />;
    //user == "" ? <RegisterForm setUser={setUser} setChats={setChatList}/> : <Main user={user} chatList={chatList} />
}