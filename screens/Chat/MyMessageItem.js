import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useState, useEffect } from "react"

const MyMessageItem = ({message}) => {

    return <View style={styles.messageItemContainer}>
        <Text style={styles.messageContainer}>{message}</Text>
    </View>

}

export default MyMessageItem

const styles = StyleSheet.create({
    messageItemContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    messageContainer: {
        textAlign: 'right',
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        padding: 10,
        marginRight: 20
    }
})