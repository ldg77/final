// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE7trxeJPgowewhJFFLexpMjbrXMmp7W4",
  authDomain: "fp-todo.firebaseapp.com",
  projectId: "fp-todo",
  storageBucket: "fp-todo.appspot.com",
  messagingSenderId: "138568608707",
  appId: "1:138568608707:web:1a5ff40daad50c153f2b76",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
