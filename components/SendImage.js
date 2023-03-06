import { TextInput, View } from "react-native-web";
import Axios from 'axios';
import React, { useState } from "react";
const fs = require('fs');

export default function SendImage({ ...prop }) {
    return (
        <View>
            <TextInput type='file' onLoad={event => {
                const binaryString = new Uint8Array(event.target.result)
                    .reduce((acc, byte) => acc + String.fromCharCode(byte),
                        '')
            }} />
        </View>
    )
}