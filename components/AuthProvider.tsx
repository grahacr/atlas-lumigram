import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { auth } from "@/firebaseConfig";

const AuthContext = createContext<AuthContextType>({register, logout, login});

type AuthContextType = {
    register: (email: string, password: string) => Promise<UserCredential>;
    logout: () => void;
    login: (email: string, password: string) => Promise<UserCredential>;
    user?: User | null
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
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, [])

    return <AuthContext.Provider value={{ user, register, logout, login }}>
        {children}
    </AuthContext.Provider>

}