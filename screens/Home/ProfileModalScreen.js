import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Chip from '../Misc/Chip';
import Divider from '../Misc/Divider';
import TrackPlayer, { usePlaybackState, useTrackPlayerEvents, State, Event } from 'react-native-track-player';
import AudioPlayer from './AudioPlayer';

const ProfileModalScreen = ({ route }) => {
    const { card } = route.params;
    const [playing, setPlaying] = useState(false);

    // test params
    const tracklist = [{
        id: 0,
        url: require('../../assets/audio1.mp3'),
        title: 'Upbeat song',
        artist: 'Eric'
      }, {
        id: 1,
        url: require('../../assets/audio1.mp3'),
        title: 'Something else',
        artist: 'Look at me!'
      }]

    // Sets playing state based on if music is already playing
    useEffect(() => {
        async function setPlayingState() {
            const state = await TrackPlayer.getState();
            setPlaying(state === State.Playing);
        }
        setPlayingState();
    }, []);
    
    // Sets a listener for changes in playing state, to update our own state
    useTrackPlayerEvents([Event.PlaybackState, Event.PlaybackError], async event => {
      if (event.type === Event.PlaybackError) {
        console.warn('An error occured while playing the current track.');
      } else if (event.type === Event.PlaybackState) {
        console.log('help');
        setPlaying(event.state === State.Playing);
      }
    });
  
    const handlePlaySound = async () => {
      const state = await TrackPlayer.getState();
      if (state === State.Playing) {
        TrackPlayer.pause();
      } else {
        TrackPlayer.play();
      }
    }


    return (<View style={styles.card}>
      <View style={styles.header}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1} 
          style={styles.textHeader}>{card?.firstName} {card?.lastName}</Text>
        <Text style={styles.textSubheader}>{card?.gender}</Text>
      </View>
      <View style={styles.chips}>
        {card?.instruments?.map(instrument => (
          <Chip text={instrument} />
        ))}
      </View>
      <Divider />
      {card?.introduction !== '' && card?.introduction !== undefined
      && (<><Text style={{ fontSize: 18, fontFamily: 'Cormorant Garamond' }}>Introduction</Text>
        <View style={styles.introduction}>
        <Text style={{ fontSize: 15 }}>{card?.introduction}</Text>
      </View></>)}
      <Text style={{ fontSize: 18, fontFamily: 'Cormorant Garamond' }}>Genres</Text>
      <View style={styles.chips}>
        
        {card?.genres?.map(genre => (
          <Chip text={genre} />
        ))}
      </View>
      <Divider />
      {tracklist.map(track => (<AudioPlayer track={track}/>))}
    </View>)
  }

  export default ProfileModalScreen;

  const styles = StyleSheet.create({
    chips: {
      flexDirection: 'row',
      flexWrap: "wrap",
      columnGap: 10,
      rowGap: 5,
      margin: 5
    },
    card: {
      height: '100%',
      backgroundColor: '#fff',
      gap: 10,
      padding: 10,
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
      padding: 10
    },
    sounds: {
    }
  })