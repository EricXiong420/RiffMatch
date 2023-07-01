import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import uuid from "react-native-uuid";

export const getProfileImage = async (email, callback) => {
  const url = await storage()
    .ref(`profile-images/${email}.png`)
    .getDownloadURL()
    .catch((err) => console.log(err));
  return url;
};

// any way we can make this not dependent on the photo file type?
export const getUserPhotoLink = async (photoUUID, cb) => {
  const url = await storage()
    .ref(`user-images/${photoUUID}.png`)
    .getDownloadURL();
  cb(url);
};

export const getUserSoundLink = async (audioUUID, cb) => {
  const url = await storage()
    .ref(`user-sounds/${audioUUID}.mp3`)
    .getDownloadURL();
  cb(url);
};

export const getProfileData = async (email, callback) => {
  firestore()
    .collection("users")
    .doc(email)
    .get()
    .then((document) => {
      callback(document._data);
    });
};

export const editIntroduction = async (email, introduction, callback) => {
  firestore()
    .collection("users")
    .doc(email)
    .update({
      introduction,
    })
    .then((document) => {
      callback();
    });
};

export const editInstruments = async (email, instruments) => {
  firestore().collection("users").doc(email).update({
    instruments,
  });
};
export const editGenres = async (email, genres) => {
  firestore().collection("users").doc(email).update({
    genres,
  });
};

export const deleteUserPhoto = async (email, photoUUID, callback) => {
  firestore()
    .collection("users")
    .doc(email)
    .update({
      photos: firestore.FieldValue.arrayRemove(photoUUID),
    });

  const reference = storage().ref(`user-images/${photoUUID}.png`);
  await reference.delete();
};

export const addPhotoToDB = async (email, image) => {
  const imageUUID = uuid.v4();
  const reference = storage().ref(`user-images/${imageUUID}.png`);
  await reference.putFile(image);

  firestore()
    .collection("users")
    .doc(email)
    .update({
      photos: firestore.FieldValue.arrayUnion(imageUUID),
    });
};

export const addSoundToDB = async (email, sound, artist) => {
  const soundUUID = uuid.v4();
  const reference = storage().ref(`user-sounds/${soundUUID}.mp3`);
  await reference.putFile(sound.uri);

  firestore()
    .collection("users")
    .doc(email)
    .update({
      sounds: firestore.FieldValue.arrayUnion({
        name: sound.name,
        uuid: soundUUID,
        artist: artist,
      }),
    });
};

export const deleteSoundFromDB = async (email, sound) => {
  firestore()
    .collection("users")
    .doc(email)
    .update({
      sounds: firestore.FieldValue.arrayRemove(sound),
    });

  const reference = storage().ref(`user-sounds/${sound.uuid}.mp3`);
  await reference.delete();
};
