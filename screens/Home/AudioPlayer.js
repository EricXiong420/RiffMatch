import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Slider } from '@rneui/themed';
import SoundPlayer from 'react-native-sound-player'

const AudioPlayer = ({ track, theme }) => {
  const [playing, setPlaying] = useState(false);
  const [focused, setFocused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const formatSecondsToTime = (seconds) => {
    return new Date(seconds * 1000).toISOString().substring(14, 19);
  }

  const handlePlaySound = async () => {
    if (playing) {
      SoundPlayer.stop();
      setFocused(false);
    } else {
      SoundPlayer.playUrl(track.url)
      setPosition(0);
      setFocused(true);
      getInfo((info) => {
        setDuration(info.duration)
      })
    }
    setPlaying(!playing);
  }

  const getInfo = async (callback) => {
    try {
      const info = await SoundPlayer.getInfo()
      callback(info)
    } catch (e) {
      console.log('There is no song playing', e)
    }
  }

  useEffect(() => {
    let intervalId;
    if (focused) {
      intervalId = setInterval(() => {
        getInfo(info => {
          setPosition(info.currentTime)
        })
      }, 1000)
    }
    return () => clearInterval(intervalId); //This is important
  }, [focused])

  useEffect(() => {
    SoundPlayer.addEventListener('FinishedPlaying', () => {
        setPlaying(false);
        setFocused(false)
    })
  }, [])

  useEffect(() => {
    SoundPlayer.addEventListener('FinishedPlaying', () => {
        setPlaying(false);
        setFocused(false)
    })
  }, [])




  return (
    <View style={styles.sounds}>
      <Pressable onPress={handlePlaySound}>
        <Ionicons name={playing ? 'pause-circle-outline' : 'play-circle-outline'} size={35} color={theme === 'light' ? '#000' : '#fff'} />
      </Pressable>
      {!focused && <Text style={[styles.trackName, theme === 'light' ? styles.light : styles.dark]}>{track.title}</Text>}
      {focused && (<>
        <Text style={[styles.playtime, 
          { marginHorizontal: 3 }, 
          theme === 'light' ? styles.light : styles.dark]}>{formatSecondsToTime(position)}</Text>
        <Slider
          animateTransitions
          animationConfig={{ useNativeDriver: false }}
          animationType="timing"
          maximumTrackTintColor="#ccc"
          maximumValue={duration}
          minimumTrackTintColor="#222"
          minimumValue={0}
          onValueChange={(pos) => SoundPlayer.seek(pos)}
          orientation="horizontal"
          step={1}
          style={styles.slider}
          thumbStyle={{ height: 10, width: 10 }}
          thumbProps={{}}
          thumbTintColor="#404040"
          thumbTouchSize={{ width: 40, height: 40 }}
          trackStyle={{ height: 2, borderRadius: 20 }}
          value={position}
        />
        <Text style={[styles.playtime, 
          { marginLeft: 8 },
          theme === 'light' ? styles.light : styles.dark]}>{formatSecondsToTime(duration)}</Text></>)
      }
    </View>
  )
}

export default AudioPlayer;

const styles = StyleSheet.create({
  sounds: {
    width: '90%',
    flexDirection: "row",
    alignItems: 'center',
  },
  slider: {
    width: '60%',
    height: 35
  },
  playtime: {
    width: '10%',
    fontSize: 9,
  },
  trackName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10
  },
  dark: {
    color: '#fff'
  },
  light: {
    color: '#000'
  }
})