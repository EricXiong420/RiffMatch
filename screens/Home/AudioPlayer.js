import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer, {useProgress, useTrackPlayerEvents, State, Event } from 'react-native-track-player';
import { Slider } from '@rneui/themed';

const AudioPlayer = ({ track }) => {

    const [playing, setPlaying] = useState(false);
    const [focused, setFocused] = useState(false);
    const [position, setPosition] = useState(0);
    const [slidingStart, setSlidingStart] = useState(false);
    // for debugging
    const progress = useProgress();
    
    useEffect(() => {
        if (!slidingStart) {
            setPosition(progress.position);
        }
    }, [progress])
    
    // Sets playing state based on if music is already playing
    useEffect(() => {
        async function setPlayingState() {
            const currentTrack = await TrackPlayer.getCurrentTrack()
            const state = await TrackPlayer.getState();
            if (currentTrack === track.id) {
                setFocused(state === State.Playing);
                setPlaying(state === State.Playing);
            } else {
                setFocused(false);
            }
        }
        setPlayingState();
    }, []);
    
    // Sets a listener for changes in playing state, to update our own state
    useTrackPlayerEvents([Event.PlaybackState, Event.PlaybackError], async event => {
      if (event.type === Event.PlaybackError) {
        console.warn('An error occured while playing the current track.');
      } else if (event.type === Event.PlaybackState) {
        const currentTrack = await TrackPlayer.getCurrentTrack()
        if (currentTrack === track.id) {
            setFocused(true);
            setPlaying(event.state === State.Playing);
        } else {
            setPosition(0);
            setSlidingStart(false);
            setFocused(false);
            setPlaying(false);
        }
      }
    });
  
    const handlePlaySound = async () => {
      const currentTrack = await TrackPlayer.getCurrentTrack()
      const state = await TrackPlayer.getState();
      if (currentTrack === track.id) {
        if (state === State.Playing) {
            TrackPlayer.pause();
        } else {
            TrackPlayer.play();
        }
      } else {
        TrackPlayer.skip(track.id);
        if (state !== State.Playing) {
            TrackPlayer.play();
        }
      }
    }



    return (
      <View style={styles.sounds}>
        <Pressable onPress={handlePlaySound}>
          <Ionicons name={playing ? 'pause-circle-outline' : 'play-circle-outline'} size={35} color={'#404040'} />
        </Pressable>
        {focused && <Slider
        animateTransitions
        animationConfig={{ useNativeDriver: false }}
        animationType="timing"
        maximumTrackTintColor="#ccc"
        maximumValue={progress.duration}
        minimumTrackTintColor="#222"
        minimumValue={0}
        onSlidingStart={() => setSlidingStart(true)}
        onSlidingComplete={(value) => {
            TrackPlayer.seekTo(value);
            setSlidingStart(false);
        }}
        onValueChange={setPosition}
        orientation="horizontal"
        step={1}
        style={{ width: '80%', height: 35 }}
        thumbStyle={{ height: 10, width: 10 }}
        thumbProps={{}}
        thumbTintColor="#404040"
        thumbTouchSize={{ width: 40, height: 40 }}
        trackStyle={{ height: 2, borderRadius: 20 }}
        value={position}
        />
    }
      </View>
      )
  }

  export default AudioPlayer;

  const styles = StyleSheet.create({
    sounds: {
        width: '100%',
        flexDirection: "row"
    }
  })