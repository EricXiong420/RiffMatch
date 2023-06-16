import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import ChatUserItem from './ChatUserItem';

const ChatScreen = () => {
    const navigation = useNavigation();
    const [usersList, setUsersList] = useState([]);
    const [profileImage, setProfileImage] = useState('');
    const [user, setUser] = useState({})

    // Listens to changes to the users collection and updates
    // list of users.
    useEffect(() => {
        const subscriber = firestore()
            .collection('users')
            .doc(user.email)
            .onSnapshot(documentSnapshot => {
                // Update the messaged users list when change detected
                setUsersList(documentSnapshot.data().messagedUsers)
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [user.email]);

    const onAuthStateChanged = async (user) => {
        if (user) {
            const data = await firestore().collection('users').doc(user.email).get();
            setUser({ ...data._data, email: user.email });
            const url = await storage().ref(`profile-images/${user.email}.png`).getDownloadURL();
            setProfileImage(url)
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    return <KeyboardAvoidingView style={styles.chatScreenContainer}>
        <View style={styles.topBar}><Text style={styles.title}>Chat</Text>
            <Pressable onPress={() => navigation.navigate('Profile')}><Image source={{
                uri: profileImage ? profileImage : null,
                cache: 'force-cache'
            }} style={styles.profile}></Image>
            </Pressable></View>

        <View style={styles.chatUsers}>
            {usersList?.map(userItem => {
                return <ChatUserItem key={userItem} user={userItem} currentUserEmail={user.email}></ChatUserItem>
            })}
        </View>

    </KeyboardAvoidingView>

}

export default ChatScreen

const styles = StyleSheet.create({
    chatScreenContainer: {
        paddingTop: 50,
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
        marginLeft: 20,
        flex: 1
    },
    profile: {
        width: 35,
        height: 35,
        borderRadius: 1000,
        borderWidth: 1,
        marginRight: 20,
        borderColor: "black"
    },
    chatUsers: {
        marginTop: 20
    }
})