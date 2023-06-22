import { useReducer, useEffect, createContext, useContext, useState } from "react"
import { sendMessage, getChats } from "../api/messages";
import firestore from '@react-native-firebase/firestore';
import { useAuth } from "./AuthContext";

const MessagesContext = createContext()

function messagesReducer(state, action) {
    switch (action.type) {
        case 'set-initial': {
            return action.data;
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function MessagesProvider({ children }) {
    const [state, dispatch] = useReducer(messagesReducer, [])
    const value = { state, dispatch }
    const user = useAuth()

    useEffect(() => {
        const subscriber = firestore()
            .collection('messages')
            .where('members', 'array-contains-any', [user.user.email])
            .onSnapshot(snapshot => {
                let list = [];
                snapshot?.docs.forEach(item => list.push(item._data))
                dispatch({ type: 'set-initial', data: list })
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [user]);

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