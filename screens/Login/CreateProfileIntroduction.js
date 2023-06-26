import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import firestore from '@react-native-firebase/firestore';

const CreateProfileIntroduction = ({ route }) => {
    const userInfo = route.params;
    const navigation = useNavigation();
    const [introduction, setIntroduction] = useState('');

    const { user, setFirstTimeUser } = useAuth();

    const updateProfile = async () => {
        const newUserInfo = {
            ...userInfo,
            introduction: introduction
        }
        await firestore().collection('users')
            .doc(user.email)
            .set({
                ...newUserInfo,
                gender: newUserInfo.gender.toLowerCase(),
                created: new Date()
            })
        await setFirstTimeUser(false);
        navigation.navigate("CreateProfileSounds");
    }

    return (
        <SafeAreaView>
        <KeyboardAvoidingView
            styles={styles.container}
            behaviour="padding">
            <View style={styles.mainContainer}>
                <Text style={styles.pageTitle}>Create Profile: Introduction</Text>
                <TextInput placeholder={"I'm looking to start a band..."} value={introduction} multiline onChangeText={setIntroduction} style={styles.introTextBox}></TextInput>

                <Pressable style={styles.nextButton} onPress={updateProfile}>
                    <Text style={styles.nextButtonText}>Next Step</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default CreateProfileIntroduction

const styles = StyleSheet.create({
    mainContainer: {
        padding: 15,
        backgroundColor: "white",
        height: "100%"
    },
    pageTitle: {
        fontSize: 30,
        fontFamily: "Cormorant Garamond",
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 50
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
    logo: {
        marginBottom: 40,
        width: 280,
        height: 200,
        marginLeft: 50,
        resizeMode: 'contain'
    },
    info: {
        color: "red",
        marginTop: 20,
        marginBottom: 20
    },
    nextButton: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#36383b',
        padding: 18,
        borderRadius: 100,
        backgroundColor: "#36383b",
        marginTop: 50,
    },
    nextButtonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'

    }

})