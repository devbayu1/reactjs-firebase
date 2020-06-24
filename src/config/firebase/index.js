import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBsO_RSzT3HQ-C7ni2UUXXTQ5j0NKlmP0s",
  authDomain: "reactjs-firebase-bd6e9.firebaseapp.com",
  databaseURL: "https://reactjs-firebase-bd6e9.firebaseio.com",
  projectId: "reactjs-firebase-bd6e9",
  storageBucket: "reactjs-firebase-bd6e9.appspot.com",
  messagingSenderId: "312882735018",
  appId: "1:312882735018:web:57bb6a75d03969653dedd3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;
