import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrkimwXqfwAIQobTrHxXuXsKxDL4BC1oM",
  authDomain: "versatile-inventory-system.firebaseapp.com",
  projectId: "versatile-inventory-system",
  storageBucket: "versatile-inventory-system.appspot.com",
  messagingSenderId: "88854544580",
  appId: "1:88854544580:web:0d6b53a104f80e09b38991",
  measurementId: "G-VPC79DXBXG",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
