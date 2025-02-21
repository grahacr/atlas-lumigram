import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";

export default function LoginPage() {
    const router = useRouter();

    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text style={{ color: "white"}}>Login</Text>
            <Link href="/register" replace>
                <Text style={styles.profileText}>Create an Account</Text>
            </Link>
            <Pressable onPress={() => {
                router.replace("./(tabs)/");
            }}>
            <Text style={styles.profileText}>Sign In</Text>
            </Pressable>
    </View>
    );
}

const styles = StyleSheet.create({
    profileText: {
        color: "white",
    }
  });