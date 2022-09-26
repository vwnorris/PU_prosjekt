import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAzk5XpNejdg-IFU-O3_auRs_rTldTN8wI",
  authDomain: "groupup-e693c.firebaseapp.com",
  databaseURL:
    "https://groupup-e693c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "groupup-e693c",
  storageBucket: "groupup-e693c.appspot.com",
  messagingSenderId: "532787818013",
  appId: "1:532787818013:web:2fac28ab583889b4dd60f4",
  measurementId: "G-6W6SDE8EFF",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export default db;
