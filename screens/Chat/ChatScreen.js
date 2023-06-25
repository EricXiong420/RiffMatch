import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import ChatUserItem from './ChatUserItem';
import { useMessages } from '../../contexts/messages';
import { useAuth } from '../../contexts/AuthContext';
import { TextInput } from 'react-native-gesture-handler';

const ChatScreen = () => {
    const { user, profileImage } = useAuth()
    const navigation = useNavigation();
    const messageContext = useMessages()
    const [usersList, setUsersList] = useState([]);
    // const [profileImage, setProfileImage] = useState('');
    const [search, setSearch] = useState('')

    useEffect(() => {
        updateData()
    }, [user, messageContext])

    const updateData = async () => {
        if (user) {
            let list = [];
            messageContext.state.forEach(item => {
                list.push({
                    to: item.members.filter(ite => ite !== user.email)[0],
                    ...item
                })
            })
            setUsersList(list)
        }
    }



    return <KeyboardAvoidingView style={styles.chatScreenContainer}>
        <View style={styles.topBar}><Text style={styles.title}>Chat</Text>
            <Pressable onPress={() => navigation.navigate('Profile')}><Image source={{
                uri: profileImage ? profileImage : null,
                cache: 'only-if-cached'
            }} style={styles.profile}></Image>
            </Pressable></View>

        <View style={styles.chatUsers}>
            <FlatList data={usersList}
                renderItem={({ item }) => <ChatUserItem key={item.chatId} chatData={item} />}>
            </FlatList>
        </View>

    </KeyboardAvoidingView>

}

export default ChatScreen

const styles = StyleSheet.create({
    chatScreenContainer: {
        paddingTop: 60,
        backgroundColor: 'white',
        minHeight: '100%'
    },
    topBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontFamily: "Cormorant Garamond",
        fontWeight: "bold",
        fontSize: 30,
        marginLeft: 30,
        flex: 1
    },
    profile: {
        width: 35,
        height: 35,
        borderRadius: 1000,
        marginRight: 30
    },
    chatUsers: {
        marginTop: 20,
    },
})