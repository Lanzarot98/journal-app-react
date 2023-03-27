// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'; 
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// cant see in testing environment
// console.log( import.meta.env );
// cant see in dev environment
// console.log( process.env );

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
  VITE_MEASUREMENTID,
} = getEnvironments();
// console.log(env);

// Your web app's Firebase configuration
// dev/prod
// const firebaseConfig = {
  // apiKey: "AIzaSyAMnqATs6k_RIuyoj7EELiNVECk6UHT8s8",
  // authDomain: "react-journal-app-efc1a.firebaseapp.com",
  // projectId: "react-journal-app-efc1a",
  // storageBucket: "react-journal-app-efc1a.appspot.com",
  // messagingSenderId: "973382904530",
  // appId: "1:973382904530:web:b19e8782b695e621a19b0b"
// };

// Testing:
// const firebaseConfig = {
//   apiKey: "AIzaSyDBup6MUczRIoh1sjClni4m8v684zzD9L0",
//   authDomain: "testing-2ca9a.firebaseapp.com",
//   projectId: "testing-2ca9a",
//   storageBucket: "testing-2ca9a.appspot.com",
//   messagingSenderId: "55820822217",
//   appId: "1:55820822217:web:977dfd4be1a4e0640a8f18",
//   measurementId: "G-GSB9PXWTLS"
// };

// better:
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
  measurementId: VITE_MEASUREMENTID,
};

// console.log( firebaseConfig );

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );