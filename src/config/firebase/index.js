import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "AUTH_DOMAIN",
  databaseURL: "DATABASE_URL",
  projectId: "PROJECT_ID",
  storageBucket: "BUCKET_URL",
  messagingSenderId: "SENDER_ID",
  appId: "YOUR_APP_ID",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;
