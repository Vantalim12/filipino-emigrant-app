// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTd1YGH2LGmvSdIHLhoY9AMuSMIbZ5q6o",
  authDomain: "filipinoemigrantsdb-21c54.firebaseapp.com",
  projectId: "filipinoemigrantsdb-21c54",
  storageBucket: "filipinoemigrantsdb-21c54.firebasestorage.app",
  messagingSenderId: "96472317522",
  appId: "1:96472317522:web:938690338ad3e5d89ce98b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
