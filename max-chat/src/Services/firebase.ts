// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4WiPJbmTbNpF4bnbPgtN8FliNGhIwRq4",
  authDomain: "max-app-a1d6f.firebaseapp.com",
  projectId: "max-app-a1d6f",
  storageBucket: "max-app-a1d6f.appspot.com",
  messagingSenderId: "40103497155",
  appId: "1:40103497155:web:02338a23261d40f9854176",
  measurementId: "G-3ZC7DJSB53"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, analytics }
