import firestore from "@react-native-firebase/firestore";
import uuid from "react-native-uuid";

export const addUserToDB = async (userData, email) => {
  const userUUID = uuid.v4();

  // Create user document in users collection
  firestore()
    .collection("users")
    .doc(email)
    .set({
      ...userData,
      uuid: userUUID,
      gender: userData.gender.toLowerCase(),
      created: new Date(),
    })
    .then(() => {
      // Create user document in matches collection
      firestore().collection("matches").doc(userUUID).set({
        swipedLeft: [],
        swipedRight: [],
      });
      // Add new user UUID into mastersheet in matches collection
      firestore()
        .collection("matches")
        .doc("mastersheet")
        .update({
          users: firestore.FieldValue.arrayUnion(userUUID),
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
