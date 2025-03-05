import { Text, View, StyleSheet, Pressable, TextInput, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";


export default function RegisterPage() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { register }= useAuth();

    async function handleRegister() {
        try {
            await register(email, password)
            router.replace('/(tabs)')
            alert(`Creating account with ${email} and ${password}`);
        } catch (err) {
            alert('Unable to create account')
        }
    }

    return (
    <View style={styles.pageStyle}>
        <Image source={require('../assets/images/logo.png')} style={styles.imageLogo} resizeMode="contain" />
        <Text style={{fontSize: 24, color: "white", marginBottom: 15}}>Register</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                keyboardType="default"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
            />
            <Pressable onPress={handleRegister} style={styles.signIn}>
                <Text style={styles.profileText}>Create Account</Text>
            </Pressable>
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <Link href="/login" replace>
                    <Text style={styles.profileText}>Log in to existing account</Text>
                </Link>
            </View>
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

