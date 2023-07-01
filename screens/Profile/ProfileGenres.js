import { FlatList, StyleSheet, View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ProfileGenres = ({ profileData, showHeader }) => {
  const navigation = useNavigation();
  return (
    <View>
      {showHeader ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Genres</Text>
          <Text
            style={styles.editButton}
            onPress={() => navigation.navigate("EditGenres")}
          >
            <Ionicons name="create-outline"></Ionicons> Edit
          </Text>
        </View>
      ) : null}
      <View style={styles.instrumentsList}>
        {profileData.genres?.map((genre) => {
          return (
            <View key={genre} style={styles.instrumentTag}>
              <Text style={styles.instrumentTagText}>{genre}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ProfileGenres;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Cormorant Garamond",
    fontWeight: "bold",
    flex: 1,
  },
  section: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  instrumentsList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  instrumentTag: {
    backgroundColor: "#fff",
    marginRight: 5,
    marginTop: 10,
  },
  instrumentTagText: {
    color: "#4a4848",
    borderColor: "#ababab",
    textTransform: "uppercase",
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  editButton: {
    marginTop: 10,
    fontSize: 17,
    fontFamily: "Cormorant Garamond",
    fontStyle: "italic",
    textAlign: "right",
  },
});
