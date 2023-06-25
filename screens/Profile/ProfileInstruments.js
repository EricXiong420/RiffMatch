import { FlatList, StyleSheet, View, Text, } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProfileInstruments = ({ profileData }) => {
    const navigation = useNavigation();
    return <View>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Instruments</Text>
            <Text style={styles.editButton} onPress={() => navigation.navigate("EditInstruments")}><Ionicons name="create-outline"></Ionicons> Edit</Text>
        </View>
        <View style={styles.instrumentsList}>
            {profileData.instruments.map(instrument => {
                return <View key={instrument} style={styles.instrumentTag}>
                    <Text style={styles.instrumentTagText}>{instrument}</Text>
                </View>
            })}
        </View>
    </View>
}

export default ProfileInstruments

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
    instrumentsList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 30
    },
    instrumentTag: {
        backgroundColor: '#fff',
        marginRight: 5,
        marginTop: 10,
    },
    instrumentTagText: {
        color: '#4a4848',
        borderColor: '#ababab',
        textTransform: 'uppercase',
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 3,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    editButton: {
        marginTop: 10,
        fontSize: 17,
        fontFamily: "Cormorant Garamond",
        fontStyle: 'italic',
        textAlign: 'right'
    }
})