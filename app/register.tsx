
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";


export default function RegisterPage() {
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text style={{ color: "white"}}>Register</Text>
            <Link href="/login" replace>
                <Text style={styles.profileText}>Log in to existing account</Text>
            </Link>
    </View>
    );
}


const styles = StyleSheet.create({
    profileText: {
        color: "white",
    }
  });