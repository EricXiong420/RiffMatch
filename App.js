import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer, Modal } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as eva from '@eva-design/eva';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ApplicationProvider } from '@ui-kitten/components';
import Home from './screens/Home';
import Landing from './screens/Login/Landing';
import RegisterPortal from './screens/Login/RegisterPortal';
import LoginPortal from './screens/Login/LoginPortal';
import CreateProfileInstruments from './screens/Login/CreateProfileInstruments';
import CreateProfileBasic from './screens/Login/CreateProfileBasic';
import CreateProfileImage from './screens/Login/CreateProfileImage';
import auth from '@react-native-firebase/auth';
import ProfileScreen from './screens/Profile/ProfileScreen';
import ChatScreen from './screens/Chat/ChatScreen';
import MessageScreen from './screens/Chat/MessageScreen';
import { MessagesProvider } from './contexts/messages';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();


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

  const ChatStackScreen = () => {
    return <ChatStack.Navigator>
      <ChatStack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
    </ChatStack.Navigator>
  }

  const ProfileStackScreen = () => {
    return <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
    </ProfileStack.Navigator>
  }

  const HomeItems = () => {
    return <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name == "Home") {
          iconName = 'musical-notes-outline';
        } else if (route.name == "Chat") {
          iconName = "chatbubbles-outline";
        } else {
          iconName = 'person-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Chat" component={ChatStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light} >
      <MessagesProvider>
        <NavigationContainer>
          {!loggedIn ? <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
              <Stack.Screen name="LoginPortal" component={LoginPortal} options={{ headerShown: false }} />
              <Stack.Screen name="RegisterPortal" component={RegisterPortal} options={{ headerShown: false }} />
            </Stack.Group>
          </Stack.Navigator> :
            <Stack.Navigator>
              <Stack.Screen name="HomeStack" component={HomeItems} options={{ headerShown: false }} />
              <Stack.Screen name="MessageScreen" component={MessageScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          }

        </NavigationContainer>
      </MessagesProvider>
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
