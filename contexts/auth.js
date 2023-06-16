import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@react-native-firebase/auth";

const AuthContext = createContext({});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] =  useState(null);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            setUser(user)
        })
        return subscriber;
    })

    return <AuthContext.Provider value={{ user }}>{ children }</AuthContext.Provider>
}