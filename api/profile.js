import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';

export const getProfileImage = async (email) => {
    const url = await storage().ref(`profile-images/${email}.png`).getDownloadURL();
    return url;
}

export const getUserPhotoLink = async (photoUUID, cb) => {
    const url = await storage().ref(`user-images/${photoUUID}.png`).getDownloadURL();
    cb(url)
}

export const getProfileData = async (email, callback) => {
    firestore()
        .collection('users')
        .doc(email)
        .get().then(document => {
            callback(document._data)
        });
}

export const editIntroduction = async (email, introduction, callback) => {
    firestore()
        .collection('users')
        .doc(email)
        .update({
            introduction
        }).then(document => {
            callback()
        });
}

export const editInstruments = async (email, instruments) => {
    firestore()
        .collection('users')
        .doc(email)
        .update({
            instruments
        })
}
export const editGenres = async (email, genres) => {
    firestore()
        .collection('users')
        .doc(email)
        .update({
            genres
        })
}


export const deleteUserPhoto = async (email, photoUUID, callback) => {
    firestore()
        .collection('users')
        .doc(email)
        .update({
            photos: firestore.FieldValue.arrayRemove(photoUUID)
        })

    const reference = storage().ref(`user-images/${photoUUID}.png`);
    await reference.delete()
}

export const addPhotoToDB = async (email, image) => {
    const imageUUID = uuid.v4();
    const reference = storage().ref(`user-images/${imageUUID}.png`);
    await reference.putFile(image)

    firestore()
        .collection('users')
        .doc(email)
        .update({
            photos: firestore.FieldValue.arrayUnion(imageUUID)
        })
}