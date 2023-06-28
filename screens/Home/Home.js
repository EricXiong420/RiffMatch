import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import { Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Swiper from 'react-native-deck-swiper';
import Logo from "../../assets/login/logo.png";
import ProfileCard from './ProfileCard';
import TrackPlayer from 'react-native-track-player';
import { useMatches } from '../../contexts/MatchContext';


const Home = () => {
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(false);
  // const [profiles, setProfiles] = useState([]);
  const { profiles, updateMatches } = useMatches();
  const [profileDataLoaded, setProfileDataLoaded] = useState(false);

  const { user, profileData, firstTimeUser, handleSignout } = useAuth();
  useEffect(() => {
    if (profileData !== undefined && !profileDataLoaded) {
      setProfileDataLoaded(true);
    }
  }, [profileData])
  

  // useEffect(() => {
  //   if (Object.keys(profileData).length !== 0) {
  //     const seenProfiles = profileData.swipedLeft.concat(profileData.swipedRight, ["test"]);
  //     firestore().collection('users')
  //       .where(firestore.FieldPath.documentId(), 'not-in', seenProfiles)
  //       .get().then(collection => {
  //         setInitializing(false);
  //         setProfiles(collection.docs
  //           .filter(doc => doc.id !== user.email)
  //           .map(doc => ({
  //             id: doc.id,
  //             ...doc.data()
  //           })));
  //       })
  //   }
  // }, [profileData])

  // useEffect(() => {
  //   if (Object.keys(profileData).length !== 0) {
  //     const seenProfiles = profileData.swipedLeft.concat(profileData.swipedRight, ["test"]);
  //     firestore().collection('users')
  //       .where(firestore.FieldPath.documentId(), 'not-in', seenProfiles)
  //       .get().then(collection => {
  //         setInitializing(false);
  //         setProfiles(collection.docs
  //           .filter(doc => doc.id !== user.email)
  //           .map(doc => ({
  //             id: doc.id,
  //             ...doc.data()
  //           })));
  //       })
  //   }
  // }, [profileData])

  useEffect(() => {
    // console.log("Profiles Left", profiles.length)
    // console.log(profiles)
    // if (profiles.length > 0) {

    //   console.log(profiles[3].id)
    // }
  }, [profiles])

  const handleSwipeLeft = (cardIndex) => {
    // updateMatches({ type: 'swipe-left', removeCardIndex: cardIndex })
    // if (profiles[cardIndex] !== undefined) {
    //   firestore().collection('users').doc(user.email)
    //     .update({
    //       swipedLeft: firestore.FieldValue.arrayUnion(profiles[cardIndex].id)
    //     });
    // }
  }

  const handleSwipeRight = (cardIndex) => {
    // updateMatches({ type: 'swipe-right', removeCardIndex: cardIndex })
    // if (profiles[cardIndex] !== undefined) {
    //   firestore().collection('users').doc(user.email)
    //     .update({
    //       swipedRight: firestore.FieldValue.arrayUnion(profiles[cardIndex].id)
    //     });
    // }
  }

  const handleTapCard = (cardIndex) => {
    navigation.navigate("ProfileModal", { card: profiles[cardIndex], preventReloadingSounds: true });
  }


  return (
    !initializing && (
      <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Pressable>
            <FontAwesome name={"sliders"} size={35} color={"black"}></FontAwesome>
          </Pressable>
          <Image source={Logo} style={styles.logo}></Image>
          <Pressable>
            <Ionicons name={"notifications-outline"} size={35} color={"black"}></Ionicons>
          </Pressable>
        </View>
        {/* End of header */}

        {/* Cards */}
        <View style={{ flex: 9 }}>
          <Swiper
            cardVerticalMargin={30}
            containerStyle={styles.swiperContainer}
            cards={profiles}
            verticalSwipe={false}
            animateCardOpacity
            cardIndex={0}
            overlayLabels={{
              left: {
                element: <Ionicons name={"close-circle-outline"} size={50} color={"#404040"} />,
                title: "",
                style: {
                  wrapper: {
                    alignItems: 'flex-end',
                    marginTop: 4,
                    marginLeft: -4
                  }
                }
              },
              right: {
                element: <View style={styles.swipeRight}>
                  <Ionicons name={"musical-notes-outline"} size={46} color={"#404040"} />
                  <Text style={{ fontWeight: "bold", fontSize: 14 }}>CONNECT</Text></View>,
                title: ""
              }
            }
            }
            onSwipedRight={handleSwipeRight}
            onSwipedLeft={handleSwipeLeft}
            onTapCard={handleTapCard}
            renderCard={(card, index) => {
              if (card) {
                return <ProfileCard key={index} card={card} />
              } else {
                return (<View key={'test'} style={styles.card}>
                  <Text style={{ fontFamily: "Cormorant Garamond", fontSize: 24 }}>No more profiles :/</Text>
                </View>)
              }

            }}
          />
        </View>

        {/* End of cards */}
      </SafeAreaView>
    ))
}

export default Home

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    columnGap: 35,
    backgroundColor: '#fff',
  },
  logo: {
    width: 140,
    height: 50,
    resizeMode: 'contain'
  },
  swiperContainer: {
    backgroundColor: 'white',
  },
  swipeRight: {
    backgroundColor: "#9fff80",
    borderRadius: 90,
    padding: 9,
    alignItems: 'center',
    width: 90,
    height: 90
  },
  card: {
    height: '60%',
    backgroundColor: '#fff',
    gap: 10,
    borderRadius: 40,
    padding: 10,
  },
})