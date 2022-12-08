// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBm3VFpU791VIYxVV58UxbQsAbJ4B1JJyA",
    authDomain: "coworking-b2d75.firebaseapp.com",
    projectId: "coworking-b2d75",
    storageBucket: "coworking-b2d75.appspot.com",
    messagingSenderId: "1079606893900",
    appId: "1:1079606893900:web:8b1c0e293e0395639e43e9",
    measurementId: "G-HKS7VLM21V"
  };

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getFirestore();
const persionalInfoRef = collection(database, "persional_info");

export  {auth, database, persionalInfoRef}
