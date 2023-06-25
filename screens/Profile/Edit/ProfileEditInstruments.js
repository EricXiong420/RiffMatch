import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { useAuth } from '../../../contexts/AuthContext';
import { editInstruments } from '../../../api/profile';

const ProfileEditInstruments = () => {
    const navigation = useNavigation();
    const { user } = useAuth()
    const [selected, setSelected] = useState([]);

    const data = [{ "key": 1, "value": "accordion" }, { "key": 2, "value": "air horn" }, { "key": 3, "value": "baby grand piano" }, { "key": 4, "value": "bagpipe" }, { "key": 5, "value": "banjo" }, { "key": 6, "value": "bass guitar" }, { "key": 7, "value": "bassoon" }, { "key": 8, "value": "bugle" }, { "key": 9, "value": "calliope" }, { "key": 10, "value": "cello" }, { "key": 11, "value": "clarinet" }, { "key": 12, "value": "clavichord" }, { "key": 13, "value": "concertina" }, { "key": 14, "value": "didgeridoo" }, { "key": 15, "value": "dobro" }, { "key": 16, "value": "dulcimer" }, { "key": 17, "value": "fiddle" }, { "key": 18, "value": "fife" }, { "key": 19, "value": "flugelhorn" }, { "key": 20, "value": "flute" }, { "key": 21, "value": "French horn" }, { "key": 22, "value": "glockenspiel" }, { "key": 23, "value": "grand piano" }, { "key": 24, "value": "guitar" }, { "key": 25, "value": "harmonica" }, { "key": 26, "value": "harp" }, { "key": 27, "value": "harpsichord" }, { "key": 28, "value": "hurdy-gurdy" }, { "key": 29, "value": "kazoo" }, { "key": 30, "value": "kick drum" }, { "key": 31, "value": "lute" }, { "key": 32, "value": "lyre" }, { "key": 33, "value": "mandolin" }, { "key": 34, "value": "marimba" }, { "key": 35, "value": "mellotran" }, { "key": 36, "value": "melodica" }, { "key": 37, "value": "oboe" }, { "key": 38, "value": "pan flute" }, { "key": 39, "value": "piano" }, { "key": 40, "value": "piccolo" }, { "key": 41, "value": "pipe organ" }, { "key": 42, "value": "saxaphone" }, { "key": 43, "value": "sitar" }, { "key": 44, "value": "sousaphone" }, { "key": 45, "value": "tambourine" }, { "key": 46, "value": "theremin" }, { "key": 47, "value": "trombone" }, { "key": 48, "value": "tuba" }, { "key": 49, "value": "ukulele" }, { "key": 50, "value": "viola" }, { "key": 51, "value": "violin" }, { "key": 52, "value": "vuvuzela" }, { "key": 53, "value": "washtub bass" }, { "key": 54, "value": "xylophone" }, { "key": 55, "value": "zither" }]


    const UpdateInstruments = () => {
        editInstruments(user.email, selected);
        navigation.navigate("Profile")
    }

    return (
        <KeyboardAvoidingView
            styles={styles.container}
            behaviour="padding">
            <View style={styles.mainContainer}>
                <Text style={styles.tip}>Please select the instruments you play</Text>

                <MultipleSelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    label="Instruments"
                />
                <Pressable style={styles.nextButton} onPress={UpdateInstruments}>
                    <Text style={styles.nextButtonText}>Done</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ProfileEditInstruments

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
    tip: {
        marginBottom: 20
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
    loginButtonText: {
        textAlign: 'right',
        fontFamily: "Cormorant Garamond",
        fontSize: 25,
        fontWeight: '600',
        textDecorationLine: 'underline'

    },
    otherSignInText: {
        fontFamily: "Cormorant Garamond",
        textAlign: 'center',
        fontSize: 20
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

})