import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const getProfileImage = async (email) => {
    const url = await storage().ref(`profile-images/${email}.png`).getDownloadURL();
    return url;
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