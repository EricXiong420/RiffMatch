import { StyleSheet, Text, View, ImageBackground, Pressable, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Chip from '../Misc/Chip';
import Divider from '../Misc/Divider';
import TrackPlayer, { useProgress, useTrackPlayerEvents, State, Event } from 'react-native-track-player';
import { Slider } from '@rneui/themed';
import AudioPlayer from './AudioPlayer';
import SoundPlayer from 'react-native-sound-player'
import Sound from './Sound';
import { getUserPhotoLink, getUserSoundLink } from '../../api/profile';

const ProfileCard = ({ card }) => {
  const [image, setImage] = useState(null)

  // adding tracks to playlist once
  useEffect(() => {
    console.log(card.sounds)
    // getUserSoundLink(card.sounds[0]?.uuid, url => {
    //   SoundPlayer.playUrl(url)
    // })
    // // async function resetTracks() {
    // //     await TrackPlayer.reset();
    // // }
    // // resetTracks();
  }, []);
  useEffect(() => {
    getUserPhotoLink('342deaa8-e1dd-4ef8-9128-ca7977d4d867', (url) => {
      setImage(url)
    })
  }, [])

  const { firstName, lastName, gender, introduction } = card;

  return (<View style={[styles.card, styles.cardShadow]}>
    <ImageBackground source={{ uri: image, cache: 'force-cache' }} blurRadius={50} style={styles.backgroundImage}>
      <View>
        <Text style={styles.cardName}>{firstName} {lastName}</Text>
        <Text style={styles.gender}>{gender}</Text>
        <View style={styles.chips}>
          {card?.instruments?.map((instrument, index) => (
            <Chip key={index} text={instrument} />
          ))}
        </View>
        <Text numberOfLines={4} style={styles.introduction}>{introduction}</Text>
      </View>
      <View style={{ ...styles.chips, ...styles.genres }}>
        {card?.genres?.map((genre, index) => (
          <Chip key={index} text={genre} />
        ))}
      </View>
      {card.sounds?.map((sound, index) => (<Sound key={index} sound={sound} trackIndex={index} theme={'dark'} />))}
    </ImageBackground>

  </View>)
}

export default ProfileCard;

const styles = StyleSheet.create({
  chips: {
    flexDirection: 'row',
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 10
    // columnGap: 10,
    // rowGap: 5,
    // margin: 5
  },
  genres: {
    marginTop: 20
  },
  card: {
    height: '60%',
    flexShrink: 1,
    backgroundColor: '#fff',
    gap: 10,
    borderRadius: 40,
    // padding: 10,
  },
  backgroundImage: {
    height: '105%',
    padding: 20

  },
  cardName: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: "Cormorant Garamond",
    marginTop: 10
  },
  gender: {
    color: 'white',
    textTransform: 'uppercase',
    marginBottom: 10
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    sounds: {
      flexDirection: "row"
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2
  },
  header: {
  },
  textHeader: {
    fontSize: 40,
    fontFamily: "Cormorant Garamond",
    alignSelf: 'center'
  },
  textSubheader: {
    fontSize: 18,
    alignSelf: 'center'
  },
  introduction: {
    color: 'white',
    marginTop: 10
  },
  sounds: {
    flexDirection: "row"
  }
})