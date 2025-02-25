import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import { Link, useRouter } from "expo-router";

export default function LoginPage() {
    const router = useRouter();

    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text style={{fontSize: 24}}>Login</Text>
        <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        />
            <Link href="/register" replace>
                <Text style={styles.profileText}>Create an Account</Text>
            </Link>
            <Pressable onPress={() => {
                router.replace("../(tabs)/");
            }}>
            <Text style={styles.profileText}>Sign In</Text>
            </Pressable>
    </View>
    );
}

const styles = StyleSheet.create({
    profileText: {
        color: "white",
    },
    inputStyle: {
        width: "100%",
        height: 50,
        borderColor: "#000000",
        borderWidth: 4,
        padding: 10,
        marginBottom: 20,
        color: "#000",
    }
  });

