import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export function LogoutComponent() {
    const router = useRouter();
    function logOut() {
        router.replace("/login");
    }
    return(
    <Pressable onPress={logOut}>
        <Ionicons name="log-out-outline" size={24} style={{ marginRight :16, backgroundColor: "#fff" }} />
    </Pressable>
    )
}