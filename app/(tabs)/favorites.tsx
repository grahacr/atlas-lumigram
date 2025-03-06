import { Image, StyleSheet, Alert, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import  firestore  from "@/lib/firestore"
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function FavoritesPage() {

  const [posts, setPosts] = useState<any[]>([]);
  const [visibleCaption, setVisibleCaption] = useState<{ [key: string]: boolean}>({});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();
  
  const fetchFavoritePosts = useCallback(async (isRefresh = false) => {
    if (loading || !user) return;
      setLoading(true);
      
      try {
        const favoritePosts = await firestore.getFavorites(user.uid);
        
        if (isRefresh) {
          setPosts(favoritePosts);
          setHasMore(true);
        } else {
          setPosts(prevPosts => [...prevPosts, ...favoritePosts]);
        }
        if (favoritePosts.length < 10) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("error fetching favorites for user", error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }, [loading, user]);
  
    useEffect(() => {
      if (user) {
        fetchFavoritePosts(true);
      }
    }, [user, fetchFavoritePosts]);

  const handleLongPress = (id: string) => {
    setVisibleCaption((prev) => ({ ...prev, [id]: true}));
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
          renderItem={({ item }) => {
            const longPressGesture = createLongPressGesture(item.id);
              
            return (
                <GestureDetector gesture={longPressGesture}>
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
              if (hasMore) fetchFavoritePosts();
            }}
            onEndReachedThreshold={0.1}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchFavoritePosts(true)
            }}
            extraData={Object.keys(visibleCaption)}
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