import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateProfileBasic = () => {
    const userInfo = {
        firstName: "",
        lastName: "",
        gender: "",
        instruments: [],
        genres: [],
        introduction: "",
        photos: [],
        sounds: [],
        swipedLeft: [],
        swipedRight: []
      }
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const genders = ["Male", "Female", "Other"]

    const updateProfile = () => {
        const newUserInfo = {
            ...userInfo,
            firstName: firstName,
            lastName: lastName,
            gender: gender
        }
        console.log(newUserInfo)
        navigation.navigate("CreateProfileInstruments", newUserInfo);
    }

    return (
        <SafeAreaView>
        <KeyboardAvoidingView
            styles={styles.container}
            behaviour="padding">
            <View style={styles.mainContainer}>
                <Text style={styles.pageTitle}>Create Profile: Basics</Text>
                <TextInput value={firstName} onChangeText={setFirstName} placeholder='First Name' style={styles.loginInput}></TextInput>
                <TextInput value={lastName} onChangeText={setLastName} placeholder='Last Name' style={styles.loginInput}></TextInput>
                <SelectDropdown
                    defaultButtonText='Please select your gender'
                    buttonStyle={styles.genderDropdown}
                    data={genders}
                    onSelect={(selectedItem, index) => {
                        setGender(selectedItem)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                />

                <Pressable style={styles.nextButton} onPress={updateProfile}>
                    <Text style={styles.nextButtonText}>Next Step</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default CreateProfileBasic

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

})