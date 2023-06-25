import { FlatList, StyleSheet, View, Text, Pressable, Image } from 'react-native'
import { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { getUserPhotoLink } from '../../api/profile';

const ProfilePhotos = () => {
    const { user, profileData } = useAuth()
    const navigation = useNavigation();

    return <View>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Photos</Text>
            <Text style={styles.editButton} onPress={() => navigation.navigate('EditPhotos')}><Ionicons name="create-outline"></Ionicons> Edit</Text>

        </View>
        <FlatList
            horizontal
            nestedScrollEnabled
            style={styles.picturesContainer}
            data={profileData.photos}
            renderItem={({ item }) => {
                return <Pressable>
                    <Photo photoUUID={item}></Photo>
                </Pressable>
            }}
            keyExtractor={item => item}
        />
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

export default ProfilePhotos

const styles = StyleSheet.create({
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
    picturesContainer: {
        height: 300,
        marginTop: 20
    },
    pictures: {
        height: 240,
        width: 160,
        marginRight: 10,
        borderWidth: 0.6,
        borderColor: "#fff",
        borderRadius: 5,
        resizeMode: 'cover',
    },
    editButton: {
        marginTop: 10,
        fontSize: 17,
        fontFamily: "Cormorant Garamond",
        fontStyle: 'italic',
        textAlign: 'right'
    }
})