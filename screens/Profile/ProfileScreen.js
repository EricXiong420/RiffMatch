import { ScrollView, FlatList, StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import Logo from "../../assets/login/logo.png"

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../contexts/AuthContext';
import { getProfileData } from '../../api/profile';
import ProfileInstruments from './ProfileInstruments';
import ProfileIntroduction from './ProfileIntroduction';
import ProfilePhotos from './ProfilePhotos';

const ProfileScreen = () => {
    const { user, profileImage, profileData } = useAuth();

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.top}>
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                    <Pressable style={styles.settings}><Ionicons onPre style={styles.settingsText} name="settings-outline"></Ionicons></Pressable>
                </View>
           
                {/* Main Profile */}
                <View style={styles.mainProfileContainer}>
                    <Image style={styles.profileImage} source={{ uri: profileImage ? profileImage : null, cache: 'force-cache' }}></Image>
                    <View>
                        <Text style={styles.name}>Cheng-Yu Dong</Text>
                        <Text style={styles.connectionStats}>32 Connections</Text>
                    </View>
                </View>
            </View>


            {/* Introduction and Basic Information */}
            <ProfileIntroduction profileData={profileData}></ProfileIntroduction>

            {/* My Images */}
            <ProfilePhotos profileData={profileData}></ProfilePhotos>

            {/* Instruments */}
            <ProfileInstruments profileData={profileData}></ProfileInstruments>

        </ScrollView >
    )
}


export default ProfileScreen

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#fff",
        height: "100%",
        paddingTop: 50,
        paddingLeft: 30,
        paddingRight: 30,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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