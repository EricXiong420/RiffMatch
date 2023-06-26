import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Chip from '../Misc/Chip';
import Divider from '../Misc/Divider';
import TrackPlayer, { useProgress, useTrackPlayerEvents, State, Event } from 'react-native-track-player';
import { Slider } from '@rneui/themed';
import AudioPlayer from './AudioPlayer';
import Sound from './Sound';

const ProfileCard = ({ card }) => {
    const [initializing, setInitializing] = useState(true);

    // adding tracks to playlist once
    useEffect(() => {
        async function resetPlayer() {
          await TrackPlayer.reset();
          setInitializing(false);
        }
        resetPlayer();
        console.log(JSON.stringify(card.sounds))
    }, []);

    return (<View style={[styles.card, styles.cardShadow]}>
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
      {!initializing && card.sounds?.map((sound, index) => (<Sound key={Integer.toString(index)} sound={sound} trackIndex={Integer.toString(index)} />))}
    </View>)
  }

  export default ProfileCard;

  const styles = StyleSheet.create({
    chips: {
      flexDirection: 'row',
      flexWrap: "wrap",
      columnGap: 10,
      rowGap: 5,
      margin: 5
    },
    card: {
      height: '60%',
      flexShrink: 1,
      backgroundColor: '#fff',
      gap: 10,
      borderRadius: 40,
      padding: 10,
    },
    cardShadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1
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
      padding: 10
    },
    sounds: {
        flexDirection: "row"
    }
  })