import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useRef } from "react"
import MyMessageItem from './MyMessageItem';
import { AuthProvider, useAuth } from "../../contexts/AuthContext"
import { useMessages } from '../../contexts/messages';
import { sendMessage } from '../../api/messages';
import TheirMessageItem from './TheirMessageItem';

const MessageScreen = ({ route, navigation }) => {
    const messageContext = useMessages()
    const [messages, setMessages] = useState([])
    const [textMessage, setTextMessage] = useState("")
    const [chatId, setChatId] = useState('')
    const { userInfo } = route.params;

    // Grab the messages from messageContext
    useEffect(() => {
        const currentChatData = messageContext.state.filter(group => group.members.includes(userInfo.user))[0]
        setMessages(currentChatData.messages)
        setChatId(currentChatData.chatId)
    }, [messageContext.state])

    const send = () => {
        if (textMessage !== "") {
            sendMessage({
                updatedMessages: [...messages, { message: textMessage, sentBy: userInfo.from, sentAt: new Date() }],
                newMessage: { message: textMessage, sentBy: userInfo.from, sentAt: new Date() },
                chatId
            })
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


        <FlatList
            style={styles.messagesFlatList}
            inverted
            data={[...messages].reverse()}
            maxToRenderPerBatch={2}
            initialNumToRender={2}
            renderItem={({ item, index }) => {
                const isFirstMessage = [...messages].reverse()[index].sentBy !== [...messages].reverse()[index + 1]?.sentBy
                if (item.sentBy == userInfo.user) {
                    return <TheirMessageItem isFirstMessage={isFirstMessage} message={item.message} sentAt={item.sentAt}></TheirMessageItem>
                } else {
                    return <MyMessageItem isFirstMessage={isFirstMessage} message={item.message} sentAt={item.sentAt} />

                }
            }}>
        </FlatList>

        <View style={styles.keyboardEntry}>
            <TextInput
                multiline={true} value={textMessage} style={styles.messageInput} onChangeText={setTextMessage} placeholder="Enter your message here..."></TextInput>
            <Pressable onPress={send}><Text>Send</Text></Pressable>
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
    },
    messagesFlatList: {
        marginBottom: 100
    }
})
