import { Image, StyleSheet, Alert, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import  firestore  from "@/lib/firestore"
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from "react";
import { getDocs, collection, query, orderBy, onSnapshot, QuerySnapshot, limit, startAfter } from "firebase/firestore";

export default function HomeScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [visibleCaption, setVisibleCaption] = useState<{ [key: string]: boolean}>({});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async (isRefresh = false) => {
    if (loading) return;
    setLoading(true);

    const q = isRefresh
      ? query(collection(firestore.db, "posts"), orderBy("createdAt", "desc"), limit(10))
      : query(
        collection(firestore.db, "posts"),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(10)
      );

      const querySnapshot = await getDocs(q);

      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (isRefresh) {
        setPosts(fetchedPosts);
        setHasMore(true);
      } else {
        setPosts(prevPosts => [...prevPosts, ...fetchedPosts]);
      }
      if (fetchedPosts.length < 10) {
        setHasMore(false);
      }
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setLoading(false);
      setRefreshing(false);
  }, [lastVisible, loading]);


  useEffect(() => {
    fetchPosts(true);
  }, [fetchPosts]);
  
  const handleLongPress = (id: string) => {
    setVisibleCaption((prev) => ({ ...prev, [id]: true}));
  };

  const handleDoubleTap = (id: string) => {
    Alert.alert('favorited!');
  };

  const createDoubleTapGesture = (id: string) => {
    return Gesture.Tap()
      .maxDuration(300)
      .numberOfTaps(2)
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

  return (
    <View style={{ flex: 1 }}>
        <FlashList
          data={posts}
          keyExtractor={(item) => item.id}
          extraData={visibleCaption}
          renderItem={({ item }) => {
            const doubleTapGesture = createDoubleTapGesture(item.id);
            const longPressGesture = createLongPressGesture(item.id);

            const combinedGestures = Gesture.Exclusive(longPressGesture, doubleTapGesture);
              
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
            onEndReached={() => {
              if (hasMore) fetchPosts();
            }}
            onEndReachedThreshold={0.1}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchPosts(true);
            }}
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
