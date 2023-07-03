import { useNavigation } from "@react-navigation/native";
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
import { GetUserMatchesProfiles } from "../../../api/matches";
import { getProfileImage } from "../../../api/profile";
import { useAuth } from "../../../contexts/AuthContext";

const ConnectionBubble = ({ profile }) => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);

  const getPhoto = async () => {
    const url = await getProfileImage(profile.id);
    setProfileImage(url);
  };

  useEffect(() => {
    getPhoto();
  }, []);

  const ShowCard = () => {
    navigation.navigate("ProfileModalScreen", {
      card: profile,
      preventReloadingSounds: true,
      acceptReject: true
    });
  };

  return (
    <Pressable onPress={ShowCard}>
      <View style={styles.connectionBubbleContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: profileImage ? profileImage : null,
            cache: "force-cache",
          }}
        ></Image>
        <Text style={styles.profileName}>{profile.firstName}</Text>
      </View>
    </Pressable>
  );
};

export default ConnectionBubble;

const styles = StyleSheet.create({
  connectionBubbleContainer: {
    marginRight: 10,
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  profileName: {
    marginTop: 10,
  },
});
