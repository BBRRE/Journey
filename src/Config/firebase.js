// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALkTqTwaMu-sH5KT3OmGWe4JNNH5JNh-o",
  authDomain: "journey-3930f.firebaseapp.com",
  projectId: "journey-3930f",
  storageBucket: "journey-3930f.appspot.com",
  messagingSenderId: "966158655550",
  appId: "1:966158655550:web:41092cce2bdb7c9a20316f",
  measurementId: "G-JTSED8NS5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage()
export const db = getFirestore()

//shuold be removed