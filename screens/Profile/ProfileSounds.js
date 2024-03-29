import { FlatList, StyleSheet, View, Text, Pressable, Image } from 'react-native'
import { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import Sound from '../Home/Sound';

const ProfileSounds = () => {
    const { user, profileData } = useAuth()
    const navigation = useNavigation();

    return <View style={styles.soundsContainer}>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Sounds</Text>
            <Text style={styles.editButton} onPress={() => navigation.navigate('EditSounds')}><Ionicons name="create-outline"></Ionicons> Edit</Text>

        </View>
        {profileData?.sounds?.map((sound, index) => <Sound key={sound.uuid} sound={sound} trackIndex={index} theme="light" ></Sound>)
        }
    </View>
}

export default ProfileSounds

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
    soundsContainer: {
        marginTop: 20,
        marginBottom: 100
    },
    soundName: {
        fontFamily: "Cormorant Garamond",
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 15
    },
    soundImage: {
        height: 50,
        width: 320,
        resizeMode: 'contain'
    },
    editButton: {
        marginTop: 10,
        fontSize: 17,
        fontFamily: "Cormorant Garamond",
        fontStyle: 'italic',
        textAlign: 'right'
    }
})