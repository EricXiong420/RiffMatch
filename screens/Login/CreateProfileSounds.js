import { Alert, FlatList, StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, Button } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isCancel,
    isInProgress,
    types,
} from 'react-native-document-picker'
import { useAuth } from '../../contexts/AuthContext';
import Sound from '../Home/Sound';
import { DeletableSound } from '../Home/Sound';
import { addSoundToDB } from '../../api/profile';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateProfileSounds = () => {
    const navigation = useNavigation();
    const [sound, setSound] = useState([])

    const { user, profileData } = useAuth();

    const updateProfile = () => {
        navigation.navigate("CreateProfileImage");
    }

    useEffect(() => {
        if (sound.length > 0) {
            const name = profileData.firstName + ' ' + profileData.lastName
            addSoundToDB(user.email, sound[0], name)
            setSound([])
        }
    }, [sound])



    return <SafeAreaView>
    <KeyboardAvoidingView behaviour="padding">
    <View style={styles.mainContainer}>
        <Text style={styles.pageTitle}>Create Profile: Sounds</Text>

        {profileData.sounds?.map((sound, index) => (<DeletableSound key={index} sound={sound} trackIndex={index} />))}

        <Button
            title="Upload New Sound"
            onPress={async () => {
                try {
                    const pickerResult = await DocumentPicker.pickSingle({
                        presentationStyle: 'fullScreen',
                        copyTo: 'cachesDirectory',
                        type: DocumentPicker.types.audio
                    })
                    setSound([pickerResult])
                } catch (e) {
                    console.log(e);
                }
            }}
        />
        <Pressable style={styles.nextButton} onPress={updateProfile}>
            <Text style={styles.nextButtonText}>Next Step</Text>
        </Pressable>
    </View>
    </KeyboardAvoidingView>
    </SafeAreaView>

    
}

export default CreateProfileSounds

const styles = StyleSheet.create({
    mainContainer: {
        padding: 15,
        backgroundColor: "white",
        height: "100%"
    },
    soundsContainer: {
        marginBottom: 100
    },
    pageTitle: {
        fontSize: 30,
        fontFamily: "Cormorant Garamond",
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 50
    },
    loginInput: {
        marginBottom: 15,
        borderWidth: 2,
        borderColor: "#36383b",
        fontWeight: "bold",
        fontSize: 16,
        height: 50,
        paddingLeft: 20,
        borderRadius: 10,
    },
    genderDropdown: {
        backgroundColor: "white",
        width: '100%',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: "#36383b",
        fontWeight: "bold",
        fontSize: 16,
        height: 50,
        paddingLeft: 20,
        borderRadius: 10,
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

    },
    loginButton: {
        marginTop: 5,
        textAlign: 'right'
    },
    soundName: {
        fontFamily: "Cormorant Garamond",
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 15
    },
    soundItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
})