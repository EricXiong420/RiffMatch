import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useState, useEffect } from "react"

const TheirMessageItem = ({ message, sentAt, isFirstMessage }) => {

    return <View>
        <Text style={styles.messageSentAt}>{isFirstMessage ? sentAt.toDate().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) : null}</Text>
        <View style={isFirstMessage ? styles.firstMessageContainer : styles.bodyMessageContainer}>
            <Text style={styles.messageText}>{message}</Text>
        </View>
    </View>

}

export default TheirMessageItem

const styles = StyleSheet.create({
    firstMessageContainer: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#404040',
        alignSelf: 'flex-start',
        maxWidth: '80%',
        padding: 10,
        marginLeft: 20,
        borderRadius: 10,
        borderTopLeftRadius: 0
    },
    bodyMessageContainer: {
        marginTop: -40,
        marginBottom: 2.5,
        backgroundColor: '#404040',
        alignSelf: 'flex-start',
        maxWidth: '80%',
        padding: 10,
        marginLeft: 20,
        borderRadius: 10,
        borderTopLeftRadius: 0
    },
    messageText: {
        color: 'white'
    },
    messageSentAt: {
        textAlign: 'left',
        marginLeft: 20,
        marginTop: 30,
        fontSize: 12,
        color: 'grey'
    }
})