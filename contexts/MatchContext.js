import { useReducer, useEffect, createContext, useContext, useState } from "react"
import { sendMessage, getChats } from "../api/messages";
import firestore from '@react-native-firebase/firestore';
import { useAuth } from "./AuthContext";

const MatchesContext = createContext()

function matchReducer(state, action) {
    switch (action.type) {
        case 'set-initial': {
            return action.data;
        }
        case 'swipe-left': {
            let cards = state;
            cards.splice(action.removeCardId, 1);
            // return [...cards];
            return state;
        }
        case 'swipe-right': {
            let cards = state;
            cards.splice(action.removeCardId, 1);
            // return [...cards];
            return state;
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function MatchesProvider({ children }) {
    const [profiles, updateMatches] = useReducer(matchReducer, [])
    const [retrieved, setRetrieved] = useState(false);
    const value = { profiles, updateMatches }
    const { user, profileData } = useAuth()

    useEffect(() => {
        if (Object.keys(profileData).length > 0 && !retrieved) {
            const seenProfiles = [...profileData.swipedLeft, ...profileData.swipedRight, user.email]
            firestore().collection('users')
                .where(firestore.FieldPath.documentId(), '!=', user.email)
                .get().then(collection => {
                    const dataToStore = collection.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    updateMatches({ type: 'set-initial', data: dataToStore })
                    setRetrieved(true);
                })
        }
    }, [profileData])

    return <MatchesContext.Provider value={value}>{children}</MatchesContext.Provider>
}

function useMatches() {
    const context = useContext(MatchesContext)
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider')
    }
    return context
}

export { MatchesProvider, useMatches }