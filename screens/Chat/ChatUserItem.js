import { StyleSheet, View, Pressable, Text, Image } from 'react-native'
import { useState, useEffect } from "react"
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

const ChatUserItem = ({ chatData }) => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [profileImage, setProfileImage] = useState('');
    const [userInfo, setUserInfo] = useState({})

    const getUserInfo = async () => {
        const messageToEmail = chatData.members.filter(email => email !== user.email)[0];
        const data = await firestore().collection('users').doc(messageToEmail).get();
        setUserInfo({ ...data._data, user: messageToEmail });
        const url = await storage().ref(`profile-images/${messageToEmail}.png`).getDownloadURL();
        setProfileImage(url)
    }

    useEffect(() => {
        getUserInfo();
    }, [user]);

    return <Pressable onPress={() => navigation.navigate('MessageScreen', { userInfo: { ...userInfo, profileImage, from: user.email } })} style={styles.chatItemContainer}>
        <Image source={{
            uri: profileImage ? profileImage : null,
            cache: 'force-cache'
        }} style={styles.profile}></Image>
        <View>
            <View style={styles.nameAndTime}>
                <Text style={styles.name}>{userInfo.firstName} {userInfo.lastName}</Text>
                <Text style={styles.time}>{chatData.recentMessageSentAt?.toDate().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
            <Text style={styles.lastMessage} numberOfLines={1}>{chatData.recentMessageText}</Text>
        </View>
    </Pressable>

}

export default ChatUserItem

const styles = StyleSheet.create({
    chatItemContainer: {
        backgroundColor: 'white',
        height: 50,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 30,
        marginTop: 20,
        alignItems: 'center',
        width: '100%'
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 1000,
        marginRight: 20
    },
    nameAndTime: {
        display: 'flex',
        flexDirection: 'row',
        width: 250,
    },
    name: {
        fontWeight: 'bold',
        flex: 1
    },
    time: {
        color: 'grey'
    },
    lastMessage: {
        color: 'grey', 
        marginTop: 5,
        height: 20,
        width: 200
    }
})