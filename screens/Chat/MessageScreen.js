import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react"
import MyMessageItem from './MyMessageItem';

const MessageScreen = ({ route, navigation }) => {
    const [messages, setMessages] = useState([])
    const [textMessage, setTextMessage] = useState("")
    const { userInfo } = route.params;

    const saveMessage = async () => {
        try {
            if (messages.length > 0) {
                const jsonValue = JSON.stringify(messages)
                await AsyncStorage.setItem('@messages', jsonValue)
            }

        } catch (e) {
            // saving error
            console.log(e)
        }
    }

    useEffect(() => {
        saveMessage();
    }, [messages])

    const sendMessage = () => {
        if (textMessage !== "") {
            setMessages([...messages, { message: textMessage, time: new Date(), to: userInfo.user, from: userInfo.from }]);
            setTextMessage("")
        }
    }

    const getMessages = async () => {
        // await AsyncStorage.removeItem('@messages')
        try {
            const value = await AsyncStorage.getItem('@messages')
            if (value !== null) {
                setMessages(JSON.parse(value))
                console.log(value)
            } 
        } catch (e) {
            // error reading value
            console.log(e)
        }
    }

    // Get the initial messages stored in local storage
    useEffect(() => {
        getMessages();
    }, [])

    return <KeyboardAvoidingView behavior={"height"} style={styles.chatItemContainer}>
        <View style={styles.headerBar}>
            <Pressable onPress={() => navigation.navigate("Chat")} style={styles.backButton}>
                <Text style={styles.buttonBack}>‹</Text>
            </Pressable>
            <View>
                <Image source={{
                    uri: userInfo.profileImage ? userInfo.profileImage : null,
                    cache: 'only-if-cached'
                }} style={styles.profile}></Image>
            </View>
            <Text style={styles.name}>{userInfo.firstName} {userInfo.lastName}</Text>
        </View>

        {messages.filter(message => message.to == userInfo.user).map(message => {
            return <MyMessageItem key={message.message} message={message.message}></MyMessageItem>
        })}

        <View style={styles.keyboardEntry}>
            <TextInput
                multiline={true} value={textMessage} style={styles.messageInput} onChangeText={setTextMessage} placeholder="Enter your message here..."></TextInput>
            <Pressable onPress={sendMessage}><Text>Send</Text></Pressable>
        </View>

    </KeyboardAvoidingView>

}

export default MessageScreen

const styles = StyleSheet.create({
    chatItemContainer: {
        marginBottom: 5,
        flex: 1,
    },
    headerBar: {
        paddingTop: 60,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingBottom: 20
    },
    buttonBack: {
        fontSize: 40,
        marginRight: 20
    },
    profile: {
        width: 40,
        height: 40,
        borderRadius: 100
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 10
    },
    keyboardEntry: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    messageInput: {
        marginLeft: 20,
        width: "80%",
        backgroundColor: '#e8e8e8',
        marginBottom: 20,
        marginTop: 20,
        marginRight: 10,
        borderRadius: 20,
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 20
    }
})
