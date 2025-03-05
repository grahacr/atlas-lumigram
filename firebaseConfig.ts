// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkSwb9WFMwUWxXIq4Zpdq-lpYbulL45Cs",
  authDomain: "cgraham-lumigram.firebaseapp.com",
  projectId: "cgraham-lumigram",
  storageBucket: "cgraham-lumigram.firebasestorage.app",
  messagingSenderId: "259418920636",
  appId: "1:259418920636:web:2db3863a62702c557de2b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initialize Auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const storage = getStorage(app);