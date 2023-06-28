import { StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, Button } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import { useAuth } from '../../contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateProfileImage = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState('');

    const { user } = useAuth();

    const updateProfile = async () => {
        const reference = storage().ref(`profile-images/${user.email}.png`);
        await reference.putFile(image);

        navigation.navigate("HomeScreen");
    }

    return (
        <SafeAreaView>
        <KeyboardAvoidingView
            behaviour="padding">
            <View style={styles.mainContainer}>
                <Text style={styles.pageTitle}>Create Profile: Image</Text>

               <Image style={styles.profileImage} source={{ uri: image ? image : null }}></Image>

                <Button onPress={() => ImagePicker.openPicker({
                    width: 300,
                    height: 300,
                    cropping: true,
                    includeBase64: true
                }).then(image => {
                    setImage(image.path)
                })} title="Select Photo"></Button>

                <Pressable style={styles.nextButton} onPress={updateProfile}>
                    <Text style={styles.nextButtonText}>Start using RiffMatch!</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView >
        </SafeAreaView>
    )
}

export default CreateProfileImage

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
    profileImage: {
        width: 300,
        height: 300,
        borderRadius: 1000,
        marginBottom: 50,
        alignSelf: 'center'
    }

})