import { Pressable, StyleSheet, View, Text, } from 'react-native'
import { useAuth } from '../../contexts/AuthContext';
import ChevronBackButton from "../Misc/ChevronBackButton";

const SettingsScreen = () => {
    const { handleSignout } = useAuth();

    return <View style={styles.settingsContainer}>
        <View style={styles.profileEditHeader}>
            <ChevronBackButton backTo='Profile'></ChevronBackButton>
            <Text style={styles.profileEditHeaderText}>Settings</Text>
        </View>
        <Pressable style={styles.nextButton} onPress={handleSignout}>
            <Text style={styles.nextButtonText}>Signout</Text>
        </Pressable>
    </View>
}

export default SettingsScreen;


const styles = StyleSheet.create({
    settingsContainer: {
        padding: 20
    },
    profileEditHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    profileEditHeaderText: {
        fontFamily: "Cormorant Garamond",
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 47,
        marginLeft: 15,
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
})