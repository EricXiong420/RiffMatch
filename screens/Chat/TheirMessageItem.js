import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useState, useEffect } from "react"

const TheirMessageItem = ({message}) => {

    return <View style={styles.messageItemContainer}>
        <Text style={styles.messageContainer}>{message}</Text>
    </View>

}

export default TheirMessageItem

const styles = StyleSheet.create({
    messageItemContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    messageContainer: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        padding: 10,
        marginLeft: 20,
        backgroundColor: 'black',
        color: 'white'
    }
})