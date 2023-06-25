import { FlatList, StyleSheet, View, Text, } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProfileIntroduction = ({ profileData }) => {
    const navigation = useNavigation();

    return <View style={styles.introductionContainer}>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Introduction</Text>
            <Text style={styles.editButton} onPress={() => navigation.navigate("EditIntroduction", { introduction: profileData.introduction })}><Ionicons name="create-outline"></Ionicons> Edit</Text>

        </View>
        <View style={styles.introduction}>
            <Text style={styles.introductionText}>{profileData.introduction}</Text>
        </View>
    </View>
}

export default ProfileIntroduction

const styles = StyleSheet.create({
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
    introduction: {
        alignSelf: "flex-end",
        padding: 15,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: {
            height: 1,
            width: 0
        },
        borderRadius: 6,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    introductionContainer: {
        marginTop: 30
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: "Cormorant Garamond",
        fontWeight: "bold",
    },
    introductionContent: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        marginTop: 10,
        marginBottom: 30,
        backgroundColor: 'white'
    },
    introductionText: {
        color: 'grey',
        lineHeight: 20,
    },
    editButton: {
        fontSize: 17,
        fontFamily: "Cormorant Garamond",
        fontStyle: 'italic',
        textAlign: 'right',
        flex: 1
    }
})