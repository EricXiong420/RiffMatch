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
    return unsub;
  }, [])
  console.log(profiles);

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
              cards={profiles}
              renderCard={(card) => (
                <View key={card?.id} style={styles.card}>
                  <Text style={{ fontSize: 300 }}>{card?.firstName} {card?.lastName}</Text>
                  <Text style={{ fontSize: 30 }}>{card?.gender}</Text>
                  <Text style={{ fontSize: 20 }}>{card?.introduction}</Text>
                  <FlatList
                    horizontal
                    data={card?.instruments}
                    renderItem={(item) => (<Chip text={item} />)} />
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
  card: {
    height: '60%',
    backgroundColor: '#fff',
    borderRadius: 50,

  }
})