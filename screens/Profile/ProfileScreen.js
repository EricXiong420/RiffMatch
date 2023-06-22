import { ScrollView, FlatList, StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = () => {

    return (
        <ScrollView style={styles.mainContainer}>
            <Text>Profile</Text>

        </ScrollView>
    )
}


export default ProfileScreen

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
        backgroundColor: "white",
        height: "100%"
    },
    headerText: {
        textAlign: 'left',
        fontSize: 24,
        fontFamily: "Cormorant Garamond",
        fontWeight: "bold",
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 15
    },
    introductionInput: {
        marginBottom: 15,
        borderWidth: 1.2,
        borderColor: "#36383b",
        fontWeight: '500',
        fontSize: 16,
        minHeight: 100,
        paddingLeft: 20,
        borderRadius: 15,
    },
    picturesContainer: {
        height: 300,
        marginBottom: 10
    },
    pictures: {
        height: 240,
        width: 160,
        marginRight: 20,
        borderWidth: 0.6,
        borderColor: "#36383b",
        borderRadius: 10,
        resizeMode: 'cover',
    },
    addButton: {
        textAlign: 'right',
        fontFamily: "Cormorant Garamond",
        fontSize: 18,
        fontStyle: "italic",
        fontWeight: "bold",
        textDecorationLine: "underline"

    }
})