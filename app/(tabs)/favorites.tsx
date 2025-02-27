import { Image, StyleSheet, Alert, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { homeFeed } from "@/placeholder";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useState } from "react";

export default function FavoritesPage() {
  const [visibleCaption, setVisibleCaption] = useState<{ [key: string]: boolean}>({});

  const handleLongPress = (id: string) => {
    setVisibleCaption((prev) => ({ ...prev, [id]: true}));
  };

  const handleDoubleTap = (id: string) => {
    Alert.alert('favorited!');
  };

  const createDoubleTapGesture = (id: string) => {
    return Gesture.Tap()
      .maxDuration(300)
      .onEnd(() => handleDoubleTap(id))
      .runOnJS(true);
  };

  const createLongPressGesture = (id: string) => {
    return Gesture.LongPress()
      .onBegin(() => handleLongPress(id))
      .onEnd(() => {
        setVisibleCaption((prev) => ({ ...prev, [id]: false}));
      })
      .runOnJS(true);
    };

  const data = homeFeed;
  return (
    <View style={{ flex: 1 }}>
        <FlashList
          data={data}
          keyExtractor={(item) => item.id}
          extraData={visibleCaption}
          renderItem={({ item }) => {
            const doubleTapGesture = createDoubleTapGesture(item.id);
            const longPressGesture = createLongPressGesture(item.id);

            const combinedGestures = Gesture.Simultaneous(longPressGesture, doubleTapGesture);
              
            return (
                <GestureDetector gesture={combinedGestures}>
                  <View style={styles.itemContainer}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                    {visibleCaption[item.id] && (
                      <Text style={styles.caption}>{item.caption}</Text>
                      )}
                  </View>             
                </GestureDetector>
              );
            }}
            estimatedItemSize={200}
          />
          </View>
        );
}

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    position: "relative"
  },
  image: {
    width: 375,
    height: 375,
    borderRadius: 10,
    marginBottom: 8
  },
  caption: {
    position: "absolute",
    bottom: 10,
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0,5)",
    padding: 5
  },
});