import { Pressable, StyleSheet, View, Text, } from 'react-native'
import ChevronBackButton from "../../Misc/ChevronBackButton";

const ProfileEditHeader = ({ title }) => {
    return <View style={styles.profileEditHeader}>
        <ChevronBackButton backTo='Profile'></ChevronBackButton>
        <Text style={styles.profileEditHeaderText}>{title}</Text>
    </View>
}

export default ProfileEditHeader;


const styles = StyleSheet.create({
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
    }
})