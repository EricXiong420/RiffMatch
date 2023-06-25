import { Pressable, StyleSheet, View, Text, FlatList, Image, Button, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { addPhotoToDB, deleteUserPhoto, getUserPhotoLink } from '../../../api/profile';
import { useAuth } from '../../../contexts/AuthContext';

const ProfileEditPhotos = ({ route, navigation }) => {
    const { user, profileData } = useAuth();
    const [profilePhotos, setProfilePhotos] = useState([])
    const [image, setImage] = useState(null)

    const deletePhoto = (photoUUID) => {
        Alert.alert('Delete Photo', 'Are you sure you want to delete this?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    deleteUserPhoto(user.email, photoUUID)
                }
            },
        ]);
    }

    return <View style={styles.introductionContainer}>
        <FlatList
            horizontal
            nestedScrollEnabled
            style={styles.picturesContainer}
            data={profileData.photos}
            renderItem={({ item }) => {
                return <Pressable>
                    <View style={styles.imageItem}>
                        <Photo photoUUID={item}></Photo>
                        <Ionicons onPress={() => deletePhoto(item)} style={styles.deleteButton} name="trash-outline"></Ionicons>
                    </View>
                </Pressable>
            }}
            keyExtractor={item => item}
        />
        {profileData.photos.length === 0 && <Text>You dont have any photos...</Text>}

        <Button onPress={() => ImagePicker.openPicker({
            width: 320,
            height: 480,
            cropping: true,
        }).then(image => {
            addPhotoToDB(user.email, image.path);
            setImage(image.path)
        })} title="Upload New Photo"></Button>
    </View>
}

const Photo = ({ photoUUID }) => {
    const [photoLink, setPhotoLink] = useState(null);

    useEffect(() => {
        getUserPhotoLink(photoUUID, (url) => setPhotoLink(url))
    }, [])

    return <Image style={styles.pictures} source={{
        uri: photoLink ? photoLink : null,
        cache: 'force-cache'
    }} />

}

export default ProfileEditPhotos

const styles = StyleSheet.create({
    introductionContainer: {
        padding: 20,
        // minHeight: '100%',
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: "Cormorant Garamond",
        fontWeight: "bold",
        flex: 1
    },
    section: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    deleteButton: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,

    },
    introTextBox: {
        borderWidth: 1.5,
        borderColor: '#d1d1d1',
        backgroundColor: 'white',
        borderRadius: 5,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        marginBottom: 10
    },
    // picturesContainer: {
    //     height: 300,
    //     marginTop: 20
    // },
    pictures: {
        height: 240,
        width: 160,
        marginRight: 10,
        borderWidth: 0.6,
        borderColor: "#fff",
        borderRadius: 5,
        resizeMode: 'cover',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    cancel: {
        borderWidth: 1.5,
        borderColor: 'black',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 5,
        marginRight: 10
    },
    cancelText: {
        fontSize: 13,
    },
    confirm: {
        borderWidth: 1.5,
        backgroundColor: 'black',
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5,
        paddingTop: 15,
        paddingBottom: 15,
    },
    confirmText: {
        fontSize: 13,
        color: 'white'
    }
})