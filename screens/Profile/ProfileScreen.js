import { ScrollView, SafeAreaView, StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import Logo from "../../assets/login/logo.png"

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../contexts/AuthContext';
import { getProfileData } from '../../api/profile';
import ProfileInstruments from './ProfileInstruments';
import ProfileIntroduction from './ProfileIntroduction';
import ProfilePhotos from './ProfilePhotos';
import ProfileGenres from './ProfileGenres';
import ProfileSounds from './ProfileSounds';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const { user, profileImage, profileData } = useAuth();
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
                <Pressable style={styles.settings} onPress={() => navigation.navigate('Settings')}><Ionicons style={styles.settingsText} name="settings-outline"></Ionicons></Pressable>
            </View>

            <ScrollView style={styles.mainContainer}>
                <View style={styles.top}>


                    {/* Main Profile */}
                    <View style={styles.mainProfileContainer}>
                        <Image style={styles.profileImage} source={{ uri: profileImage ? profileImage : null, cache: 'force-cache' }}></Image>
                        <View>
                            <Text style={styles.name}>{profileData.firstName} {profileData.lastName}</Text>
                            <Text style={styles.connectionStats}>NA Connections</Text>
                        </View>
                    </View>
                </View>


                {/* Introduction and Basic Information */}
                <ProfileIntroduction profileData={profileData}></ProfileIntroduction>

                {/* My Images */}
                <ProfilePhotos profileData={profileData}></ProfilePhotos>

                {/* Instruments */}
                <ProfileInstruments profileData={profileData}></ProfileInstruments>

                {/* Genres */}
                <ProfileGenres profileData={profileData}></ProfileGenres>

                {/* Sounds */}
                <ProfileSounds profileData={profileData}></ProfileSounds>

            </ScrollView >
        </SafeAreaView>

    )
}


export default ProfileScreen

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#fff",
        paddingLeft: 30,
        paddingRight: 30,
        flex: 0
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: -50,
        paddingTop: 50,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 15,
        borderBottomColor: '#f5f5f5',
        // borderWidth: 1
    },
    title: {
        fontFamily: "Cormorant Garamond",
        fontWeight: "bold",
        fontSize: 30,
        flexGrow: 1
    },
    settings: {
        flexGrow: 1,
    },
    settingsText: {
        textAlign: 'right',
        fontSize: 25
    },
    mainProfileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 100
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 30
    },
    connectionStats: {
        marginLeft: 20,
        color: 'grey',
        marginTop: 5
    },
    introductionContainer: {
        marginTop: 30
    },
})