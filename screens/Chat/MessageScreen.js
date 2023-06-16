import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import {useState, useEffect} from "react"

const MessageScreen = () => {
    return <View style={styles.chatItemContainer}>
        <Text>Message</Text>
    </View>

}

export default MessageScreen

const styles = StyleSheet.create({
    chatItemContainer: {
        backgroundColor: 'white',
        height: 50,
        marginBottom: 5
    }
})