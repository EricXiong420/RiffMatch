import { Pressable, StyleSheet, View, Text, FlatList, Image, Button, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../../contexts/AuthContext';
import SoundArt from "../../../assets/sound.png"
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isCancel,
    isInProgress,
    types,
} from 'react-native-document-picker'
import { TextInput } from 'react-native-gesture-handler';
import { addSoundToDB, deleteSoundFromDB } from '../../../api/profile';
import ProfileEditHeader from './ProfileEditHeader';


const ProfileEditSounds = ({ route, navigation }) => {
    const { user, profileData } = useAuth();
    const [result, setResult] = useState([])

    const name = profileData.firstName + ' ' + profileData.lastName;
    useEffect(() => {
        if (result.length > 0) {
            addSoundToDB(user.email, result[0], name)
            setResult([])
        }
    }, [result])



    return <View style={styles.introductionContainer}>
        <ProfileEditHeader title="Edit Sounds"></ProfileEditHeader>

        <FlatList
            style={styles.soundsContainer}
            data={profileData.sounds}
            renderItem={({ item }) => <Sound sound={item}></Sound>}
            keyExtractor={item => item.uuid}
        />

        <Button
            title="Upload New Sound"
            onPress={async () => {
                try {
                    const pickerResult = await DocumentPicker.pickSingle({
                        presentationStyle: 'fullScreen',
                        copyTo: 'cachesDirectory',
                        type: DocumentPicker.types.audio
                    })
                    setResult([pickerResult])
                } catch (e) {
                    handleError(e)
                }
            }}
        />
    </View>
}

const Sound = ({ sound }) => {
    const { user } = useAuth();

    const deleteSound = () => {
        Alert.alert('Delete Sound', 'Are you sure you want to delete this?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    deleteSoundFromDB(user.email, sound)

                }
            },
        ]);
    }

    return <Pressable>
        <Text style={styles.soundName}>{sound.name}</Text>
        <View style={styles.soundItem}>
            <Image style={styles.soundImage} source={SoundArt}></Image>
            <Ionicons onPress={() => deleteSound()} style={styles.deleteButton} name="trash-outline"></Ionicons>
        </View>
    </Pressable>
}

export default ProfileEditSounds

const styles = StyleSheet.create({
    introductionContainer: {
        padding: 20,
        minHeight: '100%',
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
    soundsContainer: {
        marginBottom: 100
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
    },
    soundImage: {
        height: 50,
        width: 300,
        resizeMode: 'contain'
    },
    deleteButton: {
        fontSize: 25,
        marginLeft: 30
    },
    editButton: {
        marginTop: 10,
        fontSize: 17,
        fontFamily: "Cormorant Garamond",
        fontStyle: 'italic',
        textAlign: 'right'
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
})