import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const getProfileImage = async (email) => {
    const url = await storage().ref(`profile-images/${email}.png`).getDownloadURL();
    return url;
}