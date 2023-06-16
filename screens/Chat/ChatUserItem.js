import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useState, useEffect } from "react"
import storage from '@react-native-firebase/storage';
import firestore, {Filter} from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ChatUserItem = ({ user, currentUserEmail }) => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState('');
    const [userInfo, setUserInfo] = useState({})
    const [lastMessage, setLastMessage] = useState({})

    const getUserInfo = async () => {
        const data = await firestore().collection('users').doc(user).get();
        setUserInfo({ ...data._data, user });
        const url = await storage().ref(`profile-images/${user}.png`).getDownloadURL();
        setProfileImage(url)
    }

    useEffect(() => {
        const subscriber = firestore()
        .collection('messages')
        .where('from', '==', user)
        .where('to', '==', currentUserEmail)
        .orderBy('time')
        .limit(1)
        .onSnapshot(documentSnapshot => {
            if(documentSnapshot) {
                console.log(documentSnapshot._docs)
                setLastMessage(documentSnapshot._docs[0]._data)
            }
        });
  
      // Stop listening for updates when no longer required
      return () => subscriber();
    }, [user]);

    useEffect(() => {
        getUserInfo();
    }, [user]);

    return <Pressable onPress={() => navigation.navigate('MessageScreen')} style={styles.chatItemContainer}>
        <Image source={{ uri: profileImage ? profileImage : null }} style={styles.profile}></Image>
        <View>
            <View style={styles.nameAndTime}>
                <Text style={styles.name}>{userInfo.firstName} {userInfo.lastName}</Text>
                <Text style={styles.time}>11:52pm</Text>
            </View>
            <Text style={styles.lastMessage}>{lastMessage?.message}</Text>
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
        paddingLeft: 20,
        marginTop: 20,
        alignItems: 'center',
        width: '100%'
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 1000,
        borderWidth: 1,
        marginRight: 20,
        borderColor: "black"
    },
    nameAndTime: {
        display: 'flex',
        flexDirection: 'row',
        width: 270,
    },
    name: {
        fontWeight: 'bold',
        flex: 1
    },
    time: {
        color: 'grey'
    },
    lastMessage: { color: 'grey', marginTop: 5 }
})