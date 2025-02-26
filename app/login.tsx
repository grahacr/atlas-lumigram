import { Text, View, StyleSheet, Pressable, TextInput, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    return (
    <View style={styles.pageStyle}>
        <Image source={require('../assets/images/logo.png')} style={styles.imageLogo} resizeMode="contain" />
        <Text style={{fontSize: 24, color: "white", marginBottom: 15}}>Login</Text>

        <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            keyboardType="email-address"
        />
        <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            keyboardType="default"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
        />
        <Pressable onPress={() => {
            router.replace("../(tabs)/");
            }} style={styles.signIn}>
            <Text style={styles.profileText}>Sign In</Text>
        </Pressable>
        <Link href="/register" replace>
            <Text style={styles.profileText}>Create a new Account</Text>
        </Link>
    </View>
    );
}

const styles = StyleSheet.create({
    pageStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00003C",
        padding: 20
    },
    imageLogo: {
        width: 250,
        height: 250
    },
    profileText: {
        color: "white",
    },
    signIn: {
        backgroundColor: "#1ED2AF",
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        marginVertical: 15,
    },
    inputStyle: {
        width: "100%",
        height: 50,
        borderColor: "#1ED2AF",
        borderWidth: 2,
        borderRadius: 7,
        padding: 15,
        marginBottom: 10,
        color: "#FEF9E6",
    }
  });

