import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAH114xBEE_9kH_AIdQVWDOP2BVXZXNQRY",
  authDomain: "dso-poc.firebaseapp.com",
  projectId: "dso-poc",
  storageBucket: "dso-poc.appspot.com",
  messagingSenderId: "474239929676",
  appId: "1:474239929676:web:373f7fc2ff52a1cc7e53e9",
  measurementId: "G-TCLDTT6VS9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);