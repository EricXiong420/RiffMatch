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
  GetNumberOfConnections,
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
    case "set-pending": {
      return { ...state, pending: action.pending };
    }
    case "set-connections": {
      return { ...state, connections: action.connections };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function MatchesProvider({ children }) {
  const [profiles, updateMatches] = useReducer(matchReducer, {
    uuids: [],
    cards: [],
    pending: [],
    connections: 0,
  });
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
    GetNumberOfConnections(profileData.uuid, (c) => {
      updateMatches({ type: "set-connections", connections: c });
    });
  }, [profiles.uuids]);

  const updateUUIDsList = () => {
    GetAllUsersUUID((usersUUID) => {
      GetUserMatches(profileData.uuid, (matches) => {
        const filteredUsers = usersUUID
          .filter((uuid) => uuid !== profileData.uuid)
          .filter((uuid) => !matches.pending.includes(uuid))
          .filter((uuid) => !matches.awaiting.includes(uuid))
          .filter((uuid) => !matches.connections.includes(uuid))
          .filter((uuid) => !matches.passed.includes(uuid));
        updateMatches({ type: "set-uuids", data: filteredUsers });
      });
    });
  };

  const getRandomProfiles = (number) => {
    const DEFAULT_CARDS = 50;
    const shuffled = profiles.uuids?.sort(() => 0.5 - Math.random());
    let selected = shuffled?.slice(0, number ? number : DEFAULT_CARDS);
    GetUserProfilesFromUUIDs(selected, (data) => {
      updateMatches({ type: "set-cards", cards: data });
    });
  };

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
