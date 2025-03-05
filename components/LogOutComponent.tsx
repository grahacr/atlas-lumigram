import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useAuth } from "./AuthProvider";

export function LogoutComponent() {
    const router = useRouter();
    const auth = useAuth();

    async function logOut() {
        await auth.logout();
        router.replace("/login");
    }
    return(
    <Pressable onPress={logOut}>
        <Ionicons name="log-out-outline" size={24} style={{ marginRight :16, backgroundColor: "#fff", color: "#1ED2AF" }} />
    </Pressable>
    )
}

