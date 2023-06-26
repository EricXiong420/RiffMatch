import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Chip from '../Misc/Chip';
import Divider from '../Misc/Divider';
import TrackPlayer, { usePlaybackState, useTrackPlayerEvents, State, Event } from 'react-native-track-player';
import AudioPlayer from './AudioPlayer';
import Sound from './Sound';

const ProfileModalScreen = ({ route }) => {
    const { card, preventReloadingSounds } = route.params;

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
        
        {card?.genres?.map((genre, index) => (
          <Chip key={index} text={genre} />
        ))}
      </View>
      <Divider />
      {/* {card.sounds?.map((sound, index) => (<AudioPlayer key={index} track={{ id: index }}/>))} */}
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