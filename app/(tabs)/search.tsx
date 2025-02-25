import { Text, View, StyleSheet} from "react-native";
import { Link } from "expo-router";

export default function SearchPage() {
      return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.profileText}>Hello search</Text>
          <Link href="/profile/1">
            <Text style={styles.profileText}>Profile 1</Text>
        </Link>
        <Link href="/profile/2">
            <Text style={styles.profileText}>Profile 2</Text>
        </Link>
        <Link href="/profile/3">
            <Text style={styles.profileText}>Profile 3</Text>
        </Link>
      </View>
      );
}
const styles = StyleSheet.create({
    profileText: {
        color: "white",
    }
  });
