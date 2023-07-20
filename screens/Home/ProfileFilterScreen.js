import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    FlatList,
    ScrollView,
  } from "react-native";
  import { useState, useEffect } from "react";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import Chip from "../Misc/Chip";
  import Divider from "../Misc/Divider";
  import Sound from "./Sound";
  import { getProfileImage } from "../../api/profile";
  import ProfileInstruments from "../Profile/ProfileInstruments";
  import ProfilePhotos from "../Profile/ProfilePhotos";
  import ProfileGenres from "../Profile/ProfileGenres";
  import { AcceptConnection, RejectConnection } from "../../api/matches";
  import { useAuth } from "../../contexts/AuthContext";
  import { createChatroom } from "../../api/messages";
  import { useMatches } from "../../contexts/MatchContext";

const ProfileFilterScreen = ({ route, navigation }) => {
    const { card, acceptReject, swipeRef } = route.params;
    const { firstName, lastName, id, introduction } = card;
    const { user, profileData, setProfileData } = useAuth();
    const { profiles, updateMatches } = useMatches();
    const [profileImage, setProfileImage] = useState(null);

    return (
        <View>
            
        </View>
    )
}

export default ProfileFilterScreen;