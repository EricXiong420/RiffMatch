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


const Home = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [initializing, setInitializing] = useState(true);
  const [profiles, setProfiles] = useState([]);

  const { user, handleSignout } = useAuth();

  useEffect(() => {
    if (user) {
      firestore().collection('users').doc(user.email)
        .onSnapshot(document => {
          if (!document.exists) {
            navigation.navigate("CreateProfileBasic");
          } else {
            setUserData({ ...document.data(), email: user.email });
          }
        });
    }

  }, []);

  useEffect(() => {
    const unsub = firestore().collection('users')
      .onSnapshot(collection => {
        setInitializing(false);
        setProfiles(collection.docs.filter(doc => doc.id !== user.email).map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      })
    return unsub;
  }, [])

  // Listen to state changes on profile
  // Debug purposes only
  useEffect(() => {
    console.log('profiles', profiles);
  }, [profiles])

  const handleSwipeLeft = () => {
    return;
  }

  const handleSwipeRight = () => {
    return;
  }

  const handleTapCard = (cardIndex) => {
    navigation.navigate("ProfileModal", { card: profiles[cardIndex] });
  }


  return (
    !initializing && (
      <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
        {/* Header */}
        <View style={styles.container}>
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
            infinite
            stackSize={3}
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
            renderCard={(card) => card ? (<ProfileCard id={card?.id} card={card} />)
              : (<View style={styles.card}>
                <Text style={{ fontFamily: "Cormorant Garamond", fontSize: 24 }}>No more profiles :/</Text>
              </View>)}
          />
        </View>

        {/* End of cards */}

        <View style={{ flex: 1 }}>
          <Text>Welcome: {userData.firstName} {userData.lastName}</Text>
          <Text>Gender: {userData.gender}</Text>
          <Text>Email: {userData.email}</Text>
          <Button onPress={handleSignout}>Signout</Button>
        </View>
      </SafeAreaView>
    ))
}

export default Home

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: 'transparent',
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