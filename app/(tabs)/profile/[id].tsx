import { useLinkTo } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { Text, View} from "react-native";

export default function UserProfile() {
    const { id } = useLocalSearchParams();
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text style={{ color: "white"}}>User profile for: {id}</Text>
    </View>
    );
}