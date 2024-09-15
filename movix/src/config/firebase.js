// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCFrmErs9nIJlZF_oDZcX-OmzfmFRPQqLk",
  authDomain: "first-firebase-39a26.firebaseapp.com",
  projectId: "first-firebase-39a26",
  storageBucket: "first-firebase-39a26.appspot.com",
  messagingSenderId: "622871935569",
  appId: "1:622871935569:web:69d1c569dc607bab2c1670",
  measurementId: "G-Z029P00FQ4"
};

const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const googleProvide = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
