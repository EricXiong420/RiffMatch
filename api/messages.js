import firestore from '@react-native-firebase/firestore';

export const sendMessage = ({ updatedMessages, newMessage, chatId }) => {
    firestore()
        .collection('messages')
        .doc(chatId)
        .update(
            {
                messages: updatedMessages,
                recentMessageText: newMessage.message,
                recentMessageSentAt: newMessage.sentAt
            }
        )
        .then(() => {
            console.log('Message added to firestore!');
        });
}