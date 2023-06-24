import { FlatList, StyleSheet, View, Text, Pressable, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfilePhotos = ({ profileData }) => {

    const pictureData = [
        {
            id: 1,
            source: require('../../assets/profilepic.webp')
        },
        {
            id: 2,
            source: require('../../assets/gorillaz.jpg')
        },
        {
            id: 3,
            source: require('../../assets/gorillaz.jpg')
        }
    ];

    return <View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Photos</Text>
            <Text style={styles.editButton}><Ionicons name="create-outline"></Ionicons> Edit</Text>

        </View>
        <FlatList
            horizontal
            nestedScrollEnabled
            style={styles.picturesContainer}
            data={pictureData}
            renderItem={({ item }) => {
                return <Pressable>
                    <Image style={styles.pictures} source={item.source} />
                </Pressable>
            }}
            keyExtractor={item => item.id}
        // extraData={selectedPicture}
        />
    </View>
}

export default ProfilePhotos

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
    picturesContainer: {
        height: 300,
        marginTop: 20
    },
    pictures: {
        height: 240,
        width: 160,
        marginRight: 10,
        borderWidth: 0.6,
        borderColor: "#fff",
        borderRadius: 5,
        resizeMode: 'cover',
    },
    editButton: {
        marginTop: 10,
        fontSize: 17,
        fontFamily: "Cormorant Garamond",
        fontStyle: 'italic',
        textAlign: 'right'
    }
})