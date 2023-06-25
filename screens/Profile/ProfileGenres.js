import { FlatList, StyleSheet, View, Text, } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileGenres = ({ profileData }) => {
    return <View>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Genres</Text>
            <Text style={styles.editButton} ><Ionicons name="create-outline"></Ionicons> Edit</Text>
        </View>
        <FlatList
            style={styles.instrumentsList}
            data={profileData.instruments}
            horizontal
            renderItem={({ item }) => {
                return <View style={styles.instrumentTag}>
                    <Text style={styles.instrumentTagText}>{item}</Text>
                </View>
            }}
        ></FlatList>
    </View>
}

export default ProfileGenres

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
        marginBottom: 100
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