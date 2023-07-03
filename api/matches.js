import firestore from "@react-native-firebase/firestore";

// Get masterlist of all user
export const GetAllUsersUUID = async (callback) => {
  firestore()
    .collection("matches")
    .doc("mastersheet")
    .get()
    .then((document) => {
      callback(document._data?.users);
    });
};

// Get pending, swiped left and swiped right of user
export const GetUserMatches = async (userUUID, callback) => {
  firestore()
    .collection("matches")
    .doc(userUUID)
    .get()
    .then((document) => {
      callback(document._data);
    });
};

export const GetUserProfilesFromUUIDs = async (uuids, callback) => {
  if (!uuids || !uuids.length) return [];
  const batches = [];

  while (uuids.length) {
    // firestore limits batches to 10
    const batch = uuids.splice(0, 10);

    // add the batch request to to a queue
    batches.push(
      firestore()
        .collection("users")
        .where("uuid", "in", [...batch])
        .get()
        .then((results) =>
          results.docs.map((result) => ({
            /* id: result.id, */ ...result.data(),
          }))
        )
    );
  }

  // after all of the data is fetched, return it
  Promise.all(batches).then((content) => callback(content.flat()));
};

export const SwipedRight = (myUserUUID, theirUserUUID) => {
  firestore()
    .collection("matches")
    .doc(myUserUUID)
    .update({
      awaiting: firestore.FieldValue.arrayUnion(theirUserUUID),
    })
    .then(() => {});
  firestore()
    .collection("matches")
    .doc(theirUserUUID)
    .update({
      pending: firestore.FieldValue.arrayUnion(myUserUUID),
    })
    .then(() => {});
};

export const SwipedLeft = (myUserUUID, theirUserUUID) => {
  firestore()
    .collection("matches")
    .doc(myUserUUID)
    .update({
      passed: firestore.FieldValue.arrayUnion(theirUserUUID),
    })
    .then(() => {});
  firestore()
    .collection("matches")
    .doc(theirUserUUID)
    .update({
      passed: firestore.FieldValue.arrayUnion(myUserUUID),
    })
    .then(() => {});
};
