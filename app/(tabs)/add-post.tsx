import { useState } from "react";
import { View, Image, Button, Pressable, Alert, StyleSheet, Text} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import storage from "@/lib/storage";

export default function AddPostPage() {
    const [caption, setCaption] = useState<string>('');
    const [image, setImage] = useState<string | undefined>(undefined);
    const chooseImage = async () => {
        let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permission.granted) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images', 'videos'],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } else {
            alert("permission is required to access media");
        }
    };

    async function handleSave() {
        if (!image) return;
        const saveName = image?.split("/").pop() as string;
        storage.upload(image, saveName)
        const { downloadUrl, metadata } = await storage.upload(image, saveName);
        console.log(downloadUrl);
        alert('post added!');
    };

    const handleReset = () => {
        setCaption('');
        setImage(undefined);
    };
    return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            {!image ? (
                <Button
                    title="choose a photo"
                    onPress={chooseImage} />
                ) : (
                <Image source={{ uri: image }} style={styles.image} />
                )}
                </View>
                <View style={styles.captionContainer}>
                    {image && (
                        <TextInput 
                            style={styles.inputStyle}
                            placeholder="Add a caption"
                            placeholderTextColor="#808080"
                            keyboardType="default"
                            value={caption}
                            onChangeText={setCaption}
                        />
                    )}
                </View>
                <View style={styles.buttonsContainer}>
                    {image && (
                        <>
                        <Pressable style={styles.save} onPress={handleSave}>
                            <Text style={styles.buttonText}>Save</Text>
                        </Pressable>
                        <Pressable style={styles.reset} onPress={handleReset}>
                            <Text style={{alignSelf: "center"}}>Reset</Text>
                        </Pressable>
                        </>
                    )}
                </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 16,
    },
    image: {
        width: 320,
        height: 320,
        borderRadius: 10,
    },
    captionContainer: {
        width: '90%'
    },
    inputStyle: {
        height: 60,
        borderColor: "#1ED2AF",
        borderWidth: 2,
        padding: 15,
        borderRadius: 8,
    },
    buttonsContainer: {
        width: '90%',
        marginTop: 16,
        alignItems: "center"
    },
    save: {
        backgroundColor: "#1ED2AF",
        padding: 15,
        borderRadius: 12,
        height: 60,
        width: "90%",
        justifyContent: "center",
    },
    reset: {
        padding: 15,
        borderRadius: 8,
        height: 60,
    },
    buttonText: {
        color: "white",
        alignSelf: "center",
    }
})