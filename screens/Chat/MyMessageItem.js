import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useState, useEffect } from "react"

const MyMessageItem = ({ message, sentAt, isFirstMessage }) => {

    return <View>
        <Text style={styles.messageSentAt}>{isFirstMessage ? sentAt.toDate().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) : null}</Text>
        <View style={isFirstMessage ? styles.firstMessageContainer : styles.bodyMessageContainer}>
            <Text style={styles.messageContainer}>{message}</Text>
        </View>
    </View>

}

export default MyMessageItem

const styles = StyleSheet.create({
    firstMessageContainer: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        maxWidth: '80%',
        padding: 10,
        marginRight: 20,
        borderRadius: 10,
        borderTopRightRadius: 0
    },
    bodyMessageContainer: {
        marginTop: -40,
        marginBottom: 2.5,
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        maxWidth: '80%',
        padding: 10,
        marginRight: 20,
        borderRadius: 10,
        borderTopRightRadius: 0
    },
    messageSentAt: {
        textAlign: 'right',
        marginRight: 20,
        marginTop: 30,
        fontSize: 12,
        color: 'grey'
    }
})