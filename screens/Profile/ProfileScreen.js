import { ScrollView, FlatList, StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore'; 

const ProfileScreen = () => {
    const [introduction, setIntroduction] = useState('');
    const [boxHeight, setBoxHeight] = useState(80);
    const [selectedPicture, setSelectedPicture] = useState();
        
    const Introduction = () => {
        return (
            <>
            <Text style={styles.headerText}>my introduction</Text>
            <TextInput
                multiline
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={setIntroduction} 
                onContentSizeChange={event => setBoxHeight(event.nativeEvent.contentSize.height)}
                value={introduction} 
                scrollEnabled={false}
                placeholder="I'm planning to form a band..."
                style={[styles.introductionInput, {height: boxHeight + 20}]} // only way i can find to not cutt off text
            />
            </>
        )
    }

    const Pictures = () => {
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

        const renderPicture = ({item}) => {
            return (
                <Pressable onPress={() => setSelectedPicture(item.id)}>
                    <Image style={styles.pictures} source={item.source} />
                </Pressable>
            )
        }

        const handleAddPictures = () => {
            // navigate to add pages page
        }
        return (
            <>
            <Text style={styles.headerText}>my pictures</Text>
            <FlatList
                horizontal
                style={styles.picturesContainer}
                data={pictureData}
                renderItem={renderPicture}
                keyExtractor={item => item.id}
                extraData={selectedPicture}
            />
            <Pressable onPress={handleAddPictures} >
                <Text style={styles.addButton} >add more pictures...</Text>
            </Pressable>
            </>
        )
    }

    return (
        <ScrollView style={styles.mainContainer}> 
            <Introduction />
            <Pictures />
        </ScrollView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
        backgroundColor: "white",
        height: "100%"
    },
    headerText: {
        textAlign: 'left',
        fontSize: 24,
        fontFamily: "Cormorant Garamond",
        fontWeight: "bold",
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 15
    },
    introductionInput: {
        marginBottom: 15,
        borderWidth: 1.2,
        borderColor: "#36383b",
        fontWeight: '500',
        fontSize: 16,
        minHeight: 100,
        paddingLeft: 20,
        borderRadius: 15,
    },
    picturesContainer: {
        height: 300,
        marginBottom: 10
    },
    pictures: {
        height: 240,
        width: 160,
        marginRight: 20,
        borderWidth: 0.6,
        borderColor: "#36383b",
        borderRadius: 10,
        resizeMode: 'cover',
    },
    addButton: {
        textAlign: 'right',
        fontFamily: "Cormorant Garamond",
        fontSize: 18,
        fontStyle: "italic",
        fontWeight: "bold",
        textDecorationLine: "underline"

    }
})