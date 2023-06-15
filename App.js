import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer, Modal } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import Home from './screens/Home';
import Landing from './screens/Login/Landing';
import RegisterPortal from './screens/Login/RegisterPortal';
import LoginPortal from './screens/Login/LoginPortal';
import CreateProfileInstruments from './screens/Login/CreateProfileInstruments';
import CreateProfileBasic from './screens/Login/CreateProfileBasic';
import CreateProfileImage from './screens/Login/CreateProfileImage';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function onAuthStateChanged(user) {
    if (user) { setLoggedIn(true) } else {
      setLoggedIn(false)
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);


  const HomeStackScreen = () => {
    return <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
      <HomeStack.Screen name="CreateProfileBasic" component={CreateProfileBasic} options={{ headerShown: false }} />
      <HomeStack.Screen name="CreateProfileInstruments" component={CreateProfileInstruments} options={{ headerShown: false }} />
      <HomeStack.Screen name="CreateProfileImage" component={CreateProfileImage} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        {!loggedIn ? <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
            <Stack.Screen name="LoginPortal" component={LoginPortal} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterPortal" component={RegisterPortal} options={{ headerShown: false }} />
          </Stack.Group>
        </Stack.Navigator> :
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStackScreen} />
          </Tab.Navigator>}
      </NavigationContainer>
    </ApplicationProvider >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
