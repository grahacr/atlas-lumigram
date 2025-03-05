import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { createContext, ReactNode, useContext } from "react";
import { auth } from "@/firebaseConfig";

const AuthContext = createContext({register, logout, login});

type AuthContextType = {
    register: (email: string, password: string) => Promise<UserCredential>;
    logout: () => void;
    login: (email: string, password: string) => Promise<UserCredential>;
}
export const useAuth = () => useContext(AuthContext);

function register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log('user registered:', userCredential);
        return userCredential;
    })
    .catch((err) => {
        console.error('registration error:', err.message);
        throw err;
    });
}

function logout() {
    return auth.signOut();
}

function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
}
export function AuthProvider({children}: {children: ReactNode}) {
    return <AuthContext.Provider value={{ register, logout, login }}>
        {children}
    </AuthContext.Provider>

}