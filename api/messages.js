import firestore from '@react-native-firebase/firestore';

export const sendMessage = (message) => {
    firestore()
        .collection('messages')
        .add({ ...message, read: false })
        .then(() => {
            console.log('Message added to firestore!');
        });
}