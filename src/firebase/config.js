// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMnqATs6k_RIuyoj7EELiNVECk6UHT8s8",
  authDomain: "react-journal-app-efc1a.firebaseapp.com",
  projectId: "react-journal-app-efc1a",
  storageBucket: "react-journal-app-efc1a.appspot.com",
  messagingSenderId: "973382904530",
  appId: "1:973382904530:web:b19e8782b695e621a19b0b"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );