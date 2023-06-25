import { Pressable, StyleSheet, View, Text, } from 'react-native'
import { useState, useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { editIntroduction } from '../../../api/profile';
import { useAuth } from '../../../contexts/AuthContext';
import ChevronBackButton from '../../Misc/ChevronBackButton';
import ProfileEditHeader from './ProfileEditHeader';

const ProfileEditIntroduction = ({ route, navigation }) => {
    const { user } = useAuth();
    const [newIntroduction, setNewIntroduction] = useState('')
    const { introduction } = route.params;

    useEffect(() => {
        setNewIntroduction(introduction);
    }, [])

    const UpdateIntroduction = () => {
        editIntroduction(user.email, newIntroduction, () => {
            navigation.navigate('Profile')
        })
    }

    return <View style={styles.introductionContainer}>
        <ProfileEditHeader title="Edit Introduction"></ProfileEditHeader>

        <TextInput value={newIntroduction} multiline onChangeText={setNewIntroduction} style={styles.introTextBox}></TextInput>


        <Pressable style={styles.nextButton} onPress={UpdateIntroduction}>
            <Text style={styles.nextButtonText}>Save Changes</Text>
        </Pressable>
    </View>
}

export default ProfileEditIntroduction

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
    nextButton: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#36383b',
        padding: 18,
        borderRadius: 100,
        backgroundColor: "#36383b",
        marginTop: 10,
    },
    nextButtonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
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