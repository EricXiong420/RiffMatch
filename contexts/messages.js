import { useReducer, useEffect, createContext, useContext, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendMessage, getChats } from "../api/messages";
import firestore from '@react-native-firebase/firestore';

const MessagesContext = createContext()

function messagesReducer(state, action) {
    switch (action.type) {
        case 'set-initial': {
            return action.data;
        }
        case 'send-message': {
            sendMessage(action.newMessage)
            AsyncStorage.setItem('@messages', JSON.stringify([...state.messages, action.newMessage]))
            return [...state, { messages: [...state.messages, action.newMessage] }]
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function MessagesProvider({ children }) {
    const [state, dispatch] = useReducer(messagesReducer, [])
    const value = { state, dispatch }
    const [currentUserEmail, setCurrentUserEmail] = useState(null)

    const getCurrentUserEmail = async () => {
            try {
                const email = await AsyncStorage.getItem('@currentUserEmail')
                if (email !== null) {
                    setCurrentUserEmail(email)
                    console.log(email)
                }
            } catch (e) {
                // error reading value
                console.log(e)
            }
    }

    useEffect(() => {
        if (currentUserEmail !== null) {
            const subscriber = firestore()
                .collection('messages')
                .where('members', 'array-contains-any', [currentUserEmail])
                .onSnapshot(snapshot => {
                    let list = [];
                    snapshot?.docs.forEach(item => list.push(item._data))
                    dispatch({ type: 'set-initial', data: list })
                });

            // Stop listening for updates when no longer required
            return () => subscriber();
        }
    }, [currentUserEmail]);

    useEffect(() => {
        getCurrentUserEmail()
    }, [])


    return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>
}

function useMessages() {
    const context = useContext(MessagesContext)
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider')
    }
    return context
}

export { MessagesProvider, useMessages }