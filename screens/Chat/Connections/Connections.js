import { useEffect, useState } from "react";
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
import firestore from "@react-native-firebase/firestore";
import { GetUserMatchesProfiles } from "../../../api/matches";
import { useAuth } from "../../../contexts/AuthContext";
import ConnectionBubble from "./ConnectionBubble";
import { useMatches } from "../../../contexts/MatchContext";

const Connections = () => {
  const { profiles, updateMatches } = useMatches();
  const { profileData } = useAuth();
  const { pending } = profiles;

  useEffect(() => {
    const subscriber = firestore()
      .collection("matches")
      .where(firestore.FieldPath.documentId(), "==", profileData.uuid)
      .onSnapshot((snapshot) => {
        GetUserMatchesProfiles(profileData.uuid, (p) => {
          updateMatches({ type: "set-pending", pending: p });
          console.log(profiles);
        });
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [profileData]);

  return (
    <View style={styles.connectionsContainer}>
      <Text style={styles.subHeader}>
        Connections with you! ({pending?.length || 0})
      </Text>
      {pending ? <Text>None so far... start swiping!</Text> : null}
      {/* <View style={styles.connectionsList}> */}
      <FlatList
        data={pending}
        horizontal
        renderItem={({ item }) => (
          <ConnectionBubble key={item.email} profile={item}></ConnectionBubble>
        )}
      ></FlatList>
      {/* </View> */}
    </View>
  );
};

export default Connections;

const styles = StyleSheet.create({
  connectionsContainer: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  subHeader: {
    fontSize: 15,
    marginBottom: 10,
    marginTop: 20,
  },
  connectionsList: {
    display: "flex",
    flexDirection: "row",
  },
});
