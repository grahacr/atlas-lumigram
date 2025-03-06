// firestore functions
import { db } from "@/firebaseConfig";
import { addDoc, collection, doc, setDoc, getDoc, Timestamp, getDocs } from "firebase/firestore";

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
    const favoritesPost = querySnapshot.docs.map(doc => doc.data());
    return favoritesPost;
}

export default {
    addPost, posts, db, addFavorite, getFavorites,
};