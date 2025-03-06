// firestore functions
import { db } from "@/firebaseConfig";
import { addDoc, collection, doc, setDoc, getDoc, getDocs, query, where } from "firebase/firestore";

type Post = {
    caption: string;
    image: string;
    createdAt: Date,
    createdBy: string;
}

const posts = collection(db, 'posts');

async function addPost(post: Post) {
    await addDoc(posts, post);
}

async function addFavorite(userId: string, postId: string) {
    const favoritesRef = collection(db, "users", userId, "favorites");

    const postDocRef = doc(favoritesRef, postId);
    const postSnapshot = await getDoc(postDocRef);

    if (!postSnapshot.exists()) {
        await setDoc(postDocRef, {
            postId,
            timestamp: new Date(),
        });
    }
}

async function getFavorites(userId: string) {
    const favoritesRef = collection(db, 'users', userId, 'favorites');
    const querySnapshot = await getDocs(favoritesRef);
    
    const favoritePostsIds = querySnapshot.docs.map(doc => doc.data().postId);
    
    const postsQuery = query(collection(db, "posts"), where("__name__", "in", favoritePostsIds));
    const postSnapshot = await getDocs(postsQuery);
    const favoritedPosts = postSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
    return favoritedPosts;
}

export default {
    addPost, posts, db, addFavorite, getFavorites,
};