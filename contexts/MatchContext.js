import {
  useReducer,
  useEffect,
  createContext,
  useContext,
  useState,
} from "react";
import { sendMessage, getChats } from "../api/messages";
import firestore from "@react-native-firebase/firestore";
import { useAuth } from "./AuthContext";
import {
  GetAllUsersUUID,
  GetUserMatches,
  GetUserProfilesFromUUIDs,
} from "../api/matches";

const MatchesContext = createContext();

function matchReducer(state, action) {
  switch (action.type) {
    case "set-uuids": {
      return { uuids: action.data, cards: [] };
    }
    case "set-cards": {
      return { ...state, cards: action.cards };
    }
    // case "swipe-left": {
    //   let cards = state;
    //   cards.splice(action.removeCardId, 1);
    //   // return [...cards];
    //   return state;
    // }
    // case "swipe-right": {
    //   let cards = state;
    //   cards.splice(action.removeCardId, 1);
    //   // return [...cards];
    //   return state;
    // }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function MatchesProvider({ children }) {
  const [profiles, updateMatches] = useReducer(matchReducer, {uuids: [], cards: []});
  const [retrieved, setRetrieved] = useState(false);
  const value = { profiles, updateMatches };
  const { user, profileData } = useAuth();

  useEffect(() => {
    if (profileData.uuid) {
      updateUUIDsList();
    }
  }, [profileData]);

  useEffect(() => {
    getRandomProfiles();
  }, [profiles.uuids]);

  const updateUUIDsList = () => {
    GetAllUsersUUID((usersUUID) => {
      GetUserMatches(profileData.uuid, (matches) => {
        const filteredUsers = usersUUID
          .filter((uuid) => !matches.pending.includes(uuid))
          .filter((uuid) => !matches.awaiting.includes(uuid))
          .filter((uuid) => !matches.connections.includes(uuid))
          .filter((uuid) => !matches.passed.includes(uuid));
        updateMatches({ type: "set-uuids", data: filteredUsers });
      });
    });
  };

  const getRandomProfiles = (number) => {
    const DEFAULT_CARDS = 20;
    const shuffled = profiles.uuids?.sort(() => 0.5 - Math.random());
    let selected = shuffled?.slice(0, number ? number : DEFAULT_CARDS);
    GetUserProfilesFromUUIDs(selected, (data) => {
      updateMatches({ type: "set-cards", cards: data });
    });
  };

  // useEffect(() => {
  //     if (Object.keys(profileData).length > 0 && !retrieved) {
  //         const seenProfiles = [...profileData.swipedLeft, ...profileData.swipedRight, user.email]
  //         firestore().collection('users')
  //             .where(firestore.FieldPath.documentId(), '!=', user.email)
  //             .get().then(collection => {
  //                 const dataToStore = collection.docs.map(doc => ({
  //                     id: doc.id,
  //                     ...doc.data()
  //                 }));
  //                 updateMatches({ type: 'set-initial', data: dataToStore })
  //                 setRetrieved(true);
  //             })
  //     }
  // }, [profileData])

  return (
    <MatchesContext.Provider value={value}>{children}</MatchesContext.Provider>
  );
}

function useMatches() {
  const context = useContext(MatchesContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { MatchesProvider, useMatches };
