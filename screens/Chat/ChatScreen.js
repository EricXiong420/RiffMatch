import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Pressable,
  Text,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import ChatUserItem from "./ChatUserItem";
import { useMessages } from "../../contexts/messages";
import { useAuth } from "../../contexts/AuthContext";
import Connections from "./Connections/Connections";

const ChatScreen = () => {
  const { user, profileImage } = useAuth();
  const navigation = useNavigation();
  const messageContext = useMessages();
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    updateData();
  }, [user, messageContext]);

  const updateData = async () => {
    if (user) {
      let list = [];
      messageContext.state.forEach((item) => {
        list.push({
          to: item.members.filter((ite) => ite !== user.email)[0],
          ...item,
        });
      });
      setUsersList(list);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat</Text>

        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Image
            source={{
              uri: profileImage ? profileImage : null,
              cache: "only-if-cached",
            }}
            style={{ ...styles.profile }}
          ></Image>
        </Pressable>
      </View>

      <KeyboardAvoidingView style={styles.chatScreenContainer}>
        <Connections></Connections>

        <View style={styles.chatUsers}>
          <Text style={styles.subHeader}>Recent Conversations</Text>
          <FlatList
            data={usersList}
            renderItem={({ item }) => (
              <ChatUserItem key={item.chatId} chatData={item} />
            )}
          ></FlatList>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    paddingLeft: 30,
    paddingRight: 30,
    flex: 0,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: -50,
    paddingTop: 50,
    // paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 15,
    borderBottomColor: "#f5f5f5",
    // borderWidth: 1
  },
  subHeader: {
    fontSize: 15,
    marginLeft: 30,
    marginTop: 20,
  },
  title: {
    fontFamily: "CormorantGaramond-Bold",
    fontSize: 30,
    flexGrow: 1,
  },
  settings: {
    flexGrow: 1,
  },
  settingsText: {
    textAlign: "right",
    fontSize: 25,
  },
  chatScreenContainer: {
    backgroundColor: "white",
    minHeight: "100%",
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Cormorant Garamond",
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 30,
    flex: 1,
  },
  profile: {
    width: 35,
    height: 35,
    borderRadius: 1000,
    // flexGrow: 1
    alignSelf: "flex-end",
    // marginRight: 30,
  },
  chatUsers: {
    marginTop: 20,
  },
});
