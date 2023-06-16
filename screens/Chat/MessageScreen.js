import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useState, useEffect } from "react"
import MyMessageItem from './MyMessageItem';

const MessageScreen = ({ route, navigation }) => {
    const [messages, setMessages] = useState([])
    const [textMessage, setTextMessage] = useState("")
    const { userInfo } = route.params;

    const sendMessage = () => {
        if (textMessage !== "") {
            messages.push({ message: textMessage });
            setTextMessage("")
        }
    }

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

        {messages.map(message => {
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