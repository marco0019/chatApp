import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ContactImage = ({ url }) => {
    return (
        <View style={styles.imageContainer}>
            <Image
                style={styles.image}
                source={{ uri: url }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        backgroundColor: '#f2f2f2',
        borderRadius: 50,
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: 50,
        height: 96,
        width: 96,
    },
});

export default ContactImage;