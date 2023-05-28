import { StyleSheet, Text, View } from 'react-native'
import {useState} from 'react'
import { Button } from '@ui-kitten/components';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';


const Home = () => {
  const navigation = useNavigation();

  const handleSignout = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    })
  }

  return (
    <View>
      <Text>Welcome: {auth.currentUser?.email}</Text>
      <Button onPress={handleSignout}>Signout</Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})