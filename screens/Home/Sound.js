import {
    StyleSheet,
    Alert,
    View,
    Pressable,
    Text
  } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
import { getUserSoundLink, deleteSoundFromDB } from "../../api/profile";
import AudioPlayer from "./AudioPlayer";

export default function Sound({ sound, trackIndex, theme = 'dark' }) {
    const [audioLink, setAudioLink] = useState(null);

    useEffect(() => {
        getUserSoundLink(sound.uuid, (url) => setAudioLink(url))
        console.log(trackIndex)
    }, []);

    const track = {
        id: trackIndex,
        url: audioLink,
        title: sound.name,
        artist: sound.artist
    }

    return (<AudioPlayer key={trackIndex} track={track} theme={theme} />)
}

export function DeletableSound({ sound, trackIndex }) {
    const { user } = useAuth();
    const deleteSound = () => {
        Alert.alert('Delete Sound', 'Are you sure you want to delete this?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    deleteSoundFromDB(user.email, sound)

                }
            },
        ]);
    }

    return <Pressable>
        <View style={styles.soundItem}>
            <Sound sound={sound} trackIndex={trackIndex} theme={'light'} />
            <Ionicons onPress={() => deleteSound()} style={styles.deleteButton} name="trash-outline"></Ionicons>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    soundName: {
        fontFamily: "Cormorant Garamond",
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 15
    },
    soundItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    deleteButton: {
        fontSize: 25,
    }
})