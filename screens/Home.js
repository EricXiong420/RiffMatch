import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Home = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [initializing, setInitializing] = useState(true);

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
    if (initializing) setInitializing(false);
  }, []);

  return (
    <SafeAreaView>
      {/* Header */}
        <View>
          <Ionicons></Ionicons>
        </View>
      {/* End of header */}
      <Text>Welcome: {userData.firstName} {userData.lastName}</Text>
      <Text>Gender: {userData.gender}</Text>
      <Text>Email: {userData.email}</Text>
      <Button onPress={handleSignout}>Signout</Button>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})