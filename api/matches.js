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

export const GetUserMatchesProfiles = async (userUUID, callback) => {
  GetUserMatches(userUUID, (data) => {
    GetUserProfilesFromUUIDs(data?.pending, (profiles) => {
      callback(profiles);
    });
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
            id: result.id,
            ...result.data(),
          }))
        )
    );
  }

  // after all of the data is fetched, return it
  Promise.all(batches).then((content) => callback(content.flat()));
};

export const GetNumberOfConnections = (userUUID, callback) => {
  firestore()
    .collection("matches")
    .doc(userUUID)
    .get()
    .then((document) => {
      callback(document._data?.connections.length);
    });
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

export const RejectConnection = (myUserUUID, theirUserUUID) => {
  firestore()
    .collection("matches")
    .doc(myUserUUID)
    .update({
      pending: firestore.FieldValue.arrayRemove(theirUserUUID),
      passed: firestore.FieldValue.arrayUnion(theirUserUUID),
    })
    .then(() => {});
  firestore()
    .collection("matches")
    .doc(theirUserUUID)
    .update({
      awaiting: firestore.FieldValue.arrayRemove(myUserUUID),
      passed: firestore.FieldValue.arrayUnion(myUserUUID),
    })
    .then(() => {});
};

export const AcceptConnection = (myUserUUID, theirUserUUID) => {
  firestore()
    .collection("matches")
    .doc(myUserUUID)
    .update({
      pending: firestore.FieldValue.arrayRemove(theirUserUUID),
      connections: firestore.FieldValue.arrayUnion(theirUserUUID),
    })
    .then(() => {});
  firestore()
    .collection("matches")
    .doc(theirUserUUID)
    .update({
      awaiting: firestore.FieldValue.arrayRemove(myUserUUID),
      connections: firestore.FieldValue.arrayUnion(myUserUUID),
    })
    .then(() => {});
};
