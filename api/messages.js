import firestore from "@react-native-firebase/firestore";
import uuid from "react-native-uuid";

export const sendMessage = ({ updatedMessages, newMessage, chatId }) => {
  firestore()
    .collection("messages")
    .doc(chatId)
    .update({
      messages: updatedMessages,
      recentMessageText: newMessage.message,
      recentMessageSentAt: newMessage.sentAt,
    })
    .then(() => {
      console.log("Message added to firestore!");
    });
};

export const createChatroom = (members) => {
  const chatId = uuid.v4();
  firestore()
    .collection("messages")
    .doc(chatId)
    .set({
      chatId,
      members,
      messages: [],
      recentMessageSentAt: new Date(),
      recentMessageText: "Start your conversation!",
    });
};
