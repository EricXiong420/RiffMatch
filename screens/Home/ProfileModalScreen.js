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
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  State,
  Event,
} from "react-native-track-player";
import AudioPlayer from "./AudioPlayer";
import Sound from "./Sound";
import { getProfileImage } from "../../api/profile";
import ProfileInstruments from "../Profile/ProfileInstruments";
import ProfilePhotos from "../Profile/ProfilePhotos";
import ProfileGenres from "../Profile/ProfileGenres";
import { AcceptConnection, RejectConnection } from "../../api/matches";
import { useAuth } from "../../contexts/AuthContext";
import { createChatroom } from "../../api/messages";

const ProfileModalScreen = ({ route, navigation }) => {
  const { card, acceptReject } = route.params;
  const { firstName, lastName, id, introduction } = card;
  const { user, profileData, setProfileData } = useAuth();
  const [profileImage, setProfileImage] = useState(null);

  const GetProfileIMG = async () => {
    setProfileImage(await getProfileImage(id));
  };

  useEffect(() => {
    GetProfileIMG();
  }, []);

  const Accept = () => {
    AcceptConnection(profileData.uuid, card.uuid);
    createChatroom([user.email, card.id]);
    navigation.goBack();
  };

  const Reject = () => {
    RejectConnection(profileData.uuid, card.uuid);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.card}>
      {/* Main Introduction */}
      <View style={styles.introduction}>
        <Image
          source={{
            uri: profileImage ? profileImage : null,
            cache: "force-cache",
          }}
          style={styles.profileImage}
        ></Image>
        <Text style={styles.introductionText}>{introduction}</Text>
        <Text style={styles.fullName}>
          {firstName} {lastName}
        </Text>
        {acceptReject ? (
          <View style={styles.acceptRejectButtons}>
            <Pressable onPress={Reject} style={styles.rejectButton}>
              <Ionicons style={styles.buttonIcon} name="close"></Ionicons>
            </Pressable>
            <Pressable onPress={Accept} style={styles.acceptButton}>
              <Ionicons style={styles.buttonIcon} name="heart"></Ionicons>
            </Pressable>
          </View>
        ) : null}
      </View>

      {/* Photos */}
      <View style={styles.photos}>
        <Text style={styles.photosTitle}>Photos</Text>
        <ProfilePhotos
          isOwn={false}
          showHeader={false}
          photosData={card?.photos}
        ></ProfilePhotos>
      </View>

      {/* Instruments */}
      <View style={styles.instruments}>
        <Text style={styles.instrumentsTitle}>Instruments</Text>
        <ProfileInstruments
          showHeader={false}
          profileData={card}
        ></ProfileInstruments>
      </View>

      {/* Genres */}
      <View style={styles.instruments}>
        <Text style={styles.instrumentsTitle}>Genres</Text>
        <ProfileGenres showHeader={false} profileData={card}></ProfileGenres>
      </View>

      {/* Sounds */}
      <View style={styles.sounds}>
        <Text style={styles.soundsTitle}>Sounds</Text>
        {card.sounds?.map((sound, index) => {
          return (
            <Sound
              key={index}
              sound={sound}
              trackIndex={index}
              theme={"dark"}
            />
          );
        })}
        {card.sounds.length === 0 && (
          <Text style={styles.noSoundsText}>
            Profile has no sounds uploaded...
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ProfileModalScreen;

const styles = StyleSheet.create({
  introduction: {
    padding: 30,
    marginTop: 20,
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderColor: "#d1d1d1",
    borderRadius: 20,
    borderWidth: 1,
    width: "100%",
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 1,
  },
  introductionText: {
    color: "grey",
    fontSize: 13,
    marginTop: 15,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "center",
  },
  fullName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  photos: {
    padding: 30,
    borderColor: "#d1d1d1",
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "black",
    marginTop: 10,
    paddingBottom: -40,
  },
  photosTitle: {
    color: "white",
    fontFamily: "CormorantGaramond-Bold",
    fontSize: 30,
  },
  instruments: {
    marginTop: 10,
    padding: 30,
    borderColor: "#d1d1d1",
    borderRadius: 20,
    borderWidth: 1,
    paddingBottom: -40,
  },
  instrumentsTitle: {
    fontFamily: "CormorantGaramond-Bold",
    fontSize: 30,
  },
  sounds: {
    padding: 30,
    borderColor: "#d1d1d1",
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "black",
    marginTop: 10,
    marginBottom: 50,
  },
  soundsTitle: {
    fontFamily: "CormorantGaramond-Bold",
    fontSize: 30,
    color: "white",
    marginBottom: 20,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 10,
    rowGap: 5,
    margin: 5,
  },
  noSoundsText: {
    fontFamily: "CormorantGaramond-Regular",
    textAlign: "center",
    color: "white",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    height: "100%",
    backgroundColor: "#fff",
    gap: 10,
    padding: 10,
  },
  header: {},
  textHeader: {
    fontSize: 40,
    fontFamily: "CormorantGaramond-Bold",
  },
  textSubheader: {
    fontSize: 18,
    alignSelf: "center",
  },
  acceptRejectButtons: {
    flexDirection: "row",
    marginTop: 40,
  },
  rejectButton: {
    backgroundColor: "black",
    borderRadius: 10,
    height: 40,
    width: "50%",
    marginRight: 5,
  },
  acceptButton: {
    backgroundColor: "#f3691c",
    borderRadius: 10,
    height: 40,
    width: "50%",
  },
  buttonIcon: {
    textAlign: "center",
    lineHeight: 40,
    color: "white",
    fontSize: 20,
  },
});
