import { useReducer, useEffect, createContext, useContext } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendMessage } from "../api/messages";

const MessagesContext = createContext()

function messagesReducer(state, action) {
    switch (action.type) {
        case 'set-initial': {
            return { messages: action.messages }
        }
        case 'send-message': {
            sendMessage(action.newMessage)
            AsyncStorage.setItem('@messages', JSON.stringify([...state.messages, action.newMessage]))
            return { messages: [...state.messages, action.newMessage] }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function MessagesProvider({ children }) {
    const [state, dispatch] = useReducer(messagesReducer, { messages: [] })
    const value = { state, dispatch }


    const getMessages = async () => {
        try {
            const value = await AsyncStorage.getItem('@messages')
            if (value !== null) {
                dispatch({ type: 'set-initial', messages: JSON.parse(value) })
            }
        } catch (e) {
            // error reading value
            console.log(e)
        }
    }

    useEffect(() => {
        getMessages();
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