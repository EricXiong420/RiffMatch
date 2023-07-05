import { useState, useEffect } from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import { NavigationContainer, Modal } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as eva from "@eva-design/eva";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ApplicationProvider } from "@ui-kitten/components";
import Home from "./screens/Home/Home";
import Landing from "./screens/Login/Landing";
import RegisterPortal from "./screens/Login/RegisterPortal";
import LoginPortal from "./screens/Login/LoginPortal";
import CreateProfileInstruments from "./screens/Login/CreateProfileInstruments";
import CreateProfileBasic from "./screens/Login/CreateProfileBasic";
import CreateProfileImage from "./screens/Login/CreateProfileImage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import ChatScreen from "./screens/Chat/ChatScreen";
import MessageScreen from "./screens/Chat/MessageScreen";
import { MessagesProvider } from "./contexts/messages";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProfileEditIntroduction from "./screens/Profile/Edit/ProfileEditIntroduction";
import ProfileEditPhotos from "./screens/Profile/Edit/ProfileEditPhotos";
import ProfileEditInstruments from "./screens/Profile/Edit/ProfileEditInstruments";
import ProfileEditGenres from "./screens/Profile/Edit/ProfileEditGenres";
import ProfileEditSounds from "./screens/Profile/Edit/ProfileEditSounds";
import ProfileModalScreen from "./screens/Home/ProfileModalScreen";
import SettingsScreen from "./screens/Settings/SettingsScreen";
import { MatchesProvider } from "./contexts/MatchContext";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateProfileGenres from "./screens/Login/CreateProfileGenres";
import CreateProfileIntroduction from "./screens/Login/CreateProfileIntroduction";
import CreateProfileSounds from "./screens/Login/CreateProfileSounds";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

export default function App() {
  // idk why I can't just get user from useAuth
  const [user, setUser] = useState(null);
  const [firstTimeUser, setFirstTimeUser] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      firestore()
        .collection("users")
        .doc(user?.email)
        .get()
        .then((document) => setFirstTimeUser(!document.exists));
    });
    return subscriber;
  }, []);

  const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <HomeStack.Screen name="HomeScreen" component={Home} />
        <HomeStack.Screen
          name="CreateProfileBasic"
          component={CreateProfileBasic}
        />
        <HomeStack.Screen
          name="CreateProfileInstruments"
          component={CreateProfileInstruments}
        />
        <HomeStack.Screen
          name="CreateProfileGenres"
          component={CreateProfileGenres}
        />
        <HomeStack.Screen
          name="CreateProfileIntroduction"
          component={CreateProfileIntroduction}
        />
        <HomeStack.Screen
          name="CreateProfileSounds"
          component={CreateProfileSounds}
        />
        <HomeStack.Screen
          name="CreateProfileImage"
          component={CreateProfileImage}
        />
        <HomeStack.Screen
          name="ProfileModal"
          component={ProfileModalScreen}
          options={{ presentation: "modal" }}
        />
      </HomeStack.Navigator>
    );
  };

  const ChatStackScreen = () => {
    return (
      <ChatStack.Navigator>
        <ChatStack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="ProfileModalScreen"
          component={ProfileModalScreen}
          options={{ presentation: "modal", headerShown: false }}
        />
      </ChatStack.Navigator>
    );
  };

  const ProfileStackScreen = () => {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </ProfileStack.Navigator>
    );
  };

  const HomeItems = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name == "Home") {
              iconName = "musical-notes-outline";
            } else if (route.name == "Chat") {
              iconName = "chatbubbles-outline";
            } else {
              iconName = "person-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Chat" component={ChatStackScreen} />
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <AuthProvider>
        <MessagesProvider>
          <NavigationContainer>
            {user == null ? (
              <Stack.Navigator>
                <Stack.Group>
                  <Stack.Screen
                    name="Landing"
                    component={Landing}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="LoginPortal"
                    component={LoginPortal}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="RegisterPortal"
                    component={RegisterPortal}
                    options={{ headerShown: false }}
                  />
                </Stack.Group>
              </Stack.Navigator>
            ) : (
              <MatchesProvider>
                <Stack.Navigator>
                  <Stack.Screen
                    name="HomeStack"
                    component={HomeItems}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="MessageScreen"
                    component={MessageScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="EditIntroduction"
                    component={ProfileEditIntroduction}
                    options={{ headerShown: false }}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="EditPhotos"
                    component={ProfileEditPhotos}
                    options={{ headerShown: false }}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="EditInstruments"
                    component={ProfileEditInstruments}
                    options={{ headerShown: false }}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="EditGenres"
                    component={ProfileEditGenres}
                    options={{ headerShown: false }}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="EditSounds"
                    component={ProfileEditSounds}
                    options={{ headerShown: false }}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ headerShown: false }}
                  ></Stack.Screen>
                </Stack.Navigator>
              </MatchesProvider>
            )}
          </NavigationContainer>
        </MessagesProvider>
      </AuthProvider>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
