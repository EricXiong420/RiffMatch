import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import { Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-deck-swiper';
import Logo from "../../assets/login/logo.png";
import Chip from './Chip';


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
    let unsub;

    const fetchCards = async () => {
      unsub = firestore().collection('users')
        .onSnapshot(collection => {
          if (collection.exists) {
            setInitializing(false);
            setProfiles(collection.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })));
          }
      })
    }

    fetchCards();
    console.log(profiles);
    console.log("hello");
    return unsub;
  }, [])

  const tempProfiles = [{
    id: 'a@a.com',
    firstName: 'John',
    lastName: 'Smith',
    gender: 'male',
    instruments: ['violin', 'drums'],
    introduction: "wassup bitches i'm in da club"
  },
  {
    id: 'b@b.com',
    firstName: 'Patti',
    lastName: 'Smith',
    gender: 'female',
    instruments: ['men', 'their feelings'],
    introduction: "don't mess with me"
  }]
  

  return (
    initializing && (
    <SafeAreaView style = {{ flex: 1, flexDirection: "column" }}>
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
            cards={tempProfiles}
            renderCard={(card) => (
              <View key={card?.id} style={[styles.card, styles.cardShadow]}>
                <View style={styles.header}>
                  <Text style={styles.textHeader}>{card?.firstName} {card?.lastName}</Text>
                  <Text style={styles.textSubheader}>{card?.gender}</Text>
                </View>
                <View style={styles.chips}>
                  {card?.instruments.map(instrument => (
                    <Chip text={instrument} />
                  ))}
                </View>
                <View style={styles.introduction}>
                  <Text style={{ fontSize: 12 }}>{card?.introduction}</Text>
                </View>
                <View style={styles.sounds}>
                  <Text>Sounds go here!</Text>
                </View>
              </View>
            )}
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
  chips: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: "wrap",
    columnGap: 10
  },
  card: {
    height: '60%',
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
    flex: 5
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
    flex: 8,
    borderWidth: 1,
    borderColor: "#404040",
    borderRadius: 20,
    padding: 10
  },
  sounds: {
    flex: 10
  }
})