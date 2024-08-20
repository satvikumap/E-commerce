import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq9SFTrPPXSet50vnrGk3LbVcm9FMRvbY",
  authDomain: "ecommerce-cf8af.firebaseapp.com",
  projectId: "ecommerce-cf8af",
  storageBucket: "ecommerce-cf8af.appspot.com",
  messagingSenderId: "71345877",
  appId: "1:71345877:web:3412154956d76231d5e45c"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence using AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore database
export const db = getFirestore(app);

// Reference to the 'users' collection in Firestore
export const usersRef = collection(db, 'users');
