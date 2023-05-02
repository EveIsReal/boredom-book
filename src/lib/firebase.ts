import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKcSzTbE7iyrPoEf28p7DwBHB5qhs7LSc",
    authDomain: "boredombook-a82e2.firebaseapp.com",
    projectId: "boredombook-a82e2",
    storageBucket: "boredombook-a82e2.appspot.com",
    messagingSenderId: "787336263311",
    appId: "1:787336263311:web:40e11438fbf4b3e79fa2fa",
    measurementId: "G-7970YTK8YE"
};
  
  // Initialize Firebase

let firebaseApp;

if(!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApp();
    deleteApp(firebaseApp);
    firebaseApp = initializeApp(firebaseConfig);
}

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);